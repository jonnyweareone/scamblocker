import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, Shield } from "lucide-react";

export default function BankScamCalls() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Bank Scam Calls: The £800 Payment That Wasn't | UK Protection Guide"
        description="How fake bank fraud calls work, what scammers actually say, and why your parents are perfect targets. Real protection strategies that work."
        keywords="bank scam calls, fake bank fraud calls, bank impersonation scam, safe account scam"
        url="https://scamblocker.co.uk/blog/bank-scam-calls"
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
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">If Your Bank Calls...</h3>
                <p className="text-red-800">
                  Your bank will NEVER ask for your PIN, full card number, or online banking password over the phone. They will NEVER tell you to move money to a "safe account". If someone does this - it's a scam.
                </p>
              </div>
            </div>
          </div>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Bank Scam Calls: "Your Card Has Been Used For £800"
            </h1>
            <p className="text-xl text-slate-600">
              The most convincing scam in the UK - and why your parents are perfect targets. Here's what's really happening.
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-6">
            
            <h2 className="text-2xl font-bold mt-8">The Call That Sounds 100% Real</h2>
            <div className="bg-slate-100 p-6 rounded-lg my-6 border-l-4 border-slate-400">
              <p className="italic text-slate-700 mb-3">
                "Good morning, this is the fraud prevention team from Lloyds Bank. We've detected suspicious activity on your account. A payment of £847.50 to Amazon has just been attempted. Press 1 to speak to a fraud officer immediately."
              </p>
            </div>

            <p className="text-slate-700">
              Your mum presses 1.
            </p>

            <div className="bg-slate-100 p-6 rounded-lg my-6 border-l-4 border-slate-400">
              <p className="italic text-slate-700">
                "Thank you for holding, Mrs. Smith. I'm calling from the fraud team. We've blocked a suspicious transaction, but we need to secure your account immediately. Can you confirm the last four digits of your card?"
              </p>
            </div>

            <p className="text-slate-700">
              It sounds legitimate. Official. Helpful.
            </p>

            <p className="text-slate-700 font-semibold text-xl">
              It's not.
            </p>

            <p className="text-slate-700">
              This is the fastest-growing scam in Britain. And it works because everything about it sounds real.
            </p>

            <h2 className="text-2xl font-bold mt-8">Why Bank Scam Calls Are So Effective</h2>

            <h3 className="text-xl font-bold mt-6">1. They Have Your Details Already</h3>
            <ul className="space-y-2">
              <li>They know your name</li>
              <li>They know your bank</li>
              <li>They know your phone number</li>
              <li>Sometimes they know your address</li>
            </ul>
            <p className="text-slate-700 font-semibold">
              Why it works: When they say your name and bank, your brain thinks "They must be real."
            </p>

            <h3 className="text-xl font-bold mt-6">2. They Create Instant Panic</h3>
            <p className="text-slate-700">
              "Your account has been compromised." "Someone is trying to withdraw £2,000." "We need to act NOW to protect your money."
            </p>
            <p className="text-slate-700 font-semibold">
              Panic short-circuits rational thinking.
            </p>

            <h3 className="text-xl font-bold mt-6">3. They Sound Exactly Like Your Bank</h3>
            <ul className="space-y-2">
              <li>Professional tone</li>
              <li>Banking jargon</li>
              <li>Security questions</li>
              <li>"Fraud prevention team"</li>
              <li>On-hold music (sometimes)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">What Your Real Bank Will NEVER Do</h2>
            
            <div className="bg-red-50 p-6 rounded-lg my-6">
              <h3 className="font-bold text-red-900 mb-3">Your bank will NEVER:</h3>
              <ul className="space-y-2 text-red-800">
                <li>❌ Call and ask for your PIN</li>
                <li>❌ Ask for your full card number</li>
                <li>❌ Ask for online banking password</li>
                <li>❌ Tell you to move money to a "safe account"</li>
                <li>❌ Ask you to buy gift cards or Bitcoin</li>
                <li>❌ Tell you not to tell anyone</li>
                <li>❌ Threaten to close your account</li>
                <li>❌ Create urgency with "act now" pressure</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg my-6">
              <h3 className="font-bold text-green-900 mb-3">Your bank WILL:</h3>
              <ul className="space-y-2 text-green-800">
                <li>✓ Send letters and emails first</li>
                <li>✓ Let you call them back on the number on your card</li>
                <li>✓ Allow time to think</li>
                <li>✓ Encourage you to check with family</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8">The "Safe Account" Lie</h2>
            <p className="text-slate-700">
              This is the most dangerous variant:
            </p>
            <div className="bg-amber-50 p-6 rounded-lg my-6 border-l-4 border-amber-500">
              <p className="text-amber-900 font-semibold mb-2">Scammer says:</p>
              <p className="italic text-amber-800">
                "Your account has been compromised. We need you to move your money to a safe account we've set up for you while we investigate."
              </p>
            </div>

            <p className="text-slate-700">Why it works:</p>
            <ul className="space-y-2">
              <li>Sounds like good security practice</li>
              <li>You're "protecting" your money</li>
              <li>Authorized by your "bank"</li>
              <li>Time pressure ("act now")</li>
            </ul>

            <p className="text-slate-700 font-semibold text-xl mt-4">
              Reality: You're transferring money directly to the scammers. Once done, it's gone forever.
            </p>

            <p className="text-slate-700 font-semibold">
              Banks NEVER ask you to move money to protect it.
            </p>

            <h2 className="text-2xl font-bold mt-8">Real Story: How £23,000 Disappeared</h2>
            
            <div className="bg-slate-100 p-6 rounded-lg my-6">
              <p className="italic text-slate-700 mb-3">
                "Dad got a call from his bank (he thought). They said someone was trying to withdraw money from his account. They sounded professional. Knew his name, his bank, his branch. They said he needed to move his money to a 'safe account' while they investigated. He was trying to protect his money. Instead, he sent it straight to the scammers. £23,000 gone in 45 minutes."
              </p>
              <p className="text-sm text-slate-500">— Emma, daughter of bank scam victim</p>
            </div>

            <h2 className="text-2xl font-bold mt-8">What to Do If You Get a Bank Scam Call</h2>
            
            <div className="bg-green-50 p-6 rounded-lg my-6">
              <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Immediate Actions:
              </h3>
              <ol className="space-y-3 text-green-800">
                <li><strong>1. Hang up immediately</strong> - Don't engage, don't press buttons</li>
                <li><strong>2. Wait 10 minutes</strong> - Scammers sometimes keep line open</li>
                <li><strong>3. Call bank on card number</strong> - Use the number printed on your bank card</li>
                <li><strong>4. Don't call numbers given by caller</strong> - These go to scammers</li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold mt-8">The One Thing That Actually Works</h2>
            <p className="text-slate-700">
              AI call screening stops these calls before your phone rings. Every unknown caller is asked to identify themselves. Scammers hang up. Legitimate callers get through. You stay protected 24/7.
            </p>

            <p className="text-slate-700 font-semibold">
              Why it's different: No human decision needed (AI makes it). No panic response (your mum never hears the threat). No shame (nothing to hide if nothing happened).
            </p>

          </div>

          <div className="mt-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stop Bank Scam Calls Automatically
            </h3>
            <p className="text-lg mb-6 opacity-90">
              £14.99/month vs £23,000 average bank scam loss. AI screens every call. Scammers blocked. Family gets through.
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
