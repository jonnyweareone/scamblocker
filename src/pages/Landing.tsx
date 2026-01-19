import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Shield, Phone, Smartphone, ShieldCheck, Users, CreditCard, 
  CheckCircle2, ArrowRight, X, Clock, 
  Zap, Brain, Eye, PhoneOff, ShieldAlert, Activity, Lock, Play,
  PhoneIncoming, PhoneMissed, Mic, Calendar,
  Heart, Tv, FileText, Mail, Sparkles
} from "lucide-react";
import { RealtimeVoiceDemo } from "@/components/demo/RealtimeVoiceDemo";
import { useState, useEffect } from "react";

// Pexels media assets
const MEDIA = {
  heroVideo: "https://videos.pexels.com/video-files/5708833/5708833-hd_1920_1080_25fps.mp4",
  heroImage: "https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?auto=compress&cs=tinysrgb&w=1200",
  familyImage: "https://images.pexels.com/photos/6972784/pexels-photo-6972784.jpeg?auto=compress&cs=tinysrgb&w=1200",
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

export default function ScamBlockerLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [emailNotify, setEmailNotify] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="ScamBlocker - AI-Powered Scam Call Protection UK | Digital Landline"
        description="Protect your landline and mobile from scam calls with AI screening. Perfect for elderly protection. £14.99/month. Digital landline with UK area codes. Stop HMRC, bank & Amazon scams instantly."
        keywords="scam blocker, digital landline, safe phone for elderly, prevent phone scams, call protection uk, ai call screening, elderly phone protection, virtual landline uk, phone scam blocker, senior phone service"
        url="https://scamblocker.co.uk"
      />
      <StructuredData type="homepage" />
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        .gradient-text {
          background: linear-gradient(135deg, #7c3aed 0%, #db2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #4c1d95 100%);
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(124, 58, 237, 0.15);
        }
        
        .glow-violet {
          box-shadow: 0 0 60px -12px rgba(124, 58, 237, 0.4);
        }
      `}</style>

      {/* Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
          : 'bg-transparent'
      }`}>
        <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
          <ScamBlockerLogo />
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#demo" className="text-slate-600 hover:text-violet-600 transition-colors font-medium">Try Demo</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-violet-600 transition-colors font-medium">How It Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-violet-600 transition-colors font-medium">Pricing</a>
            <a href="#faq" className="text-slate-600 hover:text-violet-600 transition-colors font-medium">FAQ</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:inline-flex font-medium">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 font-semibold shadow-lg shadow-violet-600/20">
                Get Protected
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative hero-gradient overflow-hidden">
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
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-white text-violet-700 hover:bg-slate-100 text-lg h-14 px-8 font-semibold shadow-xl">
                  Get Protected — From £14.99/mo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-2 bg-white/20 border-white/50 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Play className="mr-2 h-5 w-5" />
                  Try the Demo
                </Button>
              </a>
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

      {/* Interactive Demo Section */}
      <section id="demo" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet-100 text-violet-700 hover:bg-violet-100">Interactive Demo</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Try It <span className="gradient-text">Live</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Speak into your microphone and watch the AI analyse in real-time.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <RealtimeVoiceDemo />
          </div>

          {/* App Previews */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-slate-700">What You'll See in the App</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <DemoCallHistory />
            <DemoSettingsPanel />
          </div>
        </div>
      </section>

      {/* Payment Blocker Mini-Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                For Families & Carers
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                She Can Still Shop. <span className="text-fuchsia-300">Just Not Alone.</span>
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                QVC orders, energy renewals, charity donations - legitimate calls where someone vulnerable shouldn't decide alone. 
                <strong className="text-white"> Payment Blocker™</strong> means the right person is always in the loop.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* What Gets Supervised */}
              <Card className="bg-white/10 border-white/20 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-fuchsia-400" />
                    What Gets Supervised
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: CreditCard, label: "Card payments & bank transfers" },
                    { icon: FileText, label: "Contract renewals & sign-ups" },
                    { icon: Zap, label: "Energy deals & switches" },
                    { icon: Smartphone, label: "Mobile upgrades" },
                    { icon: Heart, label: "Charity donations" },
                    { icon: Tv, label: "TV shopping purchases" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90">
                      <item.icon className="h-4 w-4 text-fuchsia-400" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card className="bg-white/10 border-white/20 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Phone className="h-5 w-5 text-fuchsia-400" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { step: "1", text: "AI detects payment or contract language" },
                    { step: "2", text: "Caller hears: \"This line has Payment Protection...\"" },
                    { step: "3", text: "Your phone rings to join the call" },
                    { step: "4", text: "You listen, then approve or decline" },
                    { step: "5", text: "If unavailable → voicemail + SMS alert" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-fuchsia-500 flex items-center justify-center text-xs font-bold shrink-0">
                        {item.step}
                      </div>
                      <span className="text-white/90 text-sm">{item.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* UI Preview */}
            <div className="bg-white rounded-xl p-6 shadow-2xl mb-8">
              <div className="text-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-violet-600" />
                    Emergency & Appointed Contacts
                  </h4>
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-700">+ Add Contact</Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 p-3 bg-slate-50 text-xs font-medium text-slate-500 border-b">
                    <div>Name</div>
                    <div>Relationship</div>
                    <div>Contact</div>
                    <div>Notification</div>
                    <div>Permissions</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-3 items-center">
                    <div className="font-medium">Jonny</div>
                    <div className="text-slate-600">Son</div>
                    <div className="text-sm text-slate-600">+447547...</div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" /> Call
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-violet-100 text-violet-700 text-xs">🛡️ Appointed</Badge>
                      <Badge variant="outline" className="text-xs">Can Approve</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/70 mb-2">
                Ideal for <strong className="text-white">Power of Attorney</strong>, dementia care, or anyone supporting a loved one.
              </p>
              <p className="text-sm text-white/50">
                Fully DPA compliant. Legitimate companies appreciate knowing exactly who to contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Difference? <span className="gradient-text">Timing.</span>
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
            <Card className="border-2 border-violet-300 bg-violet-50/30 shadow-xl glow-violet">
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

      {/* Call Memory Mini-Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-violet-100 text-violet-700 hover:bg-violet-100">
                <Sparkles className="h-3 w-3 mr-1" />
                Intelligent Learning
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                We Remember. <span className="gradient-text">So Scammers Can't Pretend.</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                ScamBlocker learns who calls and why. Trusted callers get recognised. Imposters get caught.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Harriet Story */}
              <Card className="card-hover border-2 border-violet-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    🐕 The Dog Groomer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="font-medium text-amber-800">December</p>
                      <p className="text-slate-600">Harriet calls about Fluffy's grooming → carefully screened, verified, connected</p>
                    </div>
                    <div className="p-3 rounded-lg bg-violet-50 border border-violet-200">
                      <p className="font-medium text-violet-800">February</p>
                      <p className="text-slate-600">Harriet calls again → <em>"Hi Harriet! Calling about Fluffy again?"</em></p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <p className="font-medium text-emerald-800">Future</p>
                      <p className="text-slate-600">Harriet is trusted → calls go straight through</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specsavers Story */}
              <Card className="card-hover border-2 border-violet-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    👓 The Follow-Up
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <p className="font-medium text-slate-800">Last Week</p>
                      <p className="text-slate-600">Specsavers called about an eye test appointment</p>
                    </div>
                    <div className="p-3 rounded-lg bg-violet-50 border border-violet-200">
                      <p className="font-medium text-violet-800">Today</p>
                      <p className="text-slate-600">"Specsavers following up" → System recognises: genuine follow-up ✅</p>
                    </div>
                    <div className="p-3 rounded-lg bg-fuchsia-50 border border-fuchsia-200">
                      <p className="font-medium text-fuchsia-800 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Bonus Feature
                      </p>
                      <p className="text-slate-600">"Shall I send Mum a reminder call about her eye test?"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Layers - Expanded */}
      <section id="5-layers" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              5 Layers of <span className="gradient-text">AI Protection</span>
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
                detail: "Family, friends, and regular callers go straight through. The system learns who's trusted - like Harriet from the dog groomers. Second call? Instant recognition.",
                gradient: "from-blue-500 to-cyan-500" 
              },
              { 
                layer: 2, 
                icon: ShieldCheck, 
                title: "Trust Score", 
                desc: "Number verification",
                detail: "Every number is checked against spam databases, carrier verification, and pattern matching. Withheld numbers? Blocked. Known scam numbers? Gone before they ring.",
                gradient: "from-violet-500 to-purple-500" 
              },
              { 
                layer: 3, 
                icon: Mic, 
                title: "Voice Screen", 
                desc: "Your voice answers",
                detail: "Unknown callers hear your voice asking \"Who's calling please?\" They think they're talking to you - but they're being assessed. Natural, not robotic.",
                gradient: "from-fuchsia-500 to-pink-500" 
              },
              { 
                layer: 4, 
                icon: Brain, 
                title: "AI Analysis", 
                desc: "Real-time intent detection",
                detail: "Pressure tactics, urgency language, payment requests, HMRC impersonation - all analysed live. 9 UK-specific scam patterns detected instantly. Call Memory builds context over time.",
                gradient: "from-amber-500 to-orange-500" 
              },
              { 
                layer: 5, 
                icon: Eye, 
                title: "Live Monitor", 
                desc: "Ongoing protection",
                detail: "Protection doesn't stop when the call connects. Payment Blocker™ kicks in if financial requests emerge mid-call. You're always in control.",
                gradient: "from-emerald-500 to-green-500" 
              },
            ].map((layer) => (
              <Card key={layer.layer} className="card-hover border-0 shadow-lg">
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
      <section id="pricing" className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, Honest Pricing
            </h2>
            <p className="text-lg text-slate-600">Protection that pays for itself after one blocked scam.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Home (Landline) - Primary */}
            <Card className="card-hover border-2 border-violet-300 shadow-xl glow-violet relative overflow-hidden">
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
                  <p className="text-xs text-slate-500">Then £24.99/mo</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "GA11 adapter included (uses your existing phone)",
                    "Keep your number — we port it free",
                    "2,000 minutes to UK landlines & mobiles",
                    "All 5 AI protection layers",
                    "Payment Blocker™ included",
                    "Family dashboard & alerts"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-violet-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-500 mb-3">£29 one-time setup fee • 12-month minimum term</p>
                  <Link to="/signup?type=landline" className="block">
                    <Button className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
                      Protect Your Landline
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Mobile - Secondary */}
            <Card className="card-hover border-2 border-slate-200">
              <CardHeader>
                <div className="h-14 w-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Smartphone className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">ScamBlocker Mobile</CardTitle>
                <CardDescription>For smartphones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-bold">£9.99</span>
                  <span className="text-slate-500">/month</span>
                  <p className="text-sm text-slate-500">No setup fee</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Works alongside your current provider",
                    "Get a new protected number",
                    "eSIM — no physical SIM needed",
                    "All 5 AI protection layers",
                    "Payment Blocker™ included",
                    "30-day rolling contract"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-500 mb-3">Cancel anytime • iPhone XS+ or Android 2019+</p>
                  <Link to="/mobile" className="block">
                    <Button variant="outline" className="w-full h-12 border-cyan-300 text-cyan-700 hover:bg-cyan-50">
                      Learn How It Works <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            🔒 14-day cooling-off period on all plans • <Link to="/terms" className="underline hover:text-violet-600">View full terms</Link>
          </p>

          {/* International Calling Bundles */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Need to call abroad?</h3>
              <p className="text-slate-600">International calls are blocked by default to keep you safe. Add a bundle anytime from your account.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { flag: "🇺🇸", name: "North America", price: "£5", mins: "300 mins" },
                { flag: "🇮🇳", name: "India", price: "£5", mins: "150 mins" },
                { flag: "🇨🇳", name: "China & HK", price: "£5", mins: "100 mins" },
                { flag: "🇦🇺", name: "Australia/NZ", price: "£5", mins: "100 mins" },
                { flag: "🇪🇺", name: "Europe", price: "£7", mins: "200 mins" },
                { flag: "🇵🇰", name: "South Asia", price: "£10", mins: "60 mins" },
                { flag: "🇯🇲", name: "Caribbean", price: "£15", mins: "50 mins" },
                { flag: "🇳🇬", name: "Africa", price: "£15", mins: "50 mins" },
              ].map((bundle) => (
                <div key={bundle.name} className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-violet-300 transition-colors">
                  <span className="text-2xl">{bundle.flag}</span>
                  <p className="font-medium text-slate-900 text-sm mt-1">{bundle.name}</p>
                  <p className="text-violet-600 font-bold">{bundle.price}<span className="text-slate-400 font-normal">/mo</span></p>
                  <p className="text-xs text-slate-500">{bundle.mins}</p>
                </div>
              ))}
            </div>
            
            <p className="text-center text-sm text-slate-500 mt-4">
              Bundles can be added or removed anytime. <Link to="/rates" className="underline hover:text-violet-600">View full rate card →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Families Are <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Saying</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { quote: "Blocked 47 scam calls in the first 3 months. Mum hasn't been tricked once since we set it up.", author: "Sarah T.", location: "Birmingham" },
              { quote: "The AI asked 'HMRC' to verify their employee number. They hung up immediately. Incredible.", author: "David M.", location: "Manchester" },
              { quote: "Peace of mind knowing Dad is protected even when I can't be there. Worth every penny.", author: "Emma W.", location: "London" },
            ].map((t, i) => (
              <Card key={i} className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400">★</span>)}
                  </div>
                  <p className="text-slate-300 mb-4">"{t.quote}"</p>
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-sm text-slate-400">{t.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "How does it work with my existing phone?",
                  a: "For landlines, we send you a GA11 adapter that plugs into your router. Your existing phone plugs into the adapter. Everything works exactly as before - just with AI protection. You get 2,000 minutes per month to UK landlines and major mobiles."
                },
                {
                  q: "Do I need to change my number?",
                  a: "For landlines - no! We port your existing number to our system free of charge. Your family, friends, and contacts won't notice any difference. For mobile, you get a new protected ScamBlocker number while keeping your real number private."
                },
                {
                  q: "What if a real caller gets blocked?",
                  a: "Very rare, but it happens. The caller is politely asked to identify themselves. If they're genuine, they'll be put through. You can also whitelist any number instantly from the app, and they'll never be screened again."
                },
                {
                  q: "How does mobile protection work?",
                  a: "You get a new ScamBlocker number protected by our AI. Share this number with companies and services instead of your real number. Scam calls get blocked, safe calls are forwarded to your phone. You keep your existing provider and real number for family."
                },
                {
                  q: "What is Payment Blocker™?",
                  a: "Payment Blocker supervises any call where payment or contracts are discussed. The caller is informed, your appointed contact (like a son or daughter) is called to join, and they can approve or decline. Perfect for protecting vulnerable family members from TV shopping, energy deals, or pressure selling."
                },
                {
                  q: "Can Mum still buy things over the phone?",
                  a: "Yes! She's not blocked - just supervised. When a payment is requested, you're brought into the call to help. Legitimate purchases go through with your approval. It's support, not restriction."
                },
                {
                  q: "What happens if I don't answer when called to join?",
                  a: "The caller is offered voicemail, and you receive an SMS alert immediately. You can call back or review the situation in the app. No payment can go through without your approval."
                },
                {
                  q: "Is there a contract?",
                  a: "ScamBlocker Home has a 12-month minimum term with a £29 setup fee. ScamBlocker Mobile is a 30-day rolling contract with no setup fee. All plans include a 14-day cooling-off period."
                },
                {
                  q: "Can I install it myself?",
                  a: "Absolutely. The landline adapter is plug-and-play - just connect to your router and phone. Takes about 5 minutes. Mobile setup is done through the app. No engineer visit needed."
                },
                {
                  q: "What about withheld or international calls?",
                  a: "Withheld numbers are screened by our AI before being put through. International calls are blocked by default to protect you from scams - but you can add calling bundles from £5/month if you need to call abroad."
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
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
          <Link to="/signup">
            <Button size="lg" className="bg-white text-violet-700 hover:bg-slate-100 text-lg h-14 px-10 font-semibold shadow-xl">
              Get Protected Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-white/60 mt-6">14-day cooling-off period • UK-based support • <Link to="/terms" className="underline hover:text-white">Full terms</Link></p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="container px-4 md:px-6">
          {/* Email Protection Coming Soon */}
          <div className="max-w-xl mx-auto mb-12 p-6 rounded-xl bg-slate-800 border border-slate-700 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-violet-400" />
              <span className="font-semibold text-white">Email Protection</span>
              <Badge variant="outline" className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs">Coming Soon</Badge>
            </div>
            <p className="text-sm text-slate-400 mb-4">AI-powered scam detection for your inbox.</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={emailNotify}
                onChange={(e) => setEmailNotify(e.target.value)}
                className="bg-slate-900 border-slate-600 text-white"
              />
              <Button className="bg-violet-600 hover:bg-violet-700 shrink-0">
                Notify Me
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <ScamBlockerLogo className="mb-4" />
              <p className="text-sm">Protecting UK families from phone scams with real-time AI.</p>
              <p className="text-xs mt-2 text-slate-500">A SONIQ product by We Are One 1 Limited</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#demo" className="hover:text-violet-400">Try Demo</a></li>
                <li><a href="#how-it-works" className="hover:text-violet-400">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-violet-400">Pricing</a></li>
                <li><a href="#faq" className="hover:text-violet-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/guides" className="hover:text-violet-400">Help Guides</Link></li>
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
          <div className="pt-8 border-t border-slate-800 text-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <p>© {new Date().getFullYear()} ScamBlocker, a trading style of We Are One 1 Limited</p>
              <p className="flex items-center gap-2"><span>🇬🇧</span> 100% UK-Based • GDPR Compliant</p>
            </div>
            <p className="text-xs text-slate-500 text-center">
              Company No. 15052885 | Registered Office: 20 Wenlock Road, London, England, N1 7GU
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
