import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Shield, Smartphone, CheckCircle2, ArrowRight, Phone, 
  PhoneIncoming, UserCheck, Zap, MessageSquare
} from "lucide-react";

export default function ScamBlockerMobile() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>ScamBlocker Mobile - AI Scam Protection for Your Smartphone | UK</title>
        <meta name="description" content="Add AI-powered scam protection to your mobile without changing provider. Get a new protected number, keep your real number private. £7.99/month, no setup fee, cancel anytime." />
        <meta name="keywords" content="mobile scam blocker, smartphone scam protection, eSIM scam blocker, AI call screening mobile, phone scam protection UK" />
        <link rel="canonical" href="https://scamblocker.co.uk/mobile" />
        <meta property="og:title" content="ScamBlocker Mobile - Protect Your Smartphone from Scams" />
        <meta property="og:description" content="AI-powered scam protection for mobiles. Keep your provider, add protection. £7.99/month." />
      </Helmet>

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">
              <span className="text-[#1e3a8a]">Scam</span>
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">Blocker</span>
            </span>
          </Link>
          <Link to="/">
            <Button variant="ghost">← Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-cyan-600 to-blue-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <Smartphone className="h-4 w-4" />
              ScamBlocker Mobile
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Protection That Works <span className="text-cyan-200">With</span> Your Phone
            </h1>
            <p className="text-xl text-cyan-100 mb-8">
              Keep your provider. Keep your number. Just add protection.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Three simple steps. No changes to your current setup.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-2 border-slate-200">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-600">1</span>
                </div>
                <Phone className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">You Get a ScamBlocker Number</h3>
                <p className="text-slate-600 text-sm">A new number protected by our AI. This becomes your "public" number.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-slate-200">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-600">2</span>
                </div>
                <MessageSquare className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Share This Number Instead</h3>
                <p className="text-slate-600 text-sm">Give it to companies, services, websites — anyone who isn't close family.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-slate-200">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-600">3</span>
                </div>
                <Shield className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">We Screen Every Call</h3>
                <p className="text-slate-600 text-sm">Scams blocked. Safe calls forwarded to your phone. You stay in control.</p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-2xl mx-auto mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-center text-slate-700">
              <strong>You keep your provider.</strong> You keep your plan. You keep your real number for family and close friends. 
              ScamBlocker Mobile works <em>alongside</em> your existing setup — not instead of it.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why Use a Second Number?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "Scammers Can't Reach Your Real Number", desc: "Your private number stays private. Only people you trust have it." },
                { icon: PhoneIncoming, title: "Filter Out the Noise", desc: "Marketing calls, cold callers, and scammers all go to your protected number — and get screened." },
                { icon: UserCheck, title: "Know Who's Really Calling", desc: "Our AI verifies callers before they reach you. No more guessing." },
                { icon: Zap, title: "Instant Setup", desc: "Download the app, activate eSIM, done. Takes about 5 minutes." },
              ].map((benefit) => (
                <div key={benefit.title} className="flex gap-4 p-4 bg-white rounded-lg border border-slate-200">
                  <div className="h-10 w-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-slate-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-cyan-300 shadow-lg">
              <CardContent className="pt-8 pb-6 text-center">
                <Smartphone className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">ScamBlocker Mobile</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">£7.99</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  {[
                    "New protected ScamBlocker number",
                    "All 5 AI protection layers",
                    "Payment Blocker™ included",
                    "Works with iPhone XS+ or Android 2019+",
                    "30-day rolling contract",
                    "No setup fee",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/join?type=mobile" className="block">
                  <Button className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                    Get Mobile Protection <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-slate-500 mt-4">14-day cooling-off period • Cancel anytime after</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Mobile FAQs</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "Do I need to change my mobile provider?",
                  a: "No. ScamBlocker Mobile works alongside your existing provider using eSIM technology. You keep your current plan, your current number, everything."
                },
                {
                  q: "What's an eSIM?",
                  a: "An eSIM is a digital SIM built into modern phones. It lets you have two numbers on one phone without swapping physical SIM cards. Most phones made after 2019 support eSIM."
                },
                {
                  q: "Which phones are compatible?",
                  a: "iPhone XS and newer, or Android phones from 2019 onwards with eSIM support. Most Samsung Galaxy S/A series, Google Pixel, and other major brands work fine."
                },
                {
                  q: "Do I get a new number?",
                  a: "Yes. You get a new UK mobile number protected by our AI. This is the number you give to companies, websites, and services. Your real number stays private for family and close friends."
                },
                {
                  q: "What happens when someone calls my ScamBlocker number?",
                  a: "Our AI screens the call in real-time. If it's safe, it's forwarded to your phone. If it's a scam, it's blocked. You can see all blocked calls in the app."
                },
                {
                  q: "Can I make outbound calls from my ScamBlocker number?",
                  a: "Yes. You can choose which number to call from. Use your ScamBlocker number when calling companies back so they have your protected number on file."
                },
                {
                  q: "Is there a contract?",
                  a: "30-day rolling contract. Cancel anytime with no fees. 14-day cooling-off period if you change your mind."
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Mobile?</h2>
          <p className="text-lg text-cyan-100 mb-8">Setup takes about 5 minutes. Protection starts immediately.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join?type=mobile">
              <Button size="lg" className="bg-white text-cyan-700 hover:bg-slate-100 font-semibold">
                Get Mobile Protection <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Or Protect Your Landline
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 ScamBlocker. Part of Guardian Network Solutions Ltd.</p>
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/rates" className="hover:text-white">Rates</Link>
              <Link to="/complaints" className="hover:text-white">Complaints</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
