import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Smartphone, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// ScamBlocker Logo Component
function ScamBlockerLogo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl md:text-2xl font-bold tracking-tight">
        <span className="text-[#1e3a8a]">Scam</span>
        <span className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">Blocker</span>
      </span>
    </div>
  );
}

export default function Mobile() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/">
            <ScamBlockerLogo />
          </Link>
          <Link to="/join">
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600">Get Protected</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-20 w-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Smartphone className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mobile Protection
            </h1>
            <p className="text-xl text-cyan-100 mb-8">
              Keep your existing provider. Keep your existing number. Just add AI protection.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "You get a new protected number",
                  desc: "This is the number you give out to companies, services, and anyone who isn't close family."
                },
                {
                  step: "2",
                  title: "Calls to that number are screened by AI",
                  desc: "Scammers get blocked. Safe calls get forwarded to your real phone."
                },
                {
                  step: "3",
                  title: "Your real number stays private",
                  desc: "Only family and close friends have your real number. Everyone else goes through protection."
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="mt-12 border-2 border-cyan-200 bg-cyan-50/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Works with any phone:</h3>
                <ul className="space-y-2">
                  {[
                    "iPhone XS or newer",
                    "Android 2019 or newer",
                    "No app required — uses eSIM or call forwarding",
                    "Keep your existing provider and plan",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="text-center mt-12">
              <Link to="/join?type=mobile">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 h-14 px-8">
                  Get Mobile Protection — £7.99/mo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-slate-500 mt-4">No setup fee • 30-day rolling contract • Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400">
        <div className="container px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} ScamBlocker, a trading style of We Are One 1 Limited</p>
        </div>
      </footer>
    </div>
  );
}
