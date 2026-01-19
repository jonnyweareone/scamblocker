import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone, CheckCircle2, X } from "lucide-react";

export default function WhatIsDigitalLandline() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="What is a Digital Landline? Complete UK Guide 2026 | ScamBlocker"
        description="Everything you need to know about digital landlines in the UK. How they work, costs, setup, and why ScamBlocker's digital landline includes AI scam protection."
        keywords="digital landline uk, virtual landline uk, what is digital landline, digital phone line uk, voip landline"
        url="https://scamblocker.co.uk/blog/what-is-digital-landline"
      />
      <StructuredData type="article" />

      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-[#1e3a8a]">Scam</span>
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">Blocker</span>
            </span>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600">Get Protected</Button>
          </Link>
        </div>
      </header>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <div className="flex gap-3">
              <Phone className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Quick Answer</h3>
                <p className="text-blue-800">
                  A digital landline works over your broadband instead of copper wires. Same phone, same number, same everything - just better protection and more features. By 2027, ALL UK landlines will be digital.
                </p>
              </div>
            </div>
          </div>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Digital Landline UK: Everything You Need to Know (2026 Complete Guide)
            </h1>
            <p className="text-xl text-slate-600">
              The future of UK landlines is digital. Here's what's changing, how it works, and why ScamBlocker's digital landline is different.
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-6">
            
            <h2 className="text-2xl font-bold mt-8">What is a Digital Landline?</h2>
            <p className="text-slate-700">
              A <strong>digital landline</strong> (also called virtual landline, VoIP landline, or internet phone line) is a phone service that works over your broadband connection instead of traditional copper telephone wires.
            </p>
            <p className="text-slate-700 font-semibold">
              Simple version: Your phone calls travel through the internet instead of old phone cables.
            </p>
            <p className="text-slate-700">
              <strong>Important:</strong> It looks, sounds, and works exactly like your old landline. Same phone. Same number. Same everything. Just better protection and more features.
            </p>

            <h2 className="text-2xl font-bold mt-8">Why Digital Landlines Are Replacing Traditional Ones</h2>
            <p className="text-slate-700 font-semibold">
              By 2027, ALL UK landlines will be digital. This isn't optional. BT is switching off the old copper network completely.
            </p>
            <p className="text-slate-700">Why?</p>
            <ul className="space-y-2">
              <li>Copper wires are 100+ years old</li>
              <li>Expensive to maintain</li>
              <li>Can't support modern services</li>
              <li>Everyone has broadband anyway</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">Digital Landline vs Traditional Landline</h2>
            
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border p-3 text-left">Feature</th>
                    <th className="border p-3 text-left">Traditional</th>
                    <th className="border p-3 text-left">Digital (ScamBlocker)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3">Scam protection</td>
                    <td className="border p-3"><X className="h-5 w-5 text-red-500 inline" /> None</td>
                    <td className="border p-3"><CheckCircle2 className="h-5 w-5 text-green-500 inline" /> AI screening</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border p-3">Setup time</td>
                    <td className="border p-3">2-4 weeks</td>
                    <td className="border p-3">48 hours</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Engineer visit</td>
                    <td className="border p-3">Required</td>
                    <td className="border p-3">Not needed</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border p-3">Monthly cost</td>
                    <td className="border p-3">£20-30</td>
                    <td className="border p-3">£14.99</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Contract</td>
                    <td className="border p-3">12-24 months</td>
                    <td className="border p-3">No contract</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border p-3">Port your number</td>
                    <td className="border p-3">Limited</td>
                    <td className="border p-3">FREE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-8">How a Digital Landline Works</h2>
            
            <div className="bg-slate-50 p-6 rounded-lg my-6">
              <p className="font-semibold mb-2">Traditional setup:</p>
              <p className="text-slate-600">Phone → Wall socket → Copper wires → Telephone exchange</p>
              
              <p className="font-semibold mt-4 mb-2">Digital setup:</p>
              <p className="text-slate-600">Phone → Adapter → Router → Broadband → Internet → Your call</p>
            </div>

            <p className="text-slate-700">What you need:</p>
            <ul className="space-y-2">
              <li><CheckCircle2 className="h-5 w-5 text-green-500 inline mr-2" />Broadband connection (any speed works)</li>
              <li><CheckCircle2 className="h-5 w-5 text-green-500 inline mr-2" />Router with spare ethernet port</li>
              <li><CheckCircle2 className="h-5 w-5 text-green-500 inline mr-2" />Your existing phone</li>
            </ul>

            <p className="text-slate-700">What you DON'T need:</p>
            <ul className="space-y-2">
              <li><X className="h-5 w-5 text-red-500 inline mr-2" />Engineer visit</li>
              <li><X className="h-5 w-5 text-red-500 inline mr-2" />New phone</li>
              <li><X className="h-5 w-5 text-red-500 inline mr-2" />Technical knowledge</li>
              <li><X className="h-5 w-5 text-red-500 inline mr-2" />Phone socket in the wall</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">Can I Keep My Existing Number?</h2>
            <p className="text-slate-700 font-semibold text-xl">
              Yes! This is called "number porting" and it's FREE.
            </p>
            <p className="text-slate-700">The process:</p>
            <ol className="space-y-2">
              <li>Sign up for digital landline</li>
              <li>Request to port your number</li>
              <li>We handle everything with your old provider</li>
              <li>Takes 5-10 working days</li>
              <li>Your service continues uninterrupted</li>
              <li>One day it just switches over automatically</li>
            </ol>
            <p className="text-slate-700">OR: Choose a new number from any UK area code</p>

            <h2 className="text-2xl font-bold mt-8">The ScamBlocker Digital Landline Difference</h2>
            <p className="text-slate-700">
              Most digital landlines are just... digital landlines. Same service, different technology.
            </p>
            <p className="text-slate-700 font-semibold">
              ScamBlocker is different because of AI scam protection:
            </p>
            
            <div className="bg-green-50 p-6 rounded-lg my-6">
              <p className="font-semibold mb-3">Every call is screened by AI before your phone rings:</p>
              <ol className="space-y-2">
                <li><strong>1.</strong> Unknown number calls</li>
                <li><strong>2.</strong> AI answers: "This is ScamBlocker. Who are you calling for?"</li>
                <li><strong>3.</strong> Legitimate caller: States their name</li>
                <li><strong>4.</strong> Your phone rings: "There's a call from [name]. Accept or decline?"</li>
                <li><strong>5.</strong> Scammers hang up (can't pass screening)</li>
              </ol>
              
              <p className="font-semibold mt-4">Result:</p>
              <ul className="space-y-1">
                <li>✓ 89% of scam calls blocked automatically</li>
                <li>✓ You never experience the panic of threats</li>
                <li>✓ Family always gets through (whitelist)</li>
                <li>✓ Perfect for protecting elderly parents</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8">How Much Does a Digital Landline Cost?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3">Traditional Providers</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Setup fee: £50-150</li>
                    <li>Monthly: £20-30</li>
                    <li>Contract: 12-24 months</li>
                    <li>Scam protection: Extra (if available)</li>
                  </ul>
                  <p className="mt-4 font-semibold">Total over 2 years: £530-870</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-violet-500">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 text-violet-600">ScamBlocker</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Setup fee: £0</li>
                    <li>Monthly: £14.99</li>
                    <li>Contract: None (cancel anytime)</li>
                    <li>Scam protection: Included</li>
                  </ul>
                  <p className="mt-4 font-semibold text-violet-600">Total over 2 years: £360</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8">Digital Landline for Older Parents</h2>
            <p className="text-slate-700">Why it's perfect:</p>
            <ul className="space-y-2">
              <li><CheckCircle2 className="h-5 w-5 text-green-500 inline mr-2" />Phone works exactly the same (no learning curve)</li>
              <li><CheckCircle2 className="h-5 w-5 text-green-500 inline mr-2" />Scam protection automatic (they don't need to do anything)</li>
              <li><CheckCircle2 className="h-5 w-5 text-green-500 inline mr-2" />You can monitor remotely (peace of mind)</li>
              <li><CheckCircle2 className="h-5 w-5 text-green-500 inline mr-2" />Family always gets through (no missed calls)</li>
              <li><CheckCircle2 className="h-5 w-5 text-green-500 inline mr-2" />Set up once, protected forever</li>
            </ul>

            <div className="bg-slate-100 p-6 rounded-lg my-6">
              <p className="italic text-slate-700 mb-3">
                "My mum is 81. When we switched to ScamBlocker's digital landline, nothing changed from her perspective. Same phone, same number, same ringtone. But in the first month, 11 scam calls were blocked that she never even heard."
              </p>
              <p className="text-sm text-slate-500">— David, son of 81-year-old mother</p>
            </div>

            <h2 className="text-2xl font-bold mt-8">Common Questions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Q: What internet speed do I need?</h3>
                <p className="text-slate-700">A: Any broadband works. Voice calls use very little bandwidth. Even slow 10Mbps connections are fine.</p>
              </div>

              <div>
                <h3 className="font-bold">Q: Will my phone work?</h3>
                <p className="text-slate-700">A: Yes. Any phone works - corded, cordless, even old rotary phones.</p>
              </div>

              <div>
                <h3 className="font-bold">Q: What happens during power cuts?</h3>
                <p className="text-slate-700">A: Digital landlines don't work during power cuts (no internet = no calls). Keep a mobile charged as backup.</p>
              </div>

              <div>
                <h3 className="font-bold">Q: Is call quality good?</h3>
                <p className="text-slate-700">A: Excellent. Often better than traditional landlines (HD voice).</p>
              </div>
            </div>

          </div>

          <div className="mt-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Switch to Digital Landline with Scam Protection
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Port your number FREE. Setup in 48 hours. AI scam protection included. £14.99/month.
            </p>
            <Link to="/digital-landline">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

        </div>
      </article>

      <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
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
              <Link to="/blog" className="hover:text-white">Blog</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
