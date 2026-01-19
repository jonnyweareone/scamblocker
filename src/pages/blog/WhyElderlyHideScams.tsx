import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Heart } from "lucide-react";

export default function WhyElderlyHideScams() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Why Older Parents Hide Being Scammed | Family Guide | ScamBlocker"
        description="Discover why older parents hide phone scams from family. Shame, fear of losing independence, and isolation explained. How to have the conversation and provide real protection."
        keywords="elderly hide scams, parent scammed won't tell, why elderly don't report scams, shame elderly scams"
        url="https://scamblocker.co.uk/blog/why-elderly-hide-scams"
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
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
            <div className="flex gap-3">
              <Heart className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">For Family Members</h3>
                <p className="text-amber-800">
                  If your elderly parent has been scammed and didn't tell you - this isn't about you. It's about shame, fear, and the overwhelming desire to maintain independence. Understanding why helps you help them.
                </p>
              </div>
            </div>
          </div>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              "Mum Gave Them £12,000 and Didn't Tell Me"
            </h1>
            <p className="text-xl text-slate-600">
              Why elderly parents hide phone scams - the shame, fear, and isolation that stops victims from getting help, and what families can do.
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-6">
            
            <h2 className="text-2xl font-bold mt-8">The Text That Broke My Heart</h2>
            <p className="text-slate-700">
              "Dad called. Mum's been scammed. £12,000. She's been crying for two days. She didn't want to tell us."
            </p>
            <p className="text-slate-700">
              This text comes from adult children every single day across the UK. Not from strangers. From your neighbors. From people at your work. From families just like yours.
            </p>
            <p className="text-slate-700 font-semibold">
              The question everyone asks: "Why didn't she just tell us?"
            </p>
            <p className="text-slate-700">
              The answer is more painful than the money.
            </p>

            <h2 className="text-2xl font-bold mt-8">Why Older People Hide Being Scammed</h2>
            
            <h3 className="text-xl font-bold mt-6">1. Shame (The Killer Emotion)</h3>
            <p className="text-slate-700">
              "I should have known better. I'm not stupid. How could I fall for this?"
            </p>
            <p className="text-slate-700">
              Your mum isn't stupid. She's a retired teacher who raised three kids and ran a household for 40 years. She's sharp as a tack.
            </p>
            <p className="text-slate-700">
              But scammers are professionals. They do this 40 times a day. They've refined their scripts on thousands of victims. They know exactly which buttons to press.
            </p>
            <p className="text-slate-700">
              When she realizes she's been scammed, the shame is crushing. "My children will think I'm losing it. They'll want to take control of my money. They'll put me in a home."
            </p>
            <p className="text-slate-700 font-semibold">
              So she stays silent.
            </p>

            <h3 className="text-xl font-bold mt-6">2. Fear of Losing Independence</h3>
            <p className="text-slate-700">
              "If I tell them, they'll say I can't handle my own affairs."
            </p>
            <p className="text-slate-700">
              This is the elderly parent's biggest fear. Not the money. Not the scammers. Loss of independence.
            </p>
            <p className="text-slate-700">
              Once you admit you've been fooled, what comes next? Someone else managing your bank account? Moving in with the kids? A care assessment?
            </p>
            <p className="text-slate-700 font-semibold">
              Better to stay quiet and hope no one finds out.
            </p>

            <h3 className="text-xl font-bold mt-6">3. Not Wanting to Be a Burden</h3>
            <p className="text-slate-700">
              "They're so busy with their own lives. I don't want to bother them with this."
            </p>
            <p className="text-slate-700">
              Your mum knows you're working full-time, managing your own kids, dealing with a mortgage. She sees how tired you are when you visit.
            </p>
            <p className="text-slate-700">
              The last thing she wants is to add another problem to your plate.
            </p>

            <h2 className="text-2xl font-bold mt-8">The Conversation You Need to Have (Today)</h2>
            
            <div className="bg-slate-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4">What NOT to Say:</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="text-red-600">❌ "You'd never fall for that, right?"</li>
                <li className="text-red-600">❌ "Just hang up on scammers, it's easy"</li>
                <li className="text-red-600">❌ "I keep telling you to be careful"</li>
                <li className="text-red-600">❌ "Why didn't you call me first?"</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                What TO Say:
              </h3>
              <ul className="space-y-3 list-none pl-0">
                <li className="text-green-700">✅ "Mum, smart people get scammed. It happened to my friend's dad who's a retired banker."</li>
                <li className="text-green-700">✅ "If anyone ever asks for money over the phone, it's okay to hang up and call me."</li>
                <li className="text-green-700">✅ "I will never think less of you for checking with me first. Ever."</li>
                <li className="text-green-700">✅ "If something ever happens, please tell me. The longer we wait, the harder it is to get money back."</li>
                <li className="text-green-700">✅ "I love you. There's nothing you could tell me that would change that."</li>
              </ul>
              
              <p className="text-slate-700 mt-4 font-semibold">Then the critical bit:</p>
              <p className="text-slate-700 italic">
                "And Mum? If you've already had something happen and haven't told me - you can tell me now. I promise I won't be angry. I just want to help."
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8">Why "Just Hang Up" Doesn't Work</h2>
            <p className="text-slate-700">
              Everyone says: "Just hang up on scammers!"
            </p>
            <p className="text-slate-700">
              But when your 75-year-old mother hears "There's a warrant for your arrest, police will be there in one hour," her brain doesn't think rationally.
            </p>
            <p className="text-slate-700 font-semibold">
              Her brain thinks: Authority figure (HMRC) → Must obey. Arrest threat → Intense fear. Urgency → Can't think clearly.
            </p>
            <p className="text-slate-700">
              By the time her rational brain catches up, she's already given bank details.
            </p>
            <p className="text-slate-700 font-semibold">
              The solution isn't education. It's prevention.
            </p>

            <h2 className="text-2xl font-bold mt-8">The One Thing That Actually Protects Them</h2>
            <p className="text-slate-700">
              AI call screening. Not advice. Not warnings. Not call blocking. Actual prevention.
            </p>
            <ul className="space-y-2">
              <li>Scam call comes in</li>
              <li>AI answers (not your mum)</li>
              <li>Scammer hangs up or can't pass screening</li>
              <li>Your mum's phone never rings</li>
              <li>She never experiences the fear</li>
              <li>Nothing to hide, nothing to feel ashamed about</li>
            </ul>

            <div className="bg-slate-100 p-6 rounded-lg my-6">
              <p className="italic text-slate-700 mb-3">
                "After Mum's first scam (£3,500), we set up ScamBlocker. In the first month, it blocked 14 attempted scam calls. Fourteen times my mum would have answered the phone. But she never heard any of them. The AI dealt with it. More importantly - she's not anxious anymore. She answers the phone again."
              </p>
              <p className="text-sm text-slate-500">— Sarah, daughter of scam victim</p>
            </div>

          </div>

          <div className="mt-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Protect Your Parents Without Taking Away Their Independence
            </h3>
            <p className="text-lg mb-6 opacity-90">
              AI screens every call. Scammers blocked. Family always gets through. From £14.99/month.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Protected Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-2">HMRC Scam Calls: How to Spot Them</h4>
                  <p className="text-sm text-slate-600 mb-3">Learn the warning signs of fake tax calls and protect your family.</p>
                  <Link to="/blog/hmrc-scam-calls" className="text-violet-600 text-sm font-medium hover:underline">
                    Read more →
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-2">Why Your Mum Answers Every Call</h4>
                  <p className="text-sm text-slate-600 mb-3">Why elderly people can't ignore unknown numbers and what actually works.</p>
                  <Link to="/blog/why-elderly-answer-every-call" className="text-violet-600 text-sm font-medium hover:underline">
                    Read more →
                  </Link>
                </CardContent>
              </Card>
            </div>
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
