import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function ScamBlockerLogo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold tracking-tight">
        <span className="text-[#1e3a8a]">Scam</span>
        <span className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">Blocker</span>
      </span>
    </div>
  );
}

export default function Rates() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/"><ScamBlockerLogo /></Link>
        </div>
      </header>

      <div className="container max-w-3xl px-4 py-12">
        <Link to="/" className="inline-flex items-center text-sm text-slate-600 hover:text-violet-600 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Call Rates</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            ScamBlocker Home includes 2,000 minutes per month to UK landlines and major UK mobiles.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Included in Your Plan</h2>
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-slate-900">Destination</th>
                <th className="text-right py-3 text-slate-900">Rate</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b">
                <td className="py-3">UK Landlines (01, 02, 03)</td>
                <td className="text-right">Included</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">UK Mobiles (07)</td>
                <td className="text-right">Included</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Emergency (999, 112)</td>
                <td className="text-right">Free</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mt-8 mb-4">International Bundles</h2>
          <p className="text-slate-600 mb-4">
            International calls are blocked by default for your protection. Add a bundle anytime from your account.
          </p>
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-slate-900">Bundle</th>
                <th className="text-right py-3 text-slate-900">Price</th>
                <th className="text-right py-3 text-slate-900">Minutes</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b">
                <td className="py-3">🇺🇸 USA & Canada</td>
                <td className="text-right">£5/mo</td>
                <td className="text-right">500 mins</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">🇮🇳 India</td>
                <td className="text-right">£5/mo</td>
                <td className="text-right">300 mins</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">🇪🇺 Europe</td>
                <td className="text-right">£7/mo</td>
                <td className="text-right">200 mins</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">🇯🇲 Caribbean</td>
                <td className="text-right">£10/mo</td>
                <td className="text-right">100 mins</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">🌍 Rest of World</td>
                <td className="text-right">£15/mo</td>
                <td className="text-right">100 mins</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mt-8 mb-4">Out-of-Bundle Rates</h2>
          <p className="text-slate-600 mb-4">
            Calls outside your included minutes or to destinations not covered by a bundle:
          </p>
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-slate-900">Destination</th>
                <th className="text-right py-3 text-slate-900">Per Minute</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b">
                <td className="py-3">UK Landlines</td>
                <td className="text-right">2p</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">UK Mobiles</td>
                <td className="text-right">10p</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Premium Rate (084, 087, 09)</td>
                <td className="text-right">Blocked</td>
              </tr>
            </tbody>
          </table>

          <p className="text-slate-500 text-sm mt-12">
            All prices include VAT. Rates effective from January 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
