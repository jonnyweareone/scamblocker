import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export default function WhyElderlyAnswerEverCall() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Why Your Mum Answers Every Call | Elderly Phone Behavior Explained"
        description="Why elderly parents answer every unknown call - and why 'just ignore it' doesn't work. The psychology behind phone anxiety and AI solutions that protect them."
        keywords="elderly answer every call, why elderly answer unknown numbers, mother answers all calls"
        url="https://scamblocker.co.uk/blog/why-elderly-answer-every-call"
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
                <p className="text-blue-800">
                  You've told her a hundred times: "Don't answer numbers you don't recognize." She nods. She agrees. Then she answers anyway. Here's why.
                </p>
              </div>
            </div>
          </div>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Your Mum Answers Every Call Because She Thinks It Might Be You
            </h1>
            <p className="text-xl text-slate-600">
              Why elderly people can't "just ignore unknown numbers" - and what actually works to protect them.
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-6">
            
            <h2 className="text-2xl font-bold mt-8">The Real Reason Your Mum Answers Every Call</h2>
            <p className="text-slate-700">
              You've told her a hundred times: "Mum, don't answer numbers you don't recognize." "Let it go to voicemail." "If it's important, they'll leave a message."
            </p>
            <p className="text-slate-700 font-semibold">
              She nods. She agrees. Then she answers anyway. Why?
            </p>
            <p className="text-slate-700 text-xl font-semibold">
              Because what if it's you?
            </p>

            <h2 className="text-2xl font-bold mt-8">What You Don't Understand About Being Old</h2>
            <p className="text-slate-700">
              When you're 30, 40, 50 - you have a phone full of contacts. You recognize most numbers. Unknown calls are usually spam.
            </p>
            <p className="text-slate-700 font-semibold">When you're 75:</p>
            <ul className="space-y-2">
              <li>The doctor's surgery calls from different numbers each time</li>
              <li>The pharmacy uses a mobile</li>
              <li>Your grandchild might be calling from a friend's phone</li>
              <li>The hospital doesn't always come up as "Hospital"</li>
              <li>Your daughter might be calling from work (different number)</li>
            </ul>
            <p className="text-slate-700 font-semibold">
              Every unknown number could be important.
            </p>
            <p className="text-slate-700">
              And the one time she doesn't answer? That might be the call about Dad's test results. Or you, calling from a new number because yours broke. She can't take that risk.
            </p>

            <h2 className="text-2xl font-bold mt-8">The Scammer's Greatest Weapon: Her Love For You</h2>
            <p className="text-slate-700">
              Scammers know this. They use it. Their opening lines:
            </p>
            <ul className="space-y-2">
              <li>"It's about your grandson"</li>
              <li>"There's been an accident"</li>
              <li>"Your daughter needs help"</li>
              <li>"Family emergency"</li>
            </ul>
            <p className="text-slate-700">
              Her brain goes: Unknown number → Could be about my child → MUST ANSWER
            </p>

            <h2 className="text-2xl font-bold mt-8">The Real Solution: AI Answers So She Doesn't Have To</h2>
            <p className="text-slate-700">
              What if the phone could answer for her? Not voicemail. Not blocking. AI screening.
            </p>
            
            <div className="bg-green-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4">Here's what happens:</h3>
              <ol className="space-y-3">
                <li><strong>1. Unknown number calls</strong></li>
                <li><strong>2. AI answers:</strong> "Who are you calling for?"</li>
                <li><strong>3. Real caller:</strong> "This is Dr. Smith from the surgery"</li>
                <li><strong>4. Her phone rings:</strong> "There's a call from Dr. Smith. Accept?"</li>
                <li><strong>5. She knows exactly who it is before answering</strong></li>
              </ol>
              
              <p className="mt-4 font-semibold">OR:</p>
              <ol className="space-y-3">
                <li><strong>1. Scammer calls</strong></li>
                <li><strong>2. AI answers</strong></li>
                <li><strong>3. Scammer hangs up</strong> (can't talk to AI)</li>
                <li><strong>4. Her phone never rings</strong></li>
                <li><strong>5. She never experiences the fear or manipulation</strong></li>
              </ol>
            </div>

            <div className="bg-slate-100 p-6 rounded-lg my-6">
              <p className="italic text-slate-700 mb-3">
                "Mum was getting 4-5 scam calls a day. Every time the phone rang, I could see her tense up. After we set up ScamBlocker, she said something that broke my heart: 'I don't dread the phone ringing anymore.'"
              </p>
              <p className="text-sm text-slate-500">— Michael, son of 77-year-old mother</p>
            </div>

            <h2 className="text-2xl font-bold mt-8">Before the Next Scam Call Comes</h2>
            <p className="text-slate-700">
              The scammers are calling. Right now. Today. Your mum's number is on their list. You have three choices:
            </p>
            <ol className="space-y-2">
              <li><strong>1. Do nothing</strong> - hope she spots the next scam (she probably won't)</li>
              <li><strong>2. Keep telling her to ignore unknowns</strong> (she can't - we've explained why)</li>
              <li><strong>3. Set up AI screening</strong> (actually prevents the calls)</li>
            </ol>
            <p className="text-slate-700 font-semibold text-xl">
              Which one can you live with?
            </p>

          </div>

          <div className="mt-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Protect Her Today
            </h3>
            <p className="text-lg mb-6 opacity-90">
              £14.99/month = Your mum answers the phone without fear
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Today
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
