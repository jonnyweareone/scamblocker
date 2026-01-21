import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, Phone, CheckCircle2, ArrowRight, Sparkles, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ScamBlocker Logo Component
function ScamBlockerLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="font-bold tracking-tight text-xl md:text-2xl">
        <span className="text-[#1e3a8a]">Scam</span>
        <span className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">Blocker</span>
      </span>
      <svg viewBox="0 0 40 40" className="h-6 w-6">
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
      <span className="text-[8px] text-slate-600 -ml-1 mt-1">™</span>
    </div>
  );
}

type FormData = {
  protecting: string;
  name: string;
  email: string;
  phone: string;
  wantsCall: boolean;
};

export default function StopScamCalls() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    protecting: "",
    name: "",
    email: "",
    phone: "",
    wantsCall: false,
  });

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of page and popup hasn't been shown
      if (e.clientY <= 0 && !exitPopupShown && !formData.email) {
        setShowExitPopup(true);
        setExitPopupShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitPopupShown, formData.email]);

  const handleProtectingChange = (value: string) => {
    setFormData({ ...formData, protecting: value });
    setTimeout(() => setStep(2), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase
        .from('ad_leads')
        .insert({
          protecting: formData.protecting,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          wants_call: formData.wantsCall,
          source: 'facebook_ad',
          landing_page: '/stop-scam-calls',
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Send notification email via Edge Function
      try {
        await supabase.functions.invoke('send-lead-notification', {
          body: {
            protecting: formData.protecting,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            wantsCall: formData.wantsCall,
          }
        });
      } catch (emailError) {
        // Don't fail the whole submission if email fails
        console.error('Email notification error:', emailError);
      }

      toast.success("Thank you! We'll be in touch soon.");
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExitOfferAccept = () => {
    setShowExitPopup(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO 
        title="Stop Scam Calls Before They Reach You | ScamBlocker"
        description="AI-powered scam call blocking for UK landlines. Complete landline replacement + ScamBlocker protection. Lock in 12 months at £14.99/month."
        keywords="scam calls, elderly phone protection, UK landline security, stop scam calls, digital landline"
      />

      {/* Exit Intent Popup */}
      <Dialog open={showExitPopup} onOpenChange={setShowExitPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Wait! <span className="text-violet-600">Special Offer</span>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Lock in 12 months at £14.99/month
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-xl p-6 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-3" />
              <p className="text-lg font-semibold mb-2">Lock In This Price</p>
              <p className="text-4xl font-bold mb-2">£14.99/month</p>
              <p className="text-sm opacity-90">For 12 months (Usually £24.99)</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Complete landline replacement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Unlimited UK calls included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>AI scam call protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Save £120 in first year</span>
              </div>
            </div>
            <Button
              onClick={handleExitOfferAccept}
              className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-base font-semibold"
            >
              Claim This Offer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => setShowExitPopup(false)}
              variant="ghost"
              className="w-full"
            >
              No thanks, I'll pay full price
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link to="/">
            <ScamBlockerLogo />
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-sm">
              Already Protected? Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-8 md:py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left Column - Value Prop */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-3 md:mb-4 bg-red-100 text-red-700 hover:bg-red-100 text-xs md:text-sm">
                  <Shield className="h-3 w-3 mr-1" />
                  81% of scam attempts happen by telephone
                </Badge>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
                  Stop Scam Calls<br />
                  <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Before They Reach You
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 mb-6 md:mb-8">
                  ScamBlocker screens unknown callers using AI before your phone even rings. 
                  Only genuine calls get through.
                </p>

                {/* Value Offer Box */}
                <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-xl md:rounded-2xl p-5 md:p-6 mb-6 md:mb-8 shadow-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <Sparkles className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs md:text-sm opacity-90 line-through mb-1">Usually £24.99/month</p>
                      <p className="text-2xl md:text-3xl font-bold mb-2">Now £14.99/month</p>
                      <p className="text-violet-100 text-xs md:text-sm">
                        Complete landline replacement + unlimited UK calls included
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-white/20 pt-3 md:pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      <span>AI-powered scam call blocking</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      <span>Unlimited calls to UK landlines & mobiles</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      <span>Keep your existing number</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      <span>No installation needed</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-500 hidden lg:block">
                  <strong>Complete landline replacement.</strong> Get AI protection plus unlimited calls 
                  to all UK numbers for one low monthly price. No hidden fees.
                </p>
              </div>

              {/* Right Column - Form */}
              <div className="order-1 lg:order-2 lg:sticky lg:top-20">
                <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-900 p-4 md:p-6 text-white">
                    <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Get Protected Today</h2>
                    <p className="text-slate-300 text-sm md:text-base">Join hundreds of families already protected</p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-5 md:p-8">
                    {/* Step 1 */}
                    <div className={`transition-all duration-300 ${step === 1 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                      <Label htmlFor="protecting" className="text-sm md:text-base font-semibold text-slate-900 mb-2 md:mb-3 block">
                        Who are you protecting?
                      </Label>
                      <Select
                        value={formData.protecting}
                        onValueChange={handleProtectingChange}
                        disabled={step !== 1}
                      >
                        <SelectTrigger className="w-full h-11 md:h-12 text-sm md:text-base">
                          <SelectValue placeholder="Select who you're protecting..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="myself">Myself</SelectItem>
                          <SelectItem value="parent">My parent</SelectItem>
                          <SelectItem value="parents">My parents</SelectItem>
                          <SelectItem value="grandparent">My grandparent</SelectItem>
                          <SelectItem value="grandparents">My grandparents</SelectItem>
                          <SelectItem value="spouse">My spouse/partner</SelectItem>
                          <SelectItem value="other">Someone else</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Step 2 */}
                    {step === 2 && (
                      <div className="mt-5 md:mt-6 space-y-4 md:space-y-5 animate-in fade-in duration-500">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium text-slate-700 mb-2 block">
                            Your Name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-10 md:h-11"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-10 md:h-11"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-2 block">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="07XXX XXX XXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-10 md:h-11"
                            required
                          />
                        </div>

                        <div className="flex items-start gap-3 p-3 md:p-4 bg-violet-50 rounded-lg border border-violet-200">
                          <Checkbox
                            id="wantsCall"
                            checked={formData.wantsCall}
                            onCheckedChange={(checked) => 
                              setFormData({ ...formData, wantsCall: checked as boolean })
                            }
                            className="mt-0.5 md:mt-1"
                          />
                          <div>
                            <Label 
                              htmlFor="wantsCall" 
                              className="text-sm font-medium text-slate-900 cursor-pointer"
                            >
                              I'd like to book a call
                            </Label>
                            <p className="text-xs text-slate-600 mt-1">
                              Our team can walk you through setup and answer questions
                            </p>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full h-11 md:h-12 text-sm md:text-base font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : (
                            <>
                              Get Protected Now
                              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-slate-500">
                          By submitting, you agree to our{" "}
                          <Link to="/terms" className="underline hover:text-slate-700">Terms</Link> and{" "}
                          <Link to="/privacy" className="underline hover:text-slate-700">Privacy Policy</Link>
                        </p>
                      </div>
                    )}
                  </form>
                </div>
                
                <p className="text-center text-sm text-slate-500 mt-4">
                  From £14.99/month • No contract • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                How ScamBlocker Works
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
                AI-powered protection that works silently in the background
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 md:h-7 md:w-7 text-violet-600" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2 text-slate-900">1. Unknown Call Detected</h3>
                <p className="text-slate-600 text-sm">
                  When someone not in your contacts calls, ScamBlocker intercepts it before your phone rings
                </p>
              </div>

              <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 md:h-7 md:w-7 text-violet-600" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2 text-slate-900">2. AI Screens the Caller</h3>
                <p className="text-slate-600 text-sm">
                  Our AI asks who they are and why they're calling, instantly detecting scam patterns
                </p>
              </div>

              <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2 text-slate-900">3. Only Safe Calls Ring</h3>
                <p className="text-slate-600 text-sm">
                  Genuine callers get through. Scammers are blocked automatically. You stay protected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real Stories Section - Continuing in next message due to length */}

        {/* Real Stories Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4">Real Stories</Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Why Families Choose <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">ScamBlocker</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
                These aren't marketing stories. They're real situations that happened to real people.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                {/* Mariam's Story */}
                <AccordionItem value="story-1" className="border rounded-xl px-4 md:px-6 bg-white shadow-sm">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 md:py-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="h-5 w-5 md:h-6 md:w-6 text-violet-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-base md:text-lg font-bold text-slate-900">Mariam's Story</h3>
                        <p className="text-xs md:text-sm text-slate-600 font-normal mt-1">
                          "I didn't think I was the type to fall for a scam"
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 space-y-3 md:space-y-4 pb-5 md:pb-6 pt-2 text-sm md:text-base">
                    <p>
                      Mariam has always been careful. She checks things. She doesn't rush decisions. So when the phone rang one morning, she answered without worry.
                    </p>
                    <p>
                      The caller knew her name. They knew who her broadband provider was. They said there had been suspicious activity on her account and they just needed to "secure it".
                    </p>
                    <p className="font-medium text-slate-900">
                      Nothing felt obviously wrong.
                    </p>
                    <p>
                      The caller was polite. Calm. Professional. They didn't demand money. They didn't shout. They didn't rush her — at first.
                    </p>
                    <p>
                      It was only when they asked her to confirm a few details that something didn't sit right.
                    </p>
                    <p>
                      Mariam hesitated. She put the phone down. And only afterwards did she realised how close she'd come.
                    </p>
                    <div className="bg-violet-50 border-l-4 border-violet-600 p-3 md:p-4 my-3 md:my-4">
                      <p className="italic text-slate-700 text-sm md:text-base">
                        "If I'd stayed on the call another minute, I think I would've given them everything."
                      </p>
                    </div>
                    <p>
                      That moment stayed with her. Not because she was careless — but because the call felt real. And because she realised how easily a bad day, a distraction, or a moment of trust could turn into something far worse.
                    </p>
                    <p>
                      After that, the calls didn't stop. Different numbers. Different stories. Same pressure.
                    </p>
                    <p>
                      She started to dread the phone ringing.
                    </p>
                    <p className="font-medium text-slate-900">
                      That's when Mariam set up ScamBlocker.
                    </p>
                    <p>
                      Now, unknown callers are screened before her phone rings. Scam and nuisance calls never reach her. Genuine callers still do.
                    </p>
                    <div className="bg-green-50 border-l-4 border-green-600 p-3 md:p-4 my-3 md:my-4">
                      <p className="italic text-slate-700 text-sm md:text-base">
                        "The biggest difference isn't just fewer calls. It's peace of mind."
                      </p>
                    </div>
                    <div className="bg-slate-100 p-3 md:p-4 rounded-lg mt-4 md:mt-6">
                      <p className="font-semibold text-slate-900 mb-2 text-sm md:text-base">What Mariam's story shows:</p>
                      <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                        <li>• Scams don't rely on panic — they rely on credibility</li>
                        <li>• You don't have to "fall for it" to be at risk</li>
                        <li>• One convincing call can be enough</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* David's Story */}
                <AccordionItem value="story-2" className="border rounded-xl px-4 md:px-6 bg-white shadow-sm">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 md:py-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-base md:text-lg font-bold text-slate-900">David's Story</h3>
                        <p className="text-xs md:text-sm text-slate-600 font-normal mt-1">
                          "I never gave them money — I just answered a question"
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 space-y-3 md:space-y-4 pb-5 md:pb-6 pt-2 text-sm md:text-base">
                    <p>
                      David didn't think he'd been scammed.
                    </p>
                    <p>
                      The caller said they were from British Gas. They weren't asking for payment. They weren't asking for bank details.
                    </p>
                    <p>
                      They just wanted to "verify" his account.
                    </p>
                    <p>
                      To do that, they asked him to confirm his email address.
                    </p>
                    <p className="font-medium text-slate-900">
                      It felt harmless. After all, an email address isn't a secret — is it?
                    </p>
                    <p>
                      David gave it to them.
                    </p>
                    <p>
                      Nothing happened that day. Or the next.
                    </p>
                    <p>
                      But over the following weeks, David started receiving emails that looked legitimate. Billing updates. Security alerts. Account notices.
                    </p>
                    <p>
                      One of those emails contained a link.
                    </p>
                    <p>
                      That link gave scammers access to another part of his digital life — and eventually cost David a few thousand pounds.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-600 p-3 md:p-4 my-3 md:my-4">
                      <p className="italic text-slate-700 text-sm md:text-base">
                        "I didn't give them money. I didn't give them a password. I just answered a question."
                      </p>
                    </div>
                    <p>
                      Looking back, the pattern became clear.
                    </p>
                    <p>
                      The call wasn't about gas. It was about testing trust. Validating small pieces of information. Confirming whether David was a real person. Checking whether future attacks were worth attempting.
                    </p>
                    <p className="font-medium text-slate-900">
                      The phone call was the beginning. The email phishing was the follow-up.
                    </p>
                    <div className="bg-slate-100 p-3 md:p-4 rounded-lg mt-4 md:mt-6">
                      <p className="font-semibold text-slate-900 mb-2 text-sm md:text-base">What David's story shows:</p>
                      <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                        <li>• Any information you give away can be valuable</li>
                        <li>• Scams often work across channels (phone → email → links)</li>
                        <li>• The goal isn't always immediate theft — it's positioning</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Helen's Story */}
                <AccordionItem value="story-3" className="border rounded-xl px-4 md:px-6 bg-white shadow-sm">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 md:py-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-base md:text-lg font-bold text-slate-900">Helen's Story</h3>
                        <p className="text-xs md:text-sm text-slate-600 font-normal mt-1">
                          "We thought the broadband was just expensive"
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 space-y-3 md:space-y-4 pb-5 md:pb-6 pt-2 text-sm md:text-base">
                    <p>
                      Helen helped her dad with most things. Bills. Appointments. Sorting things when they got confusing.
                    </p>
                    <p>
                      So when he mentioned his broadband bill had gone up, it didn't immediately raise alarm bells.
                    </p>
                    <p>
                      He said BT had called. There was an overdue balance. They'd helped him "keep the service running".
                    </p>
                    <p>
                      It sounded plausible.
                    </p>
                    <p>
                      The payments weren't huge at first. A couple of hundred pounds here. A slightly higher bill there. Nothing dramatic enough to trigger panic.
                    </p>
                    <p className="font-medium text-slate-900">
                      What Helen didn't realise was that the phone call hadn't been about broadband at all. It was about access.
                    </p>
                    <p>
                      The caller had captured just enough information to set things in motion. They didn't rush. They didn't scare him. They simply made it feel routine.
                    </p>
                    <p>
                      Over time, the calls continued. New "issues". New "adjustments". New payments.
                    </p>
                    <p>
                      Sometimes they asked him to make a payment over the phone. Sometimes they sent what looked like official-looking bills.
                    </p>
                    <p>
                      By the time Helen stepped in properly and started asking questions, the total was close to £10,000.
                    </p>
                    <div className="bg-red-50 border-l-4 border-red-600 p-3 md:p-4 my-3 md:my-4">
                      <p className="italic text-slate-700 text-sm md:text-base">
                        "There wasn't one big moment. It was lots of small ones we missed."
                      </p>
                    </div>
                    <p>
                      The hardest part wasn't just the money.
                    </p>
                    <p>
                      It was realising that the calls had been happening quietly, in the background, for months. That the pressure had been constant, but subtle. That her dad hadn't wanted to worry anyone.
                    </p>
                    <p>
                      This wasn't a romance scam. It wasn't a one-off panic call.
                    </p>
                    <p className="font-medium text-slate-900">
                      It was slow, deliberate, and calculated. Exactly the kind of scam designed to go unnoticed.
                    </p>
                    <p>
                      When Helen later learned about ScamBlocker, one thing stood out.
                    </p>
                    <p>
                      If it had been in place:
                    </p>
                    <ul className="list-disc pl-5 md:pl-6 space-y-1 text-sm">
                      <li>The initial calls would have been screened</li>
                      <li>Payment requests over the phone could have been blocked with Payment Blocker™</li>
                      <li>Contract changes could have been prevented</li>
                      <li>The pattern would have been stopped early</li>
                    </ul>
                    <div className="bg-green-50 border-l-4 border-green-600 p-3 md:p-4 my-3 md:my-4">
                      <p className="italic text-slate-700 text-sm md:text-base">
                        "This didn't happen because we weren't careful. It happened because we trusted the phone."
                      </p>
                    </div>
                    <div className="bg-slate-100 p-3 md:p-4 rounded-lg mt-4 md:mt-6">
                      <p className="font-semibold text-slate-900 mb-2 text-sm md:text-base">What Helen's story shows:</p>
                      <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                        <li>• Some scams don't happen all at once</li>
                        <li>• Repeated "legitimate" calls are a red flag</li>
                        <li>• Small payments can add up to life-changing losses</li>
                        <li>• Family members often don't see it until it's too late</li>
                      </ul>
                    </div>
                    <div className="bg-violet-50 p-3 md:p-4 rounded-lg mt-4 md:mt-6 border border-violet-200">
                      <p className="font-semibold text-slate-900 mb-2 text-sm md:text-base">How ScamBlocker helps families:</p>
                      <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                        <li>• Screens unknown callers before the phone rings</li>
                        <li>• Payment Blocker™ prevents payments over the phone</li>
                        <li>• Blocks contract sign-ups via unsolicited calls</li>
                        <li>• Gives families peace of mind when supporting someone else</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* CTA after stories */}
              <div className="text-center mt-8 md:mt-12 p-6 md:p-8 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-200">
                <p className="text-base md:text-lg text-slate-700 mb-4">
                  Especially if you're helping manage someone else's phone
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 h-11 md:h-12 px-6 md:px-8"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Find Out How ScamBlocker Works
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Frequently Asked <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Questions</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                {[
                  {
                    q: "How does it work with my existing phone?",
                    a: "We send you a small adapter that plugs into your router. Your existing phone plugs into the adapter. Everything works exactly as before - just with AI protection. Setup takes about 5 minutes."
                  },
                  {
                    q: "Do I need to change my number?",
                    a: "No! We port your existing number to our system free of charge. Your family, friends, and contacts won't notice any difference. They call the same number they always have."
                  },
                  {
                    q: "What if a real caller gets blocked?",
                    a: "Very rare, but if it happens, the caller is politely asked to identify themselves. If they're genuine, they'll be put through. You can also whitelist any number instantly from the app."
                  },
                  {
                    q: "Are UK calls really unlimited?",
                    a: "Yes - unlimited calls to all UK landlines and major mobile networks are included in your £14.99/month plan. No hidden fees, no caps, no surprises."
                  },
                  {
                    q: "What about international calls?",
                    a: "International calls are blocked by default to protect you from scams. You can add calling bundles from £5/month if you need to call abroad."
                  },
                  {
                    q: "Is there a contract?",
                    a: "12-month minimum term with a £29 setup fee. All plans include a 14-day cooling-off period. Cancel anytime after the minimum term with no penalties."
                  },
                  {
                    q: "Can I install it myself?",
                    a: "Absolutely. The adapter is plug-and-play - just connect to your router and phone. Takes about 5 minutes. No engineer visit needed. We provide simple instructions and phone support if you need it."
                  },
                  {
                    q: "What happens to my current landline provider?",
                    a: "You can cancel your existing landline service once ScamBlocker is active. This is a complete replacement that costs less and includes scam protection."
                  },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4 md:px-5 bg-white">
                    <AccordionTrigger className="text-left font-medium hover:no-underline text-slate-900 text-sm md:text-base py-4 md:py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-sm md:text-base pb-4 md:pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Ready to Stop Scam Calls?
            </h2>
            <p className="text-lg md:text-xl mb-2 text-violet-100">
              Complete landline replacement for £14.99/month
            </p>
            <p className="text-sm mb-6 md:mb-8 text-violet-200">
              Usually £24.99 • Save £10/month • Unlimited UK calls included
            </p>
            <Button 
              size="lg"
              variant="secondary"
              className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 md:py-8 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-xs md:text-sm">© 2026 ScamBlocker™. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
              <Link to="/terms" className="hover:text-white transition">Terms</Link>
              <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
