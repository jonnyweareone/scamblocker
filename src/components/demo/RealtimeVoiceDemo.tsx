import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, Phone, PhoneOff, Shield, AlertTriangle, 
  CheckCircle2, Loader2, Terminal, ArrowRight, 
  Mail, Bell, ChevronDown, TrendingUp
} from "lucide-react";

interface LogEntry {
  id: number;
  timestamp: string;
  type: "system" | "agent" | "caller" | "analysis";
  content: string;
}

interface ExtractedInfo {
  callerName: string | null;        // WHO
  business: string | null;          // WHERE (if business)
  relationship: string | null;      // WHERE (if personal)
  reason: string | null;            // WHY
  callType: "unknown" | "personal" | "business" | "scam";
  riskScore: number;
  riskFactors: string[];
  safeFactors: string[];
  baselineComplete: boolean;
}

interface RealtimeVoiceDemoProps {
  supabaseProjectId?: string;
}

export function RealtimeVoiceDemo({ 
  supabaseProjectId = "mjlpevgniiormidhgoih" 
}: RealtimeVoiceDemoProps) {
  const [status, setStatus] = useState<"idle" | "connecting" | "ringing" | "active" | "ended">("idle");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<"blocked" | "transferred" | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo>({
    callerName: null,
    business: null,
    relationship: null,
    reason: null,
    callType: "unknown",
    riskScore: 50,
    riskFactors: [],
    safeFactors: [],
    baselineComplete: false,
  });
  
  const socketRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const logIdRef = useRef(0);
  const consoleRef = useRef<HTMLDivElement>(null);
  const ringbackRef = useRef<{ oscillators: OscillatorNode[]; gain: GainNode; interval: ReturnType<typeof setInterval> } | null>(null);
  const transcriptRef = useRef<string>("");

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = useCallback((type: LogEntry["type"], content: string) => {
    const entry: LogEntry = {
      id: logIdRef.current++,
      timestamp: new Date().toLocaleTimeString("en-GB"),
      type,
      content,
    };
    setLogs(prev => [...prev, entry]);
  }, []);

  // Extract info from transcript in real-time - WHO/WHERE/WHY baseline
  const analyzeTranscript = useCallback((newText: string, fullTranscript: string) => {
    const newLower = newText.toLowerCase();
    const fullLower = fullTranscript.toLowerCase();
    
    // Common first names for validation
    const commonNames = ['david', 'sarah', 'john', 'johnny', 'jonny', 'jane', 'mike', 'michael', 'emma', 'james', 'harriet', 'margaret', 'dorothy', 'frank', 'arthur', 'mary', 'susan', 'sue', 'robert', 'bob', 'william', 'bill', 'richard', 'tom', 'peter', 'paul', 'george', 'helen', 'betty', 'barbara', 'karen', 'lisa', 'carol', 'sharon', 'laura', 'emily', 'jessica', 'amanda', 'nicole', 'elizabeth', 'liz', 'beth', 'charlie', 'harry', 'oliver', 'jack', 'oscar', 'james', 'leo', 'alfie', 'henry', 'jacob'];
    
    // Words that are NOT names
    const notNames = ['looking', 'calling', 'speaking', 'hello', 'yes', 'yeah', 'just', 'want', 'need', 'about', 'well', 'actually', 'really', 'please', 'thanks', 'sorry', 'right', 'okay', 'the', 'her', 'him', 'them'];
    
    setExtractedInfo(prev => {
      const updated = { ...prev };
      
      // ============ WHO - Extract caller name ============
      if (!updated.callerName) {
        const namePatterns = [
          /(?:it'?s|this is|i'?m|my name is|hi,?\s*i'?m|yes,?\s*it'?s)\s+([A-Z][a-z]+)/i,
          /^([A-Z][a-z]+)\s+(?:here|calling|speaking)/i,
          /(?:i'?m|it'?s)\s+(?:her|his)?\s*(son|daughter|nephew|niece|grandson|granddaughter|friend|neighbour|carer)\s+([A-Z][a-z]+)/i,
        ];
        
        for (const pattern of namePatterns) {
          const match = newText.match(pattern);
          if (match) {
            // Get the last capture group (the name)
            const potentialName = match[match.length - 1]?.toLowerCase();
            if (potentialName && (commonNames.includes(potentialName) || !notNames.includes(potentialName))) {
              updated.callerName = match[match.length - 1].charAt(0).toUpperCase() + match[match.length - 1].slice(1).toLowerCase();
              break;
            }
          }
        }
      }
      
      // ============ WHERE - Business OR Relationship ============
      
      // Check for business first
      if (!updated.business && !updated.relationship) {
        const businessMatch = newText.match(/from\s+([A-Z][A-Za-z\s&']+?)(?:\s+calling|\s+here|,|\.|\s+about|\s+regarding|$)/i);
        const knownBusinesses = ['specsavers', 'british gas', 'nhs', 'surgery', 'pharmacy', 'boots', 'opticians', 'dentist', 'hospital', 'council', 'royal mail', 'bt', 'virgin', 'sky', 'doctor', 'gp'];
        
        if (businessMatch && businessMatch[1].length > 2 && businessMatch[1].length < 30) {
          updated.business = businessMatch[1].trim();
          updated.callType = "business";
        } else {
          for (const biz of knownBusinesses) {
            if (newLower.includes(biz)) {
              updated.business = biz.charAt(0).toUpperCase() + biz.slice(1);
              updated.callType = "business";
              break;
            }
          }
        }
      }
      
      // Check for relationship (WHERE for personal calls)
      if (!updated.relationship && !updated.business) {
        const relationships: { [key: string]: string } = {
          'son': 'Son', 'daughter': 'Daughter', 'nephew': 'Nephew', 'niece': 'Niece',
          'grandson': 'Grandson', 'granddaughter': 'Granddaughter', 'grandchild': 'Grandchild',
          'brother': 'Brother', 'sister': 'Sister', 'cousin': 'Cousin',
          'friend': 'Friend', 'neighbour': 'Neighbour', 'neighbor': 'Neighbour',
          'carer': 'Carer', 'caregiver': 'Carer', 'partner': 'Partner', 'husband': 'Husband', 'wife': 'Wife',
        };
        
        // Check patterns like "I'm her son" or "her son Johnny" or just family word mentions
        for (const [word, label] of Object.entries(relationships)) {
          if (newLower.includes(word)) {
            updated.relationship = label;
            updated.callType = "personal";
            break;
          }
        }
        
        // Also check for "mum" / "dad" etc references (caller talking ABOUT them means personal)
        const familyRefs = ['mum', 'mom', 'dad', 'nan', 'nana', 'grandma', 'grandad', 'granddad', 'auntie', 'uncle'];
        for (const ref of familyRefs) {
          if (newLower.includes(ref)) {
            updated.callType = "personal";
            // If they mention mum/nan but haven't stated relationship, mark as "Family"
            if (!updated.relationship) {
              updated.relationship = "Family";
            }
            break;
          }
        }
      }
      
      // ============ WHY - Specific reason ============
      if (!updated.reason) {
        const reasonPatterns = [
          // Specific activities
          { pattern: /(?:about|regarding|for)\s+(?:the\s+)?(?:her|his|their|the|an?)?\s*(eye\s*test|appointment|prescription|delivery|check-?up|hearing\s*test|blood\s*test|test\s*results?|meter\s*reading|boiler\s*service|grooming|operation|surgery|scan|x-?ray)/i, group: 1 },
          // Welfare checks
          { pattern: /(?:check(?:ing)?|see)\s+(?:if\s+)?(?:she|he|they|mum|dad|nan)'?s?\s*(?:okay|alright|ok|doing well|feeling better|home)/i, group: 0, label: "Welfare check" },
          // After events
          { pattern: /(?:after|following|since)\s+(?:the|her|his)?\s*(fall|hospital|accident|operation|surgery)/i, group: 1, prefix: "After " },
          // Catch up (valid for personal)
          { pattern: /(?:just\s+)?(?:a\s+)?(?:catch[\s-]?up|chat|check[\s-]?in|catch up|checking in)/i, group: 0, label: "Catch up" },
          // Arrange/confirm
          { pattern: /(?:arrange|confirm|book|cancel|rearrange|reschedule)\s+(?:the\s+)?(?:an?\s+)?(appointment|delivery|visit|collection)/i, group: 1, prefix: "Re: " },
        ];
        
        for (const { pattern, group, label, prefix } of reasonPatterns) {
          const match = newText.match(pattern);
          if (match) {
            if (label) {
              updated.reason = label;
            } else if (prefix && match[group]) {
              updated.reason = prefix + match[group];
            } else if (match[group]) {
              updated.reason = match[group].charAt(0).toUpperCase() + match[group].slice(1);
            }
            break;
          }
        }
      }
      
      // ============ Calculate baseline status ============
      const hasWho = !!updated.callerName;
      const hasWhere = !!(updated.business || updated.relationship);
      const hasWhy = !!updated.reason;
      updated.baselineComplete = hasWho && hasWhere && hasWhy;
      
      // ============ Calculate risk score ============
      let riskScore = 50; // Start neutral
      
      // Baseline factors reduce risk
      if (hasWho) riskScore -= 10;
      if (hasWhere) riskScore -= 15;
      if (hasWhy) riskScore -= 15;
      if (updated.callType === "personal") riskScore -= 5;
      if (updated.baselineComplete) riskScore -= 5;
      
      // Build safe factors list
      const safeFactors: string[] = [];
      if (hasWho) safeFactors.push("WHO verified");
      if (hasWhere) safeFactors.push("WHERE verified");
      if (hasWhy) safeFactors.push("WHY verified");
      if (updated.baselineComplete) safeFactors.push("✓ Baseline complete");
      
      // ============ SCAM detection - overrides everything ============
      const scamPatterns = [
        { pattern: /hmrc|tax\s*(refund|rebate|debt|office|owing)/i, label: "🚨 HMRC scam" },
        { pattern: /microsoft|windows|computer.*virus|tech support|your computer/i, label: "🚨 Tech support scam" },
        { pattern: /fraud\s*(team|department)|suspicious\s*(activity|transaction)|your bank|bank.*security/i, label: "🚨 Bank fraud scam" },
        { pattern: /won|winner|prize|lottery|claim your/i, label: "🚨 Prize scam" },
        { pattern: /arrest|warrant|police|court|legal action|prosecut/i, label: "🚨 Authority threat" },
        { pattern: /amazon.*problem|order.*issue|parcel.*held|delivery.*problem/i, label: "🚨 Delivery scam" },
        { pattern: /gift\s*card|bitcoin|crypto|wire\s*transfer/i, label: "🚨 Payment scam" },
        { pattern: /act\s*now|urgent|immediate|today\s*only|right away/i, label: "⚠️ Pressure tactics" },
        { pattern: /card\s*details|card\s*number|pin|password|security\s*code|verify.*account/i, label: "🚨 Data theft" },
        { pattern: /refund.*owed|owed.*refund|overpaid|compensation/i, label: "🚨 Refund scam" },
      ];
      
      const riskFactors: string[] = [];
      for (const { pattern, label } of scamPatterns) {
        if (pattern.test(fullLower) && !riskFactors.includes(label)) {
          riskFactors.push(label);
          riskScore += 30;
          updated.callType = "scam";
        }
      }
      
      // Clamp score
      updated.riskScore = Math.max(5, Math.min(99, riskScore));
      updated.safeFactors = safeFactors;
      updated.riskFactors = riskFactors;
      
      return updated;
    });
  }, []);

  // UK Ringback tone
  const startRingback = useCallback(() => {
    if (ringbackRef.current) return;
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.frequency.value = 400;
    osc2.frequency.value = 450;
    osc1.connect(gain);
    osc2.connect(gain);
    osc1.start();
    osc2.start();
    let phase = 0;
    const pattern = [0.4, 0.2, 0.4, 2];
    const playPattern = () => {
      const isOn = phase === 0 || phase === 2;
      gain.gain.setValueAtTime(isOn ? 0.15 : 0, ctx.currentTime);
      phase = (phase + 1) % 4;
    };
    playPattern();
    let patternIndex = 0;
    const scheduleNext = () => {
      const duration = pattern[patternIndex] * 1000;
      patternIndex = (patternIndex + 1) % 4;
      return setTimeout(() => {
        playPattern();
        if (ringbackRef.current) ringbackRef.current.interval = scheduleNext();
      }, duration);
    };
    ringbackRef.current = { oscillators: [osc1, osc2], gain, interval: scheduleNext() };
  }, []);

  const stopRingback = useCallback(() => {
    if (ringbackRef.current) {
      clearTimeout(ringbackRef.current.interval);
      ringbackRef.current.oscillators.forEach(o => o.stop());
      ringbackRef.current.gain.disconnect();
      ringbackRef.current = null;
    }
  }, []);

  const startMicrophone = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, sampleRate: 16000 },
      });
      mediaStreamRef.current = stream;
      const captureCtx = new AudioContext({ sampleRate: 16000 });
      const source = captureCtx.createMediaStreamSource(stream);
      const processor = captureCtx.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = (e) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
          const float32 = e.inputBuffer.getChannelData(0);
          const pcm16 = new Int16Array(float32.length);
          for (let i = 0; i < float32.length; i++) {
            const s = Math.max(-1, Math.min(1, float32[i]));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          }
          socketRef.current.send(pcm16.buffer);
        }
      };
      source.connect(processor);
      processor.connect(captureCtx.destination);
      sourceRef.current = source;
      processorRef.current = processor;
    } catch (e) {
      throw new Error("Microphone access denied.");
    }
  }, []);

  const stopMicrophone = useCallback(() => {
    processorRef.current?.disconnect();
    processorRef.current = null;
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    mediaStreamRef.current = null;
  }, []);

  const startDemo = async () => {
    setError(null);
    setLogs([]);
    setOutcome(null);
    setEmailSent(false);
    setExtractedInfo({
      callerName: null, business: null, reason: null, callType: "unknown",
      riskScore: 50, riskFactors: [], safeFactors: [], relationship: null, baselineComplete: false,
    });
    setStatus("connecting");
    transcriptRef.current = "";
    
    addLog("system", "Connecting to ScamBlocker AI...");
    
    try {
      const wsUrl = `wss://${supabaseProjectId}.supabase.co/functions/v1/scamblocker-demo`;
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;
      
      socket.onopen = () => {
        addLog("system", "Connected");
        socket.send(JSON.stringify({ type: "configure", protectedName: "Mum" }));
        addLog("system", "Dialling...");
        setStatus("ringing");
        startRingback();
      };
      
      socket.onmessage = async (event) => {
        if (typeof event.data === "string") {
          const msg = JSON.parse(event.data);
          
          switch (msg.type) {
            case "ready":
              stopRingback();
              setStatus("active");
              addLog("system", "Call connected — AI screening active");
              await startMicrophone();
              break;
              
            case "transcript":
              if (msg.role === "caller") {
                transcriptRef.current += " " + msg.content;
                addLog("caller", msg.content);
                analyzeTranscript(msg.content, transcriptRef.current);
              } else if (msg.role === "agent") {
                addLog("agent", msg.content);
              }
              break;
              
            case "call_ended":
              setOutcome(msg.outcome);
              setStatus("ended");
              stopMicrophone();
              break;
              
            case "error":
              setError(msg.message);
              setStatus("idle");
              stopMicrophone();
              stopRingback();
              break;
          }
        }
      };
      
      socket.onerror = () => {
        stopRingback();
        stopMicrophone();
        setError("Connection error. Please try again.");
        setStatus("idle");
      };
      
      socket.onclose = () => {
        stopRingback();
        stopMicrophone();
      };
    } catch (e: any) {
      stopRingback();
      setError(`Error: ${e.message}`);
      setStatus("idle");
    }
  };

  const stopDemo = () => {
    stopRingback();
    stopMicrophone();
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "end" }));
      socketRef.current.close();
    }
    setOutcome(extractedInfo.callType === "scam" ? "blocked" : "transferred");
    setStatus("ended");
  };

  const resetDemo = () => {
    setStatus("idle");
    setLogs([]);
    setOutcome(null);
    setExtractedInfo({
      callerName: null, business: null, relationship: null, reason: null, 
      callType: "unknown", riskScore: 50, riskFactors: [], safeFactors: [],
      baselineComplete: false,
    });
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-emerald-400";
    if (score < 60) return "text-amber-400";
    return "text-red-400";
  };

  const getRiskBg = (score: number) => {
    if (score < 30) return "bg-emerald-500";
    if (score < 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-6 shadow-xl">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30 mb-3">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">🎙️ Live AI Screening Demo</h3>
          <p className="text-sm text-slate-600 mt-1">Speak as a caller. Watch the AI analyse in real-time.</p>
        </div>

        {/* Scenario Hints */}
        {status === "idle" && (
          <div className="p-4 rounded-xl bg-violet-50 border border-violet-200">
            <p className="text-sm text-slate-700 mb-3"><strong>Try these scenarios:</strong></p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="space-y-1.5">
                <p className="text-emerald-700 font-medium">✅ Should connect:</p>
                <p className="text-slate-600 text-xs">"Hi, it's Harriet from Fluffy Paws about the grooming"</p>
                <p className="text-slate-600 text-xs">"It's Jonny, just checking in on Mum"</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-red-700 font-medium">🚫 Should block:</p>
                <p className="text-slate-600 text-xs">"This is HMRC about your tax refund"</p>
                <p className="text-slate-600 text-xs">"Microsoft here - your computer has a virus"</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">{error}</div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {status === "idle" && (
            <Button onClick={startDemo} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 h-12 px-8 text-white font-semibold shadow-lg">
              <Mic className="h-5 w-5 mr-2" />Start Demo
            </Button>
          )}
          {status === "connecting" && <Button disabled className="h-12 px-8"><Loader2 className="h-5 w-5 mr-2 animate-spin" />Connecting...</Button>}
          {status === "ringing" && <Button disabled className="h-12 px-8 bg-amber-500"><Phone className="h-5 w-5 mr-2 animate-bounce" />Ringing...</Button>}
          {status === "active" && <Button variant="destructive" onClick={stopDemo} className="h-12 px-8"><PhoneOff className="h-5 w-5 mr-2" />End Call</Button>}
        </div>

        {/* Speak Now Prompt */}
        {status === "active" && (
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white animate-pulse">
            <Mic className="h-6 w-6" />
            <span className="font-bold text-lg">🎤 Speak now! Say who you are...</span>
          </div>
        )}

        {/* Live Console + Analysis Panel */}
        {(status === "active" || status === "ended") && (
          <div className="grid lg:grid-cols-5 gap-4">
            {/* Conversation Log - 3 cols */}
            <div className="lg:col-span-3 rounded-xl border bg-slate-900 shadow-lg overflow-hidden font-mono text-sm">
              <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-violet-400" />
                  <span className="text-slate-300">Live Conversation</span>
                </div>
                {status === "active" && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse" />Live
                  </Badge>
                )}
              </div>
              <div ref={consoleRef} className="p-4 h-[280px] overflow-y-auto space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2">
                    {log.type === "system" && <span className="text-slate-500">⚙️</span>}
                    {log.type === "agent" && <span className="text-violet-400">🤖</span>}
                    {log.type === "caller" && <span className="text-cyan-400">📞</span>}
                    <span className="text-slate-600 text-xs">[{log.timestamp}]</span>
                    <span className={
                      log.type === "agent" ? "text-violet-300" :
                      log.type === "caller" ? "text-cyan-300" :
                      "text-slate-400"
                    }>{log.content}</span>
                  </div>
                ))}
                {status === "active" && <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse" />}
              </div>
            </div>

            {/* Live Analysis Panel - 2 cols */}
            <div className="lg:col-span-2 rounded-xl border bg-slate-900 shadow-lg overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
                <span className="text-slate-300 text-sm font-medium">🔍 Caller Baseline</span>
              </div>
              <div className="p-4 space-y-4 text-sm">
                {/* WHO / WHERE / WHY Baseline */}
                <div className="space-y-3">
                  {/* WHO */}
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      extractedInfo.callerName ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"
                    }`}>
                      {extractedInfo.callerName ? "✓" : "1"}
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-400 text-xs uppercase tracking-wide">WHO</div>
                      <div className={extractedInfo.callerName ? "text-cyan-400 font-medium" : "text-slate-600"}>
                        {extractedInfo.callerName || "Waiting..."}
                      </div>
                    </div>
                  </div>
                  
                  {/* WHERE */}
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      (extractedInfo.business || extractedInfo.relationship) ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"
                    }`}>
                      {(extractedInfo.business || extractedInfo.relationship) ? "✓" : "2"}
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-400 text-xs uppercase tracking-wide">WHERE</div>
                      <div className={
                        extractedInfo.business ? "text-violet-400 font-medium" : 
                        extractedInfo.relationship ? "text-blue-400 font-medium" : 
                        "text-slate-600"
                      }>
                        {extractedInfo.business || extractedInfo.relationship || "Waiting..."}
                        {extractedInfo.callType === "business" && <span className="text-xs text-slate-500 ml-2">(Business)</span>}
                        {extractedInfo.callType === "personal" && <span className="text-xs text-slate-500 ml-2">(Personal)</span>}
                      </div>
                    </div>
                  </div>
                  
                  {/* WHY */}
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      extractedInfo.reason ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"
                    }`}>
                      {extractedInfo.reason ? "✓" : "3"}
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-400 text-xs uppercase tracking-wide">WHY</div>
                      <div className={extractedInfo.reason ? "text-emerald-400 font-medium" : "text-slate-600"}>
                        {extractedInfo.reason || "Waiting..."}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Baseline Status */}
                <div className={`rounded-lg p-3 ${
                  extractedInfo.callType === "scam" ? "bg-red-500/10 border border-red-500/30" :
                  extractedInfo.baselineComplete ? "bg-emerald-500/10 border border-emerald-500/30" :
                  "bg-slate-800 border border-slate-700"
                }`}>
                  <div className="flex items-center gap-2">
                    {extractedInfo.callType === "scam" ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-red-400 font-medium">⚠️ SCAM DETECTED</span>
                      </>
                    ) : extractedInfo.baselineComplete ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">✓ Baseline Complete</span>
                      </>
                    ) : (
                      <>
                        <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />
                        <span className="text-slate-400">Establishing baseline...</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Risk Score */}
                <div className="pt-3 border-t border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400">Risk Score:</span>
                    <span className={`text-lg font-bold ${getRiskColor(extractedInfo.riskScore)}`}>
                      {extractedInfo.riskScore}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getRiskBg(extractedInfo.riskScore)} transition-all duration-500`}
                      style={{ width: `${extractedInfo.riskScore}%` }}
                    />
                  </div>
                </div>

                {/* Risk Factors (only show if scam) */}
                {extractedInfo.riskFactors.length > 0 && (
                  <div className="space-y-1 pt-2">
                    {extractedInfo.riskFactors.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-red-400">
                        <TrendingUp className="h-3 w-3" />{f}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Final Summary */}
        {status === "ended" && (
          <div className="space-y-4">
            <div className={`rounded-xl border-2 p-5 ${
              outcome === "blocked" ? "border-red-300 bg-red-50" : "border-emerald-300 bg-emerald-50"
            }`}>
              <div className="flex items-center gap-3 mb-4">
                {outcome === "blocked" ? (
                  <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                )}
                <div>
                  <h4 className={`text-lg font-bold ${outcome === "blocked" ? "text-red-700" : "text-emerald-700"}`}>
                    {outcome === "blocked" ? "🚫 Call Blocked" : "✅ Caller Verified"}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {extractedInfo.callerName && `Caller: ${extractedInfo.callerName}`}
                    {extractedInfo.business && ` • ${extractedInfo.business}`}
                    {extractedInfo.relationship && ` • ${extractedInfo.relationship}`}
                  </p>
                </div>
              </div>

              {/* Contextual explanation based on call type */}
              <div className="p-4 rounded-lg bg-white/80 border border-slate-200 mb-4">
                {outcome === "blocked" ? (
                  <p className="text-slate-700 text-sm">
                    <span className="font-semibold text-red-600">ScamBlocker detected a threat.</span> This caller triggered our scam detection patterns. 
                    In the real system, this call would be blocked instantly and you'd receive an alert with the full transcript for reporting.
                  </p>
                ) : extractedInfo.callType === "personal" ? (
                  <p className="text-slate-700 text-sm">
                    <span className="font-semibold text-emerald-600">This looked like a {extractedInfo.reason?.toLowerCase() || "personal call"}.</span> In the full ScamBlocker system, 
                    family members like you would have their <strong>voice fingerprint</strong> and <strong>phone number whitelisted</strong> — meaning you'd skip the screening entirely 
                    and go straight through to Mum.
                  </p>
                ) : extractedInfo.callType === "business" ? (
                  <p className="text-slate-700 text-sm">
                    <span className="font-semibold text-violet-600">Business call from {extractedInfo.business}.</span> The AI verified who they were, 
                    where they were calling from, and why. Mum would receive a summary before deciding whether to take the call.
                  </p>
                ) : (
                  <p className="text-slate-700 text-sm">
                    The AI gathered enough information to verify this caller. In the full system, you'd control exactly how strict the screening should be.
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-white border">
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Phone className="h-3 w-3" />Caller heard:</p>
                  <p className="text-slate-700 italic text-sm">
                    {outcome === "blocked" 
                      ? "I'm ending this call."
                      : `Thanks ${extractedInfo.callerName || "caller"}. Putting you through now.`
                    }
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white border">
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Bell className="h-3 w-3" />You'd receive:</p>
                  <p className="text-slate-700 italic text-sm">
                    {outcome === "blocked"
                      ? `⚠️ Blocked: ${extractedInfo.riskFactors[0]?.replace(/🚨|⚠️/g, '').trim() || "Suspicious caller"}`
                      : `${extractedInfo.callerName || "Caller"} → Mum (${extractedInfo.reason || "connected"})`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Try again prompt */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-amber-800 text-sm mb-3">
                <span className="font-semibold">🎭 Want to see ScamBlocker catch a scammer?</span><br />
                Try again pretending to be from "HMRC about a tax refund" or "Microsoft technical support" and watch what happens...
              </p>
              <Button variant="outline" onClick={resetDemo} className="border-amber-300 text-amber-700 hover:bg-amber-100">
                Try as a bad actor →
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <Link to="/scamblocker/join" className="block">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 h-12 font-semibold">
                  Get Protected Now<ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              {!emailSent ? (
                <div className="flex gap-2">
                  <Input type="email" placeholder="Email for report" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="flex-1" />
                  <Button variant="outline" onClick={() => setEmailSent(true)} className="shrink-0"><Mail className="h-4 w-4" /></Button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-emerald-600 text-sm"><CheckCircle2 className="h-4 w-4" />Sent!</div>
              )}
            </div>

            <div className="text-center pt-2 border-t">
              <a href="#5-layers" className="text-sm text-violet-600 hover:text-violet-800 flex items-center justify-center gap-1">
                This demo shows Layer 3 (Voice Screening)<ChevronDown className="h-4 w-4" />See all 5 protection layers
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
