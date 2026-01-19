import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, ArrowRight, CheckCircle2, 
  CreditCard, PhoneOff, Globe, PhoneIncoming,
  Bell, Eye, Mail, Heart
} from "lucide-react";
import { toast } from "sonner";
import { ScamBlockerPayment } from "@/components/consumer/ScamBlockerPayment";
import { supabase } from "@/integrations/supabase/client";

// Types
type ProtectingType = "mum" | "dad" | "mum_and_dad" | "grandparent" | "partner" | "myself" | "other" | null;
type ProductType = "landline" | "mobile" | "both" | null;
type NumberChoice = "port" | "new" | "undecided" | null;

interface ProtectedPerson {
  firstName: string;
  nickname: string;
}

interface Concerns {
  scamCalls: boolean;
  payments: boolean;
  personalDetails: boolean;
  nuisance: boolean;
  targetedBefore: boolean;
  cantBeThere: boolean;
}

interface ProtectionSettings {
  paymentBlocker: boolean;
  paymentBankTransfers: boolean;
  paymentGiftCards: boolean;
  paymentCardPayments: boolean;
  paymentDirectDebits: boolean;
  paymentContracts: boolean;
  blockWithheld: boolean;
  blockInternational: boolean;
  blockSales: boolean;
  blockSurveys: boolean;
  vipSafelist: boolean;
  instantAlerts: boolean;
  liveMonitoring: boolean;
  weeklySummary: boolean;
}

interface PortingDetails {
  number: string;
  provider: string;
  accountHolder: string;
}

interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
}

interface AccountDetails {
  name: string;
  email: string;
  phone: string;
  password: string;
}

function ScamBlockerLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xl md:text-2xl font-bold tracking-tight">
        <span className="text-[#1e3a8a]">Scam</span>
        <span className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">Blocker</span>
      </span>
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-24 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-6 border border-violet-100">
        {children}
      </div>
    </div>
  );
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2 justify-center mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i + 1 <= current 
              ? "w-8 bg-gradient-to-r from-violet-600 to-fuchsia-600" 
              : "w-2 bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function ConfirmationCard({ 
  emoji, 
  title, 
  message, 
  onContinue 
}: { 
  emoji: string;
  title: string; 
  message: string; 
  onContinue: () => void;
}) {
  return (
    <div className="text-center space-y-6">
      <div className="text-6xl">{emoji}</div>
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-600">{message}</p>
      </div>
      <Button 
        onClick={onContinue}
        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
      >
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  
  // Form State
  const [protecting, setProtecting] = useState<ProtectingType>(null);
  const [person1, setPerson1] = useState<ProtectedPerson>({ firstName: "", nickname: "" });
  const [person2, setPerson2] = useState<ProtectedPerson>({ firstName: "", nickname: "" });
  
  const [concerns, setConcerns] = useState<Concerns>({
    scamCalls: true,
    payments: true,
    personalDetails: false,
    nuisance: false,
    targetedBefore: false,
    cantBeThere: false,
  });

  const [settings, setSettings] = useState<ProtectionSettings>({
    paymentBlocker: true,
    paymentBankTransfers: true,
    paymentGiftCards: true,
    paymentCardPayments: true,
    paymentDirectDebits: true,
    paymentContracts: true,
    blockWithheld: true,
    blockInternational: false,
    blockSales: true,
    blockSurveys: true,
    vipSafelist: true,
    instantAlerts: true,
    liveMonitoring: true,
    weeklySummary: false,
  });

  const [product, setProduct] = useState<ProductType>(null);
  const [landlineChoice, setLandlineChoice] = useState<NumberChoice>(null);
  const [porting, setPorting] = useState<PortingDetails>({ number: "", provider: "", accountHolder: "" });
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState<Address>({ line1: "", line2: "", city: "", postcode: "" });
  const [shipToDifferent] = useState(false);
  const [shippingAddress] = useState<Address>({ line1: "", line2: "", city: "", postcode: "" });
  const [account, setAccount] = useState<AccountDetails>({ name: "", email: "", phone: "", password: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const getDisplayName = () => {
    if (protecting === "myself") return "you";
    if (protecting === "mum_and_dad") {
      const name1 = person1.nickname || person1.firstName || "Mum";
      const name2 = person2.nickname || person2.firstName || "Dad";
      return `${name1} & ${name2}`;
    }
    return person1.nickname || person1.firstName || "them";
  };

  const displayName = getDisplayName();
  const isPlural = protecting === "mum_and_dad";

  const getStepConfig = () => {
    const steps = ["who", "names", "concerns", "core", "payments", "filtering", "alerts", "product"];
    
    if (product === "landline" || product === "both") {
      steps.push("landline");
      if (landlineChoice === "port") {
        steps.push("porting");
      }
    }
    
    if (product === "mobile" || product === "both") {
      steps.push("mobile");
    }
    
    steps.push("address", "account", "review");
    
    return steps;
  };

  const steps = getStepConfig();
  const currentStepName = steps[step - 1];
  const totalSteps = steps.length;

  const goNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const goBack = () => setStep(s => Math.max(s - 1, 1));

  // Track abandoned signups
  const trackAbandonedSignup = async (stepReached: string) => {
    if (!account.email) return;
    try {
      await supabase.functions.invoke("track-abandoned-signup", {
        body: {
          email: account.email,
          name: account.name || null,
          phone: account.phone || null,
          protectionType: product || null,
          stepReached,
          shippingPostcode: address.postcode || null,
        },
      });
    } catch (e) {
      console.log("Tracking error:", e);
    }
  };

  const getSidebarContent = () => {
    switch (currentStepName) {
      case "who":
        return (
          <>
            <div className="text-4xl mb-4">💔</div>
            <h3 className="font-bold text-slate-900 mb-2">Did you know?</h3>
            <p className="text-slate-600 text-sm">78% of scam victims never tell their family they were targeted.</p>
            <p className="text-violet-600 font-medium text-sm mt-4">You're doing the right thing.</p>
          </>
        );
      case "payments":
        return (
          <>
            <div className="text-4xl mb-4">💷</div>
            <h3 className="font-bold text-slate-900 mb-2">The big one</h3>
            <p className="text-slate-600 text-sm">89% of scam losses happen over the phone.</p>
            <p className="text-violet-600 font-bold text-sm mt-4">💷 £2.3M stopped this year</p>
          </>
        );
      default:
        return (
          <>
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="font-bold text-slate-900 mb-2">You're protected</h3>
            <p className="text-slate-600 text-sm">✓ 14-day money back<br />✓ UK-based support<br />✓ CISAS complaints scheme</p>
          </>
        );
    }
  };

  const renderWhoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Who are you protecting today?</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { id: "mum", emoji: "👩‍🦳", label: "Mum" },
          { id: "dad", emoji: "👨‍🦳", label: "Dad" },
          { id: "mum_and_dad", emoji: "👩‍🦳👨‍🦳", label: "Mum & Dad" },
          { id: "grandparent", emoji: "👴", label: "Grandparent" },
          { id: "partner", emoji: "🤝", label: "Partner" },
          { id: "myself", emoji: "🙋", label: "Myself" },
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => { setProtecting(option.id as ProtectingType); goNext(); }}
            className="p-6 rounded-xl border-2 transition-all hover:border-violet-300 hover:shadow-lg text-center border-slate-200 bg-white"
          >
            <div className="text-4xl mb-2">{option.emoji}</div>
            <div className="font-medium text-slate-900">{option.label}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderNamesStep = () => {
    if (protecting === "myself") {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What's your name?</h1>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName">Your first name</Label>
              <Input id="firstName" placeholder="e.g., Sarah" value={person1.firstName} onChange={(e) => setPerson1({ ...person1, firstName: e.target.value })} className="mt-1" />
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
            <Button onClick={goNext} disabled={!person1.firstName} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>
      );
    }

    const isBoth = protecting === "mum_and_dad";
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{isBoth ? "Tell us about your parents" : "What's their name?"}</h1>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" placeholder="e.g., Susan" value={person1.firstName} onChange={(e) => setPerson1({ ...person1, firstName: e.target.value })} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="nickname">What do you call them?</Label>
            <Input id="nickname" placeholder="e.g., Nanny Sue" value={person1.nickname} onChange={(e) => setPerson1({ ...person1, nickname: e.target.value })} className="mt-1" />
          </div>
          {isBoth && (
            <>
              <div className="border-t pt-4 mt-4">
                <Label htmlFor="firstName2">Dad's first name</Label>
                <Input id="firstName2" placeholder="e.g., Brian" value={person2.firstName} onChange={(e) => setPerson2({ ...person2, firstName: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="nickname2">What do you call him?</Label>
                <Input id="nickname2" placeholder="e.g., Grandad B" value={person2.nickname} onChange={(e) => setPerson2({ ...person2, nickname: e.target.value })} className="mt-1" />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
          <Button onClick={goNext} disabled={!person1.firstName || (isBoth && !person2.firstName)} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </div>
    );
  };

  const renderConcernsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What are you worried about?</h1>
        <p className="text-slate-600">Select all that apply</p>
      </div>
      <div className="space-y-3">
        {[
          { id: "scamCalls", label: "Scam phone calls", desc: '"Bank", "HMRC", "Police" imposters' },
          { id: "payments", label: "Being talked into payments", desc: 'Transfers, gift cards, "safe accounts"' },
          { id: "personalDetails", label: "Giving away personal details", desc: "Bank info, passwords, date of birth" },
          { id: "nuisance", label: "Nuisance and sales calls", desc: 'Cold callers, PPI' },
          { id: "targetedBefore", label: "Been targeted before", desc: "Close call or already lost money" },
          { id: "cantBeThere", label: "I can't always be there", desc: "Peace of mind when you're not around" },
        ].map((item) => (
          <label key={item.id} className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${concerns[item.id as keyof Concerns] ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-white"}`}>
            <Checkbox checked={concerns[item.id as keyof Concerns]} onCheckedChange={(checked) => setConcerns({ ...concerns, [item.id]: checked })} className="mt-1" />
            <div>
              <div className="font-medium text-slate-900">{item.label}</div>
              <div className="text-sm text-slate-500">{item.desc}</div>
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={goNext} disabled={!Object.values(concerns).some(v => v)} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );

  const renderCoreStep = () => (
    <ConfirmationCard emoji="✅" title="Fantastic." message={`${displayName} ${isPlural ? "are" : "is"} now protected from known scam patterns.`} onContinue={goNext} />
  );

  const renderPaymentsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">💳 Payment Protection</h1>
        <p className="text-slate-600">This is where scammers do real damage.</p>
      </div>
      <div className="p-4 rounded-xl border-2 border-violet-200 bg-violet-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">Payment Blocker™</div>
              <div className="text-sm text-slate-600">Pause calls and alert you when money is mentioned</div>
            </div>
          </div>
          <Switch checked={settings.paymentBlocker} onCheckedChange={(checked) => setSettings({ ...settings, paymentBlocker: checked })} />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={goNext} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );

  const renderFilteringStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">🚫 Unwanted Callers</h1>
      </div>
      <div className="space-y-3">
        {[
          { id: "blockWithheld", icon: PhoneOff, label: "Block Withheld Numbers" },
          { id: "blockInternational", icon: Globe, label: "Block International Calls" },
          { id: "blockSales", icon: PhoneIncoming, label: "Block Sales Calls" },
        ].map((item) => (
          <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl border ${settings[item.id as keyof ProtectionSettings] ? "border-violet-300 bg-violet-50" : "border-slate-200"}`}>
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-slate-600" />
              <span className="font-medium">{item.label}</span>
            </div>
            <Switch checked={settings[item.id as keyof ProtectionSettings] as boolean} onCheckedChange={(checked) => setSettings({ ...settings, [item.id]: checked })} />
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={goNext} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );

  const renderAlertsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">👨‍👩‍👧 Stay in the Loop</h1>
      </div>
      <div className="space-y-3">
        {[
          { id: "vipSafelist", icon: Heart, label: "VIP Safelist", desc: "Family skip screening" },
          { id: "instantAlerts", icon: Bell, label: "Instant Alerts", desc: "Text you immediately" },
          { id: "liveMonitoring", icon: Eye, label: "Live Monitoring", desc: "Listen to active calls" },
          { id: "weeklySummary", icon: Mail, label: "Weekly Summary", desc: "Email every Sunday" },
        ].map((item) => (
          <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl border ${settings[item.id as keyof ProtectionSettings] ? "border-violet-300 bg-violet-50" : "border-slate-200"}`}>
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-slate-600" />
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-slate-500">{item.desc}</div>
              </div>
            </div>
            <Switch checked={settings[item.id as keyof ProtectionSettings] as boolean} onCheckedChange={(checked) => setSettings({ ...settings, [item.id]: checked })} />
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={goNext} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );

  const renderProductStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What phone needs protection?</h1>
      </div>
      <div className="grid gap-4">
        {[
          { id: "landline", emoji: "📞", label: "Landline", desc: "Home phone", price: "£14.99/mo" },
          { id: "mobile", emoji: "📱", label: "Mobile", desc: "Smartphone", price: "£9.99/mo" },
          { id: "both", emoji: "📞📱", label: "Both", desc: "Complete coverage", price: "£21.99/mo", badge: "Save £2.99" },
        ].map((option) => (
          <button key={option.id} onClick={() => { setProduct(option.id as ProductType); goNext(); }} className="p-6 rounded-xl border-2 text-left transition-all hover:border-violet-300 hover:shadow-lg border-slate-200 bg-white">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{option.emoji}</div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900 text-lg">{option.label}</div>
                <div className="text-slate-600 text-sm">{option.desc}</div>
                <div className="mt-2">
                  <span className="text-xl font-bold text-slate-900">{option.price}</span>
                  {option.badge && <span className="ml-2 text-sm text-green-600 font-medium">{option.badge}</span>}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-start pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
      </div>
    </div>
  );

  const renderLandlineStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Keep current number?</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <button onClick={() => { setLandlineChoice("port"); goNext(); }} className="p-6 rounded-xl border-2 text-left hover:border-violet-300 border-slate-200 bg-white">
          <div className="text-3xl mb-3">✓</div>
          <div className="font-semibold text-lg">Yes, keep it</div>
          <div className="text-slate-600 text-sm">We'll transfer it (free, 1 day)</div>
        </button>
        <button onClick={() => { setLandlineChoice("new"); goNext(); }} className="p-6 rounded-xl border-2 text-left hover:border-violet-300 border-slate-200 bg-white">
          <div className="text-3xl mb-3">✨</div>
          <div className="font-semibold text-lg">New number</div>
          <div className="text-slate-600 text-sm">Fresh protected number</div>
        </button>
      </div>
      <div className="flex justify-start pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
      </div>
    </div>
  );

  const renderPortingStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Transfer your number</h1>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Current number</Label>
          <Input placeholder="01onal 567890" value={porting.number} onChange={(e) => setPorting({ ...porting, number: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label>Current provider</Label>
          <Select value={porting.provider} onValueChange={(v) => setPorting({ ...porting, provider: v })}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Select provider" /></SelectTrigger>
            <SelectContent>
              {["BT", "Sky", "TalkTalk", "Virgin Media", "Plusnet", "EE", "Vodafone", "Other"].map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Account holder name</Label>
          <Input placeholder="As on the bill" value={porting.accountHolder} onChange={(e) => setPorting({ ...porting, accountHolder: e.target.value })} className="mt-1" />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={goNext} disabled={!porting.number || !porting.provider} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );

  const renderMobileStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">📱 Mobile Protection</h1>
      </div>
      <div className="p-6 rounded-xl border border-violet-200 bg-violet-50/50 space-y-4">
        <div className="font-medium">How it works:</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> New protected number for public use</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Calls screened by AI</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Safe calls forwarded to real mobile</div>
        </div>
      </div>
      <div>
        <Label>Current mobile number</Label>
        <Input placeholder="07700 123456" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="mt-1" />
        <p className="text-xs text-slate-500 mt-1">We'll forward screened calls here</p>
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={goNext} disabled={!mobileNumber} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Where do they live?</h1>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Address line 1</Label>
          <Input placeholder="14 Rose Lane" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label>Address line 2 (optional)</Label>
          <Input value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} className="mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>City</Label>
            <Input placeholder="Newport" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="mt-1" />
          </div>
          <div>
            <Label>Postcode</Label>
            <Input placeholder="NP20 4AB" value={address.postcode} onChange={(e) => setAddress({ ...address, postcode: e.target.value })} className="mt-1" />
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={goNext} disabled={!address.line1 || !address.city || !address.postcode} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );

  const renderAccountStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Create your account</h1>
        <p className="text-slate-600">You'll manage protection from here</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Your name</Label>
          <Input placeholder="Sarah Smith" value={account.name} onChange={(e) => setAccount({ ...account, name: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label>Your email</Label>
          <Input type="email" placeholder="sarah@email.com" value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label>Your mobile</Label>
          <Input type="tel" placeholder="07700 900123" value={account.phone} onChange={(e) => setAccount({ ...account, phone: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" placeholder="At least 8 characters" value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })} className="mt-1" />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={() => { trackAbandonedSignup('account'); goNext(); }} disabled={!account.name || !account.email || !account.phone || account.password.length < 8} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </div>
  );

  const getPrice = () => {
    if (product === "landline") return { monthly: 14.99, setup: 29, todayTotal: 29 };
    if (product === "mobile") return { monthly: 9.99, setup: 0, todayTotal: 0 };
    if (product === "both") return { monthly: 21.99, setup: 29, todayTotal: 29 };
    return { monthly: 0, setup: 0, todayTotal: 0 };
  };

  const price = getPrice();

  const getOrderData = () => ({
    email: account.email,
    name: account.name,
    phone: account.phone,
    password: account.password,
    protectionType: product as "landline" | "mobile" | "both",
    shippingName: account.name,
    shippingAddress1: shipToDifferent ? shippingAddress.line1 : address.line1,
    shippingAddress2: shipToDifferent ? shippingAddress.line2 : address.line2,
    shippingCity: shipToDifferent ? shippingAddress.city : address.city,
    shippingPostcode: shipToDifferent ? shippingAddress.postcode : address.postcode,
    numberChoice: landlineChoice || undefined,
    portNumber: porting.number || undefined,
    portProvider: porting.provider || undefined,
    mobileForwardNumber: mobileNumber || undefined,
  });

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Let's protect {displayName} 🛡️</h1>
      </div>

      <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4">
        {(product === "landline" || product === "both") && (
          <div className="flex items-start gap-3">
            <span className="text-2xl">📞</span>
            <div>
              <div className="font-medium">Landline Protection</div>
              <div className="text-sm text-slate-600">{landlineChoice === "port" ? `${porting.number} (porting)` : "New number"}</div>
            </div>
          </div>
        )}
        {(product === "mobile" || product === "both") && (
          <div className="flex items-start gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <div className="font-medium">Mobile Protection</div>
              <div className="text-sm text-slate-600">Forwards to {mobileNumber}</div>
            </div>
          </div>
        )}
        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> AI scam screening</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Payment Blocker™</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Instant alerts</div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-violet-200 bg-violet-50/50 space-y-3">
        {price.setup > 0 && (
          <div className="flex justify-between">
            <span className="text-slate-600">Setup fee (adapter + delivery)</span>
            <span className="font-medium">£{price.setup.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-3 flex justify-between">
          <span className="font-semibold">Today's payment</span>
          <span className="font-bold text-lg">{price.todayTotal > 0 ? `£${price.todayTotal.toFixed(2)}` : "Nothing today"}</span>
        </div>
        <div className="text-sm text-slate-500">Then £{price.monthly.toFixed(2)}/month when service is active</div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <Checkbox checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} className="mt-1" />
        <span className="text-sm text-slate-600">
          I accept the <Link to="/terms" className="text-violet-600 hover:underline" target="_blank">Terms</Link> and <Link to="/privacy" className="text-violet-600 hover:underline" target="_blank">Privacy Policy</Link>
        </span>
      </label>

      {!showPayment ? (
        <>
          <Button disabled={!termsAccepted} className="w-full h-14 text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600" onClick={() => { trackAbandonedSignup('payment_started'); setShowPayment(true); }}>
            🔒 Set Up Payment & Protect {displayName}
          </Button>
          <div className="flex justify-start pt-2">
            <Button variant="ghost" onClick={goBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
          </div>
        </>
      ) : (
        <>
          <ScamBlockerPayment orderData={getOrderData()} onSuccess={() => navigate("/dashboard")} onError={(error) => toast.error(error)} />
          <div className="flex justify-start pt-2">
            <Button variant="ghost" onClick={() => setShowPayment(false)}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Review</Button>
          </div>
        </>
      )}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStepName) {
      case "who": return renderWhoStep();
      case "names": return renderNamesStep();
      case "concerns": return renderConcernsStep();
      case "core": return renderCoreStep();
      case "payments": return renderPaymentsStep();
      case "filtering": return renderFilteringStep();
      case "alerts": return renderAlertsStep();
      case "product": return renderProductStep();
      case "landline": return renderLandlineStep();
      case "porting": return renderPortingStep();
      case "mobile": return renderMobileStep();
      case "address": return renderAddressStep();
      case "account": return renderAccountStep();
      case "review": return renderReviewStep();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Sign Up for ScamBlocker | UK Scam Call Protection | Get Started</title>
        <meta name="title" content="Sign Up for ScamBlocker | Protect Your Family from Phone Scams" />
        <meta name="description" content="Get started with ScamBlocker in minutes. Choose your UK area code, protect your landline or mobile. £14.99/month, no contract. AI-powered scam detection. 14-day cooling-off period." />
        <meta name="keywords" content="scam blocker signup, phone protection uk, call screening service, scam call protection signup, landline protection registration" />
        <link rel="canonical" content="https://scamblocker.co.uk/signup" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scamblocker.co.uk/signup" />
        <meta property="og:title" content="Sign Up for ScamBlocker - Protect Your Family" />
        <meta property="og:description" content="Start protecting your family from scam calls. AI screening, payment blocking, instant alerts. From £14.99/month." />
        <meta property="og:image" content="https://scamblocker.co.uk/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://scamblocker.co.uk/signup" />
        <meta name="twitter:title" content="Sign Up for ScamBlocker" />
        <meta name="twitter:description" content="Protect your family from phone scams. AI screening & payment blocking. £14.99/month." />
        <meta name="twitter:image" content="https://scamblocker.co.uk/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
      </Helmet>

      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/"><ScamBlockerLogo /></Link>
          <Link to="/login"><Button variant="ghost" size="sm">Already have an account?</Button></Link>
        </div>
      </header>

      <div className="container max-w-6xl px-4 py-8">
        <ProgressDots current={step} total={totalSteps} />
        <div className="flex gap-8">
          <div className="flex-1 max-w-2xl mx-auto">{renderCurrentStep()}</div>
          <Sidebar>{getSidebarContent()}</Sidebar>
        </div>
      </div>
    </div>
  );
}
