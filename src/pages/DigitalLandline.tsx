import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, Shield, Zap, CheckCircle2, ArrowRight, Clock,
  PhoneCall, PhoneOff, Users, Heart, Brain, Lock
} from "lucide-react";

export default function DigitalLandline() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Digital Landline UK | Virtual Landline with AI Scam Protection"
        description="Switch to a digital landline with AI-powered scam protection. Keep your UK number or choose new area code. £14.99/month. 48-hour setup. No installation needed."
        keywords="digital landline uk, virtual landline, digital phone line uk, voip landline, digital telephone line, landline alternative, internet phone line"
        url="https://scamblocker.co.uk/digital-landline"
      />
      <StructuredData type="product" />

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-[#1e3a8a]">Scam</span>
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">Blocker</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/rates">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-violet-100 text-violet-700">Modern Phone Service</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              The Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Digital Landline</span> for UK Homes
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Keep your trusted UK landline number with built-in AI scam protection. No installation, no engineer visit, ready in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-lg px-8">
                  Get Your Digital Landline
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/rates">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-500">
              ✓ Port your existing number FREE  ✓ Choose UK area code  ✓ AI scam protection included
            </p>
          </div>
        </div>
      </section>

      {/* What is a Digital Landline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              What is a Digital Landline?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-600 mb-6">
                A digital landline is a modern phone service that works over the internet instead of traditional copper wires. It looks, feels, and works exactly like your old landline, but with better features and no physical phone line needed.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                With ScamBlocker's digital landline, every call is protected by AI that screens for scammers before your phone even rings. Perfect for elderly parents, vulnerable adults, or anyone wanting peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* Continuing in next chunk... */}
      {/* Key Features */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Why Choose a Digital Landline?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-violet-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">AI Scam Protection</h3>
                  <p className="text-slate-600">
                    Every call is screened by AI. Scammers are blocked automatically. Legitimate calls come straight through.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <PhoneCall className="h-12 w-12 text-violet-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Keep Your Number</h3>
                  <p className="text-slate-600">
                    Port your existing UK landline number for FREE. Or choose a new local area code from anywhere in the UK.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Zap className="h-12 w-12 text-violet-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">48-Hour Setup</h3>
                  <p className="text-slate-600">
                    No engineer visit, no installation. Just plug in your adapter and you're protected. Works with any phone.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 text-violet-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Contract</h3>
                  <p className="text-slate-600">
                    Cancel anytime. 14-day money-back guarantee. Only £14.99/month with no hidden fees or long-term commitments.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-violet-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Perfect for Elderly</h3>
                  <p className="text-slate-600">
                    Protects vulnerable adults automatically. No training needed. Family can monitor protection from anywhere.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Brain className="h-12 w-12 text-violet-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Smart Call Routing</h3>
                  <p className="text-slate-600">
                    Family and friends whitelist means loved ones always get through. Unknown callers are screened by AI.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Switch to a Digital Landline?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of UK families protected by ScamBlocker's AI-powered digital landline service.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm opacity-75">
            £14.99/month • No contract • 14-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xl font-bold">
                <span className="text-white">Scam</span>
                <span className="text-violet-400">Blocker</span>
              </span>
              <p className="text-sm mt-2">© 2026 ScamBlocker. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/complaints" className="hover:text-white">Complaints</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
