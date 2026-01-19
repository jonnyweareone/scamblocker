import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Phone, Heart, CheckCircle2, X } from "lucide-react";

export default function SafePhoneForElderly() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Safe Phone for Older Adults: Complete Protection Guide 2026"
        description="How to protect older parents from phone scams without taking away their independence. Why traditional solutions fail and what actually works."
        keywords="safe phone for elderly, elderly phone protection, protect elderly from scams, phone for elderly parents"
        url="https://scamblocker.co.uk/blog/safe-phone-for-elderly"
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
              <Heart className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">For Adult Children</h3>
                <p className="text-blue-800">
                  You want to protect your parents without making them feel incapable. This guide shows you what actually works - and what makes things worse.
                </p>
              </div>
            </div>
          </div>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Safe Phone for Older Adults: How to Protect Your Parents Without Taking Away Their Independence
            </h1>
            </h1>
            <p className="text-xl text-slate-600">
              Why basic phones, call blocking, and advice don't work - and the one solution that does.
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-6">
            
            <h2 className="text-2xl font-bold mt-8">The Problem with "Simple" Phones</h2>
            <p className="text-slate-700">
              Everyone suggests it: "Get Mum one of those simple phones for older people. Big buttons. No confusing features."
            </p>
            <p className="text-slate-700 font-semibold">
              Here's why that doesn't work:
            </p>
            <ul className="space-y-2">
              <li><strong>The scam call still rings</strong> - Big buttons don't stop scammers</li>
              <li><strong>She still answers</strong> - Because it might be you</li>
              <li><strong>She still gets manipulated</strong> - Because scammers are professionals</li>
              <li><strong>She feels patronized</strong> - "Do they think I'm stupid?"</li>
            </ul>
            <p className="text-slate-700">
              A "simple phone" protects her from... what exactly? Accidentally pocket-dialing? That's not the problem we're solving.
            </p>

            <h2 className="text-2xl font-bold mt-8">What Doesn't Work (And Why)</h2>
            
            <div className="bg-red-50 p-6 rounded-lg my-6">
              <h3 className="font-bold text-red-900 mb-4">Solutions That Fail:</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-semibold flex items-center gap-2"><X className="h-5 w-5" /> Call Blocking Apps</p>
                  <p className="text-sm text-red-800">Scammers use new numbers constantly. By the time a number is blocked, they've already called 100 people.</p>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2"><X className="h-5 w-5" /> TPS (Telephone Preference Service)</p>
                  <p className="text-sm text-red-800">Only works for legitimate marketing. Scammers ignore it completely.</p>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2"><X className="h-5 w-5" /> "Just Don't Answer Unknown Numbers"</p>
                  <p className="text-sm text-red-800">The doctor calls from different numbers. Your grandchild might call from a friend's phone. She can't risk missing important calls.</p>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2"><X className="h-5 w-5" /> Teaching Her to Spot Scams</p>
                  <p className="text-sm text-red-800">When someone says "This is HMRC, you're under investigation," her brain enters panic mode. Education doesn't work when you're terrified.</p>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2"><X className="h-5 w-5" /> Taking Away Her Phone</p>
                  <p className="text-sm text-red-800">Now she's isolated AND vulnerable. Plus she'll never forgive you.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8">What Your Parents Actually Need</h2>
            <p className="text-slate-700 font-semibold text-xl">
              Protection that works WITHOUT them having to do anything.
            </p>
            <p className="text-slate-700">Think about it:</p>
            <ul className="space-y-2">
              <li>Car airbags don't require the driver to react correctly in a crash</li>
              <li>Smoke alarms don't depend on you spotting fire early</li>
              <li>Antivirus runs in the background without your input</li>
            </ul>
            <p className="text-slate-700 font-semibold">
              Phone scam protection should work the same way.
            </p>

            <h2 className="text-2xl font-bold mt-8">The AI Solution That Actually Works</h2>
            <p className="text-slate-700">
              AI call screening sits between the scammer and your mum. Every unknown caller is screened before her phone rings.
            </p>
            
            <div className="bg-green-50 p-6 rounded-lg my-6 border-2 border-green-200">
              <h3 className="font-bold text-green-900 mb-3">How It Works:</h3>
              <ol className="space-y-3">
                <li><strong>1. Unknown number calls</strong></li>
                <li><strong>2. AI answers:</strong> "Who are you calling for?"</li>
                <li><strong>3a. Legitimate caller:</strong> "This is Dr. Smith from the surgery"</li>
                <li><strong>4a. Her phone rings:</strong> "Call from Dr. Smith. Accept?"</li>
                <li className="text-slate-600 italic">OR</li>
                <li><strong>3b. Scammer:</strong> Refuses to identify themselves</li>
                <li><strong>4b. Call blocked.</strong> Her phone never rings.</li>
              </ol>
              
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="font-semibold text-green-900">Why This Changes Everything:</p>
                <ul className="space-y-2 text-green-800">
                  <li>✓ She never hears the threatening script</li>
                  <li>✓ She never experiences the panic</li>
                  <li>✓ She never has to make a decision under pressure</li>
                  <li>✓ Family/doctors always get through (whitelist)</li>
                  <li>✓ She keeps her independence completely</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8">Real Example: What Changed for Margaret</h2>
            <div className="bg-slate-100 p-6 rounded-lg my-6">
              <p className="text-slate-700 mb-3">
                <strong>Before ScamBlocker:</strong>
              </p>
              <ul className="space-y-1 text-slate-700">
                <li>• Phone rang constantly (5-8 scam calls daily)</li>
                <li>• Margaret anxious every time it rang</li>
                <li>• Stopped answering unknown numbers</li>
                <li>• Missed doctor callback (different number)</li>
                <li>• Her children worried constantly</li>
              </ul>

              <p className="text-slate-700 mt-4 mb-3">
                <strong>After ScamBlocker:</strong>
              </p>
              <ul className="space-y-1 text-slate-700">
                <li>• 14 scam calls blocked in first month (she never heard them)</li>
                <li>• Every call that rings is now someone real</li>
                <li>• She answers the phone again without fear</li>
                <li>• Doctor always gets through (whitelisted)</li>
                <li>• Her family sleeps better at night</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8">Protecting Independence vs Taking Control</h2>
            <p className="text-slate-700">
              There's a massive difference between:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <Card className="border-red-200">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 text-red-700">Taking Control</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Managing their phone for them</li>
                    <li>• Limiting who can call</li>
                    <li>• Checking their call history</li>
                    <li>• Making them ask permission</li>
                    <li>• Taking away their landline</li>
                  </ul>
                  <p className="mt-3 text-sm font-semibold text-red-700">Result: Loss of dignity</p>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 text-green-700">Protecting Independence</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• AI screens calls automatically</li>
                    <li>• They answer as normal</li>
                    <li>• They maintain privacy</li>
                    <li>• They make their own decisions</li>
                    <li>• They stay connected</li>
                  </ul>
                  <p className="mt-3 text-sm font-semibold text-green-700">Result: Safety + dignity</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8">The Conversation to Have</h2>
            <p className="text-slate-700">
              Don't say: "You need protection because you keep falling for scams."
            </p>
            <p className="text-slate-700 font-semibold">
              Instead say:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p className="text-blue-900 italic">
                "Mum, I've been reading about these phone scams - they're getting really sophisticated. Even police officers and teachers are falling for them. I found this service that screens calls automatically, like having a personal assistant. Your phone works exactly the same, you keep your number, but scammers get blocked before your phone even rings. Would you be open to trying it for a month?"
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8">Setup: Easier Than You Think</h2>
            <ol className="space-y-3">
              <li><strong>1. Sign up online</strong> (takes 5 minutes)</li>
              <li><strong>2. Choose:</strong> Port existing number OR get new number</li>
              <li><strong>3. Receive adapter</strong> in post (48 hours)</li>
              <li><strong>4. Plug in:</strong> Adapter → Router → Phone</li>
              <li><strong>5. Add family numbers</strong> to whitelist</li>
              <li><strong>6. Done.</strong> Protection active immediately.</li>
            </ol>
            <p className="text-slate-700 mt-4 font-semibold">
              Total setup time: 10 minutes. No technical knowledge needed.
            </p>

            <h2 className="text-2xl font-bold mt-8">Cost vs Consequence</h2>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-bold text-red-900 mb-3">Without Protection</h3>
                <ul className="space-y-2 text-sm">
                  <li>Average scam loss: £11,500</li>
                  <li>Emotional trauma: Priceless</li>
                  <li>Family trust damaged: Immeasurable</li>
                  <li>Constant worry: Ongoing</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 mb-3">With ScamBlocker</h3>
                <ul className="space-y-2 text-sm">
                  <li>£14.99/month = £180/year</li>
                  <li>Peace of mind: Immediate</li>
                  <li>Independence maintained: Always</li>
                  <li>Family connection: Protected</li>
                </ul>
              </div>
            </div>

          </div>

          <div className="mt-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Protect Your Parents Today
            </h3>
            <p className="text-lg mb-6 opacity-90">
              AI call screening • Works with any phone • Family always gets through • From £14.99/month
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started in 5 Minutes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm mt-4 opacity-75">14-day cooling-off period • Cancel anytime • UK-based support</p>
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
