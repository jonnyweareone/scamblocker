import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, Shield } from "lucide-react";

export default function BlogHMRCScams() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="HMRC Scam Calls: How to Spot Fake Tax Calls in 2026 | ScamBlocker"
        description="Get a call from 'HMRC' threatening arrest? It's a scam. Learn the warning signs of fake HMRC calls, what they say, and how to protect yourself from tax scammers."
        keywords="hmrc scam calls, fake hmrc calls, tax scam uk, hmrc fraud calls"
        url="https://scamblocker.co.uk/blog/hmrc-scam-calls"
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
            <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Get Protected
            </Button>
          </Link>
        </div>
      </header>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "HMRC Scam Calls", href: "/blog/hmrc-scam-calls" }
            ]}
          />
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">Got a call from "HMRC"?</h3>
                <p className="text-red-800">
                  If someone claiming to be from HMRC threatened you with arrest, demanded immediate payment, or asked for your bank details over the phone - it was 100% a scam. HMRC NEVER calls you out of the blue.
                </p>
              </div>
            </div>
          </div>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              HMRC Scam Calls: How to Spot and Stop Fake Tax Threats
            </h1>
            <p className="text-xl text-slate-600">
              Scammers pretending to be from HMRC have stolen over £43 million from UK victims. Here's exactly what they say, how to spot them, and how to stop them reaching you.
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-6">
            
            <h2 className="text-2xl font-bold mt-8">What is an HMRC Scam Call?</h2>
            <p className="text-slate-700">
              An HMRC scam call is when a fraudster phones you pretending to be from His Majesty's Revenue and Customs (HMRC). They use threatening language, fake warrant numbers, and urgent deadlines to scare you into paying money or revealing your bank details.
            </p>

            <h2 className="text-2xl font-bold mt-8">The 5 Warning Signs of a Fake HMRC Call</h2>
            
            <div className="bg-slate-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                Red Flags - If You Hear These, Hang Up
              </h3>
              <ul className="space-y-3 list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">1.</span>
                  <span><strong>Threatening arrest or legal action</strong> - HMRC will never threaten immediate arrest over the phone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">2.</span>
                  <span><strong>Demanding immediate payment</strong> - Real tax issues take weeks or months to resolve</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">3.</span>
                  <span><strong>Asking for payment by gift cards or bank transfer</strong> - HMRC only accepts payment through their official portal</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8">What to Do If You Get an HMRC Scam Call</h2>
            
            <div className="bg-green-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-700" />
                Your Action Plan
              </h3>
              <ol className="space-y-3 list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">1.</span>
                  <span><strong>Hang up immediately</strong> - Don't engage, don't press any buttons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">2.</span>
                  <span><strong>Report it</strong> - Forward details to HMRC at phishing@hmrc.gov.uk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">3.</span>
                  <span><strong>Protect yourself</strong> - Consider AI call screening to block future scam calls</span>
                </li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold mt-8">How AI Call Screening Stops HMRC Scams</h2>
            <p className="text-slate-700">
              AI call screening blocks these calls before your phone rings. Every unknown caller is asked to identify themselves. Scammers hang up. Legitimate callers get through. You stay protected 24/7.
            </p>

          </div>

          <div className="mt-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stop HMRC Scam Calls Automatically
            </h3>
            <p className="text-lg mb-6 opacity-90">
              AI screens every call. Scammers blocked. Family calls come through. From £14.99/month.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Protected Today
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
