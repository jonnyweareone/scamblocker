import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Shield, Phone, Smartphone, ShieldCheck, Users, CreditCard, 
  CheckCircle2, ArrowRight, X, Clock, 
  Zap, Brain, Eye, PhoneOff, ShieldAlert, Activity, Lock,
  PhoneIncoming, PhoneMissed, Mic
} from "lucide-react";
import { useState, useEffect } from "react";

// Pexels media assets
const MEDIA = {
  heroVideo: "https://videos.pexels.com/video-files/5708833/5708833-hd_1920_1080_25fps.mp4",
};

// ScamBlocker Logo Component
function ScamBlockerLogo({ className = "", size = "default" }: { className?: string; size?: "default" | "large" }) {
  const textSize = size === "large" ? "text-3xl md:text-4xl" : "text-xl md:text-2xl";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-bold tracking-tight ${textSize}`}>
        <span className="text-[#1e3a8a]">Scam</span>
        <span className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">Blocker</span>
      </span>
      <svg viewBox="0 0 40 40" className={size === "large" ? "h-8 w-8" : "h-6 w-6"}>
        <rect x="4" y="12" width="6" height="16" rx="3" fill="url(#waveGradient1)" />
        <rect x="17" y="4" width="6" height="32" rx="3" fill="url(#waveGradient2)" />
        <rect x="30" y="12" width="6" height="16" rx="3" fill="url(#waveGradient3)" />
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-[8px] text-slate-400 -ml-1 mt-1">™</span>
    </div>
  );
}

// Demo Call History Component
function DemoCallHistory() {
  const calls = [
    { id: 1, number: "+44 161 xxx xxx", name: "Unknown", type: "blocked", time: "2 mins ago", reason: "HMRC scam pattern detected", risk: 0.94 },
    { id: 2, number: "+44 7700 xxx xxx", name: "Mum", type: "whitelisted", time: "15 mins ago", duration: "4:32" },
    { id: 3, number: "+44 203 xxx xxx", name: "Unknown", type: "screened", time: "1 hour ago", reason: "Caller verified as British Gas", duration: "2:15" },
    { id: 4, number: "Withheld", name: "Blocked", type: "blocked", time: "2 hours ago", reason: "Withheld number blocked" },
    { id: 5, number: "+44 7911 xxx xxx", name: "Dr. Smith", type: "whitelisted", time: "Yesterday", duration: "8:22" },
  ];

  const getCallIcon = (type: string) => {
    if (type === "blocked") return <PhoneMissed className="h-4 w-4 text-red-500" />;
    if (type === "whitelisted") return <PhoneIncoming className="h-4 w-4 text-green-500" />;
    return <PhoneIncoming className="h-4 w-4 text-amber-500" />;
  };

  const getStatusColor = (type: string) => {
    if (type === "blocked") return "border-l-4 border-l-red-500 bg-red-50/50";
    if (type === "whitelisted") return "border-l-4 border-l-green-500 bg-green-50/50";
    return "border-l-4 border-l-amber-500 bg-amber-50/50";
  };

  return (
    <div className="rounded-xl border bg-white shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span className="font-medium text-sm">Call Safety History</span>
        </div>
        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
          Live
        </Badge>
      </div>
      
      <div className="grid grid-cols-4 gap-2 p-3 bg-slate-50 border-b text-center">
        <div>
          <div className="text-lg font-bold">247</div>
          <div className="text-[10px] text-slate-500">Total</div>
        </div>
        <div>
          <div className="text-lg font-bold text-red-600">89</div>
          <div className="text-[10px] text-slate-500">Blocked</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">142</div>
          <div className="text-[10px] text-slate-500">Family</div>
        </div>
        <div>
          <div className="text-lg font-bold text-amber-600">16</div>
          <div className="text-[10px] text-slate-500">Screened</div>
        </div>
      </div>
      
      <div className="divide-y max-h-[300px] overflow-y-auto">
        {calls.map((call) => (
          <div key={call.id} className={`p-3 ${getStatusColor(call.type)}`}>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                {getCallIcon(call.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{call.number}</span>
                  {call.name && <span className="text-xs text-slate-500">({call.name})</span>}
                  <Badge variant={call.type === "blocked" ? "destructive" : call.type === "whitelisted" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                    {call.type}
                  </Badge>
                  {call.risk && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-red-50 text-red-700 border-red-200">
                      Risk: {Math.round(call.risk * 100)}%
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{call.time}</span>
                  {call.duration && <span>• {call.duration}</span>}
                </div>
                {call.reason && (
                  <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    {call.reason}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Demo Settings Panel
function DemoSettingsPanel() {
  const [settings, setSettings] = useState({
    whitelist: true,
    guardrails: true,
    blockWithheld: true,
    blockInternational: false,
    fraudProtection: true,
    blockPayments: true,
    liveMonitoring: true,
  });

  return (
    <div className="rounded-xl border bg-white shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-3 flex items-center gap-2">
        <Shield className="h-4 w-4" />
        <span className="font-medium text-sm">Protection Settings</span>
      </div>
      
      <div className="p-4 space-y-4">
        {[
          { key: "whitelist", label: "Whitelist Protection", desc: "Family & friends skip screening", icon: Users },
          { key: "guardrails", label: "Hard Guardrails", desc: "Block known scam patterns", icon: ShieldAlert },
          { key: "blockWithheld", label: "Block Withheld", desc: "Reject private numbers", icon: PhoneOff },
          { key: "fraudProtection", label: "AI Fraud Detection", desc: "Real-time behavior analysis", icon: Brain },
          { key: "blockPayments", label: "Payment Blocker™", desc: "Supervise all payments", icon: CreditCard },
          { key: "liveMonitoring", label: "Live Call Monitoring", desc: "Monitor active calls", icon: Eye },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center">
                <item.icon className="h-4 w-4 text-violet-600" />
              </div>
              <div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-[10px] text-slate-500">{item.desc}</div>
              </div>
            </div>
            <Switch
              checked={settings[item.key as keyof typeof settings]}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, [item.key]: checked }))}
              className="data-[state=checked]:bg-violet-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>ScamBlocker - AI-Powered Scam Call Protection for Landlines & Mobiles | UK</title>
        <meta name="description" content="Stop scam calls before they reach your family. ScamBlocker uses real-time AI to block fraudsters on landlines and mobiles. Protect elderly parents from phone scams. From £14.99/month." />
        <meta name="keywords" content="scam call blocker, phone scam protection, elderly scam protection, AI call screening, landline protection, mobile scam blocker, UK scam calls, fraud prevention" />
        <link rel="canonical" href="https://scamblocker.co.uk" />
      </Helmet>

      {/* Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
          : 'bg-transparent'
      }`}>
        <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
          <ScamBlockerLogo />
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-slate-600 hover:text-violet-600 transition-colors font-medium">How It Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-violet-600 transition-colors font-medium">Pricing</a>
            <a href="#faq" className="text-slate-600 hover:text-violet-600 transition-colors font-medium">FAQ</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:inline-flex font-medium">Sign In</Button>
            </Link>
            <Link to="/join">
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 font-semibold shadow-lg shadow-violet-600/20">
                Get Protected
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#4c1d95] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={MEDIA.heroVideo} type="video/mp4" />
          </video>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-white" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-500 rounded-full blur-[120px] opacity-20" />
        
        <div className="container relative px-4 md:px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm font-semibold text-white/90 mb-6 border border-white/20">
              <Zap className="h-4 w-4 text-amber-400" />
              Real-time AI Protection • Powered by SONIQ
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Stop Scammers{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Before</span>{" "}
              <br className="hidden md:block" />
              They Reach Mum
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
              Other services record scam calls and tell you about them <strong className="text-white">after</strong>.
            </p>
            <p className="text-lg md:text-xl text-white font-semibold mb-8 max-w-2xl mx-auto">
              We block them in real-time with AI that actually understands what's happening.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to="/join">
                <Button size="lg" className="w-full sm:w-auto bg-white text-violet-700 hover:bg-slate-100 text-lg h-14 px-8 font-semibold shadow-xl">
                  Get Protected — From £14.99/mo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="text-lg">🇬🇧</span> 100% UK-Based
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-4 w-4" /> GDPR Compliant
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> 14-Day Money Back
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Banner */}
      <section className="py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
            <Smartphone className="h-5 w-5" />
            <span className="font-medium">Now available for mobile too.</span>
            <span className="text-cyan-100">Keep your provider. Keep your number. Just add protection.</span>
            <Link to="/mobile" className="underline hover:no-underline font-semibold">
              See how it works →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900 text-white -mt-1">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">47%</p>
              <p className="text-slate-400">of all calls are scam attempts</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">78%</p>
              <p className="text-slate-400">target people over 65</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">£10,000</p>
              <p className="text-slate-400">average loss per victim</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet-100 text-violet-700 hover:bg-violet-100">What You'll See</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Real-Time <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Protection</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Monitor calls, manage settings, and keep your family safe.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <DemoCallHistory />
            <DemoSettingsPanel />
          </div>
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Difference? <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Timing.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              When it comes to scam protection, every second counts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Other Services */}
            <Card className="border-2 border-red-200 bg-red-50/30">
              <CardHeader className="bg-red-100/50 border-b border-red-200">
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <X className="h-6 w-6" /> Other Services
                </CardTitle>
                <CardDescription className="text-red-600">Protection after the damage is done</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { step: "1", text: "Scam call goes straight to Mum" },
                  { step: "2", text: "20-minute conversation happens" },
                  { step: "3", text: "Recording analyzed for keywords" },
                  { step: "4", text: "Hours later, you get an alert" },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-200 text-red-700 flex items-center justify-center font-bold text-sm">{item.step}</div>
                    <span className="text-slate-700">{item.text}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-red-200 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center">
                    <X className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-bold text-red-700">Damage done. Money gone.</p>
                </div>
              </CardContent>
            </Card>

            {/* ScamBlocker */}
            <Card className="border-2 border-violet-300 bg-violet-50/30 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-violet-100 to-fuchsia-100 border-b border-violet-200">
                <CardTitle className="flex items-center gap-2 text-violet-700">
                  <Shield className="h-6 w-6" /> ScamBlocker™
                </CardTitle>
                <CardDescription className="text-violet-600">Protection before the call connects</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { step: "1", text: "AI intercepts BEFORE Mum answers" },
                  { step: "2", text: "Your voice asks \"Who's calling?\"" },
                  { step: "3", text: "Real-time intent analysis runs" },
                  { step: "4", text: "Scam blocked, you're notified instantly" },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-bold text-sm">{item.step}</div>
                    <span className="text-slate-700">{item.text}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-violet-200 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-bold text-green-700">Mum never knew. Peace of mind.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5 Layers */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              5 Layers of <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">AI Protection</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Multiple lines of defence, working together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                layer: 1, 
                icon: Users, 
                title: "Whitelist", 
                desc: "Trusted callers skip screening",
                detail: "Family, friends, and regular callers go straight through.",
                gradient: "from-blue-500 to-cyan-500" 
              },
              { 
                layer: 2, 
                icon: ShieldCheck, 
                title: "Trust Score", 
                desc: "Number verification",
                detail: "Every number checked against spam databases and carrier verification.",
                gradient: "from-violet-500 to-purple-500" 
              },
              { 
                layer: 3, 
                icon: Mic, 
                title: "Voice Screen", 
                desc: "Your voice answers",
                detail: "Unknown callers hear your voice asking \"Who's calling please?\"",
                gradient: "from-fuchsia-500 to-pink-500" 
              },
              { 
                layer: 4, 
                icon: Brain, 
                title: "AI Analysis", 
                desc: "Real-time intent detection",
                detail: "Pressure tactics, urgency language, payment requests - all analysed live.",
                gradient: "from-amber-500 to-orange-500" 
              },
              { 
                layer: 5, 
                icon: Eye, 
                title: "Live Monitor", 
                desc: "Ongoing protection",
                detail: "Payment Blocker™ kicks in if financial requests emerge mid-call.",
                gradient: "from-emerald-500 to-green-500" 
              },
            ].map((layer) => (
              <Card key={layer.layer} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-xs font-bold text-slate-400 mb-3">LAYER {layer.layer}</div>
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${layer.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <layer.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1 text-lg">{layer.title}</h3>
                  <p className="text-sm text-violet-600 font-medium mb-3">{layer.desc}</p>
                  <p className="text-sm text-slate-600">{layer.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, Honest Pricing
            </h2>
            <p className="text-lg text-slate-600">Protection that pays for itself after one blocked scam.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Home (Landline) */}
            <Card className="border-2 border-violet-300 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
              <CardHeader>
                <div className="h-14 w-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Phone className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">ScamBlocker Home</CardTitle>
                <CardDescription>For landlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-bold">£14.99</span>
                  <span className="text-slate-500">/month</span>
                  <p className="text-sm text-violet-600 font-medium">Save £10/mo for first 6 months</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "GA11 adapter included",
                    "Keep your number — we port it free",
                    "2,000 minutes to UK landlines & mobiles",
                    "All 5 AI protection layers",
                    "Payment Blocker™ included",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-violet-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/join?type=landline" className="block">
                  <Button className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
                    Protect Your Landline
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Mobile */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <div className="h-14 w-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Smartphone className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">ScamBlocker Mobile</CardTitle>
                <CardDescription>For smartphones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-bold">£7.99</span>
                  <span className="text-slate-500">/month</span>
                  <p className="text-sm text-slate-500">No setup fee</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Works alongside your current provider",
                    "Get a new protected number",
                    "All 5 AI protection layers",
                    "Payment Blocker™ included",
                    "30-day rolling contract",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/mobile" className="block">
                  <Button variant="outline" className="w-full h-12 border-cyan-300 text-cyan-700 hover:bg-cyan-50">
                    Learn How It Works <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "How does it work with my existing phone?",
                  a: "For landlines, we send you a GA11 adapter that plugs into your router. Your existing phone plugs into the adapter. Everything works exactly as before - just with AI protection."
                },
                {
                  q: "Do I need to change my number?",
                  a: "For landlines - no! We port your existing number to our system free of charge. For mobile, you get a new protected ScamBlocker number while keeping your real number private."
                },
                {
                  q: "What is Payment Blocker™?",
                  a: "Payment Blocker supervises any call where payment or contracts are discussed. Your appointed contact is called to join and approve or decline. Perfect for protecting vulnerable family members."
                },
                {
                  q: "Is there a contract?",
                  a: "ScamBlocker Home has a 12-month minimum term. ScamBlocker Mobile is 30-day rolling. All plans include a 14-day cooling-off period."
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4 bg-white">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Protect Your Family?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Setup takes less than 10 minutes. Protection starts immediately.
          </p>
          <Link to="/join">
            <Button size="lg" className="bg-white text-violet-700 hover:bg-slate-100 text-lg h-14 px-10 font-semibold shadow-xl">
              Get Protected Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <ScamBlockerLogo className="mb-4" />
              <p className="text-sm">Protecting UK families from phone scams with real-time AI.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-violet-400">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-violet-400">Pricing</a></li>
                <li><a href="#faq" className="hover:text-violet-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-violet-400">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="hover:text-violet-400">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-violet-400">Terms of Service</Link></li>
                <li><Link to="/complaints" className="hover:text-violet-400">Complaints</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-sm text-center">
            <p>© {new Date().getFullYear()} ScamBlocker, a trading style of We Are One 1 Limited</p>
            <p className="text-xs text-slate-500 mt-2">Company No. 15052885 | Registered Office: 20 Wenlock Road, London, England, N1 7GU</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
