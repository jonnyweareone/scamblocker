import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";

export default function ScamBlockerRates() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Call Rates - ScamBlocker | UK & International Calling Rates</title>
        <meta name="description" content="ScamBlocker call rates for UK landlines, mobiles, and international destinations. Transparent pricing with no hidden charges." />
        <link rel="canonical" href="https://scamblocker.co.uk/rates" />
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

      <main className="container px-4 md:px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Call Rates</h1>
        <p className="text-slate-500 mb-8">Effective from January 2025. All prices include VAT.</p>

        {/* Included Allowance */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Included in Your Plan</h2>
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-6">
            <p className="text-slate-700 mb-4">
              ScamBlocker Home includes <strong>unlimited minutes</strong> to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>UK geographic numbers (01, 02, 03)</li>
              <li>UK major mobile networks (EE, Vodafone, O2, Three)</li>
            </ul>
            <p className="text-sm text-slate-500 mt-4">
              Fair use policy applies. Calls to other UK numbers charged at out-of-bundle rates below.
            </p>
          </div>
        </section>

        {/* UK Out-of-Bundle */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">UK Calls (Out of Bundle)</h2>
          <p className="text-slate-600 mb-4">
            Calls to destinations not included in your plan:
          </p>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-3 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Rate per minute</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">Sky Mobile</td><td className="border border-slate-300 px-4 py-2">FREE (included)</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Other UK Mobile (MVNOs, smaller networks)</td><td className="border border-slate-300 px-4 py-2">35p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">BT Mobile</td><td className="border border-slate-300 px-4 py-2">50p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Channel Islands (Landline)</td><td className="border border-slate-300 px-4 py-2">30p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Channel Islands (Mobile)</td><td className="border border-slate-300 px-4 py-2">90p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Isle of Man</td><td className="border border-slate-300 px-4 py-2">30p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">056 VoIP Numbers</td><td className="border border-slate-300 px-4 py-2">10p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">070 Personal Numbers</td><td className="border border-slate-300 px-4 py-2">20p</td></tr>
            </tbody>
          </table>
        </section>

        {/* Blocked Destinations */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Blocked Destinations</h2>
          <p className="text-slate-600 mb-4">
            The following destinations are blocked to protect you from unexpected charges:
          </p>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-red-50">
                <th className="border border-slate-300 px-4 py-3 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">Premium Rate (09)</td><td className="border border-slate-300 px-4 py-2">High cost, commonly used in scams</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Directory Enquiries (118)</td><td className="border border-slate-300 px-4 py-2">Extremely high cost (up to £15/call)</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Adult Services (0908/0909)</td><td className="border border-slate-300 px-4 py-2">Premium rate adult content</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Satellite (Iridium, Inmarsat)</td><td className="border border-slate-300 px-4 py-2">£3-7 per minute</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">International (without bundle)</td><td className="border border-slate-300 px-4 py-2">Add a bundle or enable PAYG</td></tr>
            </tbody>
          </table>
          <p className="text-sm text-slate-500">
            Premium rate blocking is a key ScamBlocker feature - protecting you from bill shock!
          </p>
        </section>

        {/* International Bundles */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">International Calling Bundles</h2>
          <p className="text-slate-600 mb-4">
            Add a bundle to call internationally. Bundles can be added or removed anytime from your account.
          </p>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-3 text-left">Bundle</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Price</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Minutes</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Destinations Included</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">🇺🇸 North America</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">300</td><td className="border border-slate-300 px-4 py-2">USA, Canada, Puerto Rico (landlines & mobiles)</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇮🇳 India</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">150</td><td className="border border-slate-300 px-4 py-2">India (landlines & mobiles)</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇨🇳 China & Hong Kong</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">100</td><td className="border border-slate-300 px-4 py-2">China, Hong Kong (landlines & mobiles)</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇦🇺 Australia & NZ</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">100</td><td className="border border-slate-300 px-4 py-2">Australia, New Zealand (landlines & mobiles)</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇪🇺 Europe</td><td className="border border-slate-300 px-4 py-2">£7/mo</td><td className="border border-slate-300 px-4 py-2">200</td><td className="border border-slate-300 px-4 py-2">France, Germany, Spain, Italy, Ireland, Poland, Netherlands, Belgium, Greece, Austria, Sweden, Switzerland + more</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇵🇰 South Asia</td><td className="border border-slate-300 px-4 py-2">£10/mo</td><td className="border border-slate-300 px-4 py-2">60</td><td className="border border-slate-300 px-4 py-2">Pakistan, Bangladesh, Sri Lanka, Nepal</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇯🇲 Caribbean</td><td className="border border-slate-300 px-4 py-2">£15/mo</td><td className="border border-slate-300 px-4 py-2">50</td><td className="border border-slate-300 px-4 py-2">Jamaica, Trinidad & Tobago, Barbados, Antigua, Grenada</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇳🇬 Africa</td><td className="border border-slate-300 px-4 py-2">£15/mo</td><td className="border border-slate-300 px-4 py-2">50</td><td className="border border-slate-300 px-4 py-2">Nigeria, Ghana, Kenya, South Africa, Uganda, Tanzania</td></tr>
            </tbody>
          </table>
          <p className="text-sm text-slate-500">
            Bundle minutes apply to landlines and mobiles in the listed destinations. Minutes reset monthly.
          </p>
        </section>

        {/* PAYG International */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Pay As You Go International Rates</h2>
          <p className="text-slate-600 mb-4">
            If you have a bundle and exceed your minutes, or prefer pay-as-you-go calling:
          </p>
          
          {/* North America */}
          <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">🇺🇸 North America</h3>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-2 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Landline</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">USA</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">5p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Canada</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">8p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Puerto Rico</td><td className="border border-slate-300 px-4 py-2">3p</td><td className="border border-slate-300 px-4 py-2">10p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Mexico</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">7p</td></tr>
            </tbody>
          </table>

          {/* Europe */}
          <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">🇪🇺 Europe</h3>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-2 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Landline</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">France</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">6p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Germany</td><td className="border border-slate-300 px-4 py-2">3p</td><td className="border border-slate-300 px-4 py-2">6p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Spain</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">5p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Italy</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">6p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Ireland</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">14p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Poland</td><td className="border border-slate-300 px-4 py-2">4p</td><td className="border border-slate-300 px-4 py-2">11p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Portugal</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">7p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Netherlands</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">3p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Belgium</td><td className="border border-slate-300 px-4 py-2">8p</td><td className="border border-slate-300 px-4 py-2">5p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Greece</td><td className="border border-slate-300 px-4 py-2">3p</td><td className="border border-slate-300 px-4 py-2">10p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Austria</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">2p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Sweden</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">10p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Switzerland</td><td className="border border-slate-300 px-4 py-2">5p</td><td className="border border-slate-300 px-4 py-2">28p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Norway</td><td className="border border-slate-300 px-4 py-2">3p</td><td className="border border-slate-300 px-4 py-2">12p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Denmark</td><td className="border border-slate-300 px-4 py-2">3p</td><td className="border border-slate-300 px-4 py-2">7p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Romania</td><td className="border border-slate-300 px-4 py-2">1p</td><td className="border border-slate-300 px-4 py-2">4p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Czech Republic</td><td className="border border-slate-300 px-4 py-2">5p</td><td className="border border-slate-300 px-4 py-2">7p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Hungary</td><td className="border border-slate-300 px-4 py-2">2p</td><td className="border border-slate-300 px-4 py-2">9p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Croatia</td><td className="border border-slate-300 px-4 py-2">4p</td><td className="border border-slate-300 px-4 py-2">14p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Russia</td><td className="border border-slate-300 px-4 py-2">21p</td><td className="border border-slate-300 px-4 py-2">54p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Ukraine</td><td className="border border-slate-300 px-4 py-2">44p</td><td className="border border-slate-300 px-4 py-2">64p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Turkey</td><td className="border border-slate-300 px-4 py-2">9p</td><td className="border border-slate-300 px-4 py-2">41p</td></tr>
            </tbody>
          </table>

          {/* Asia Pacific */}
          <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">🌏 Asia Pacific</h3>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-2 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Landline</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">India</td><td className="border border-slate-300 px-4 py-2">7p</td><td className="border border-slate-300 px-4 py-2">6p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">China</td><td className="border border-slate-300 px-4 py-2">8p</td><td className="border border-slate-300 px-4 py-2">11p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Hong Kong</td><td className="border border-slate-300 px-4 py-2">4p</td><td className="border border-slate-300 px-4 py-2">7p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Japan</td><td className="border border-slate-300 px-4 py-2">9p</td><td className="border border-slate-300 px-4 py-2">29p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Taiwan</td><td className="border border-slate-300 px-4 py-2">10p</td><td className="border border-slate-300 px-4 py-2">31p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Singapore</td><td className="border border-slate-300 px-4 py-2">6p</td><td className="border border-slate-300 px-4 py-2">9p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Malaysia</td><td className="border border-slate-300 px-4 py-2">7p</td><td className="border border-slate-300 px-4 py-2">12p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Thailand</td><td className="border border-slate-300 px-4 py-2">15p</td><td className="border border-slate-300 px-4 py-2">15p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Philippines</td><td className="border border-slate-300 px-4 py-2">28p</td><td className="border border-slate-300 px-4 py-2">36p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Vietnam</td><td className="border border-slate-300 px-4 py-2">21p</td><td className="border border-slate-300 px-4 py-2">19p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Indonesia</td><td className="border border-slate-300 px-4 py-2">15p</td><td className="border border-slate-300 px-4 py-2">14p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Australia</td><td className="border border-slate-300 px-4 py-2">3p</td><td className="border border-slate-300 px-4 py-2">11p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">New Zealand</td><td className="border border-slate-300 px-4 py-2">4p</td><td className="border border-slate-300 px-4 py-2">13p</td></tr>
            </tbody>
          </table>

          {/* South Asia */}
          <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">🇵🇰 South Asia</h3>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-2 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Landline</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">Pakistan</td><td className="border border-slate-300 px-4 py-2">24p</td><td className="border border-slate-300 px-4 py-2">28p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Bangladesh</td><td className="border border-slate-300 px-4 py-2">9p</td><td className="border border-slate-300 px-4 py-2">9p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Sri Lanka</td><td className="border border-slate-300 px-4 py-2">40p</td><td className="border border-slate-300 px-4 py-2">36p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Nepal</td><td className="border border-slate-300 px-4 py-2">36p</td><td className="border border-slate-300 px-4 py-2">39p</td></tr>
            </tbody>
          </table>

          {/* Middle East */}
          <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">🇦🇪 Middle East</h3>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-2 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Landline</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">UAE</td><td className="border border-slate-300 px-4 py-2">40p</td><td className="border border-slate-300 px-4 py-2">38p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Saudi Arabia</td><td className="border border-slate-300 px-4 py-2">24p</td><td className="border border-slate-300 px-4 py-2">40p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Qatar</td><td className="border border-slate-300 px-4 py-2">39p</td><td className="border border-slate-300 px-4 py-2">49p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Kuwait</td><td className="border border-slate-300 px-4 py-2">14p</td><td className="border border-slate-300 px-4 py-2">20p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Israel</td><td className="border border-slate-300 px-4 py-2">4p</td><td className="border border-slate-300 px-4 py-2">10p</td></tr>
            </tbody>
          </table>

          {/* Africa */}
          <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">🌍 Africa</h3>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-2 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Landline</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">Nigeria</td><td className="border border-slate-300 px-4 py-2">27p</td><td className="border border-slate-300 px-4 py-2">26p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Ghana</td><td className="border border-slate-300 px-4 py-2">64p</td><td className="border border-slate-300 px-4 py-2">64p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Kenya</td><td className="border border-slate-300 px-4 py-2">45p</td><td className="border border-slate-300 px-4 py-2">47p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">South Africa</td><td className="border border-slate-300 px-4 py-2">4p</td><td className="border border-slate-300 px-4 py-2">59p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Uganda</td><td className="border border-slate-300 px-4 py-2">60p</td><td className="border border-slate-300 px-4 py-2">70p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Tanzania</td><td className="border border-slate-300 px-4 py-2">78p</td><td className="border border-slate-300 px-4 py-2">74p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Zimbabwe</td><td className="border border-slate-300 px-4 py-2">57p</td><td className="border border-slate-300 px-4 py-2">£1.23</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Egypt</td><td className="border border-slate-300 px-4 py-2">27p</td><td className="border border-slate-300 px-4 py-2">29p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Morocco</td><td className="border border-slate-300 px-4 py-2">46p</td><td className="border border-slate-300 px-4 py-2">£1.31</td></tr>
            </tbody>
          </table>

          {/* Caribbean */}
          <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">🇯🇲 Caribbean</h3>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-2 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Landline</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">Jamaica</td><td className="border border-slate-300 px-4 py-2">67p</td><td className="border border-slate-300 px-4 py-2">52p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Trinidad & Tobago</td><td className="border border-slate-300 px-4 py-2">43p</td><td className="border border-slate-300 px-4 py-2">64p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Barbados</td><td className="border border-slate-300 px-4 py-2">44p</td><td className="border border-slate-300 px-4 py-2">61p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Bahamas</td><td className="border border-slate-300 px-4 py-2">49p</td><td className="border border-slate-300 px-4 py-2">49p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Dominican Republic</td><td className="border border-slate-300 px-4 py-2">18p</td><td className="border border-slate-300 px-4 py-2">21p</td></tr>
            </tbody>
          </table>

          {/* Latin America */}
          <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">🌎 Latin America</h3>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-2 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Landline</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">Brazil</td><td className="border border-slate-300 px-4 py-2">4p</td><td className="border border-slate-300 px-4 py-2">10p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Argentina</td><td className="border border-slate-300 px-4 py-2">7p</td><td className="border border-slate-300 px-4 py-2">55p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Colombia</td><td className="border border-slate-300 px-4 py-2">10p</td><td className="border border-slate-300 px-4 py-2">5p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Chile</td><td className="border border-slate-300 px-4 py-2">6p</td><td className="border border-slate-300 px-4 py-2">10p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Peru</td><td className="border border-slate-300 px-4 py-2">8p</td><td className="border border-slate-300 px-4 py-2">11p</td></tr>
            </tbody>
          </table>

          <p className="text-sm text-slate-500 mt-6">
            Rates shown are per minute. Calls are billed per second with a 1-minute minimum. 
            For destinations not listed, please contact us at support@scamblocker.co.uk.
          </p>
        </section>

        <section className="mb-12">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Questions about rates?</h2>
            <p className="text-slate-600">
              Contact us at support@scamblocker.co.uk or check our <Link to="/terms" className="text-violet-600 underline">Terms of Service</Link> for full details.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2025 ScamBlocker. Part of We Are One 1 Limited (Company No. 15052885).</p>
            <div className="flex gap-6 text-sm">
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/complaints" className="hover:text-white">Complaints</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
