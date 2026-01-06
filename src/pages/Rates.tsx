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
        <p className="text-slate-500 mb-8">Effective from December 2024. All prices include VAT.</p>

        {/* Included Allowance */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Included in Your Plan</h2>
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-6">
            <p className="text-slate-700 mb-4">
              ScamBlocker Home includes <strong>2,000 minutes per month</strong> to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>UK geographic numbers (01, 02, 03)</li>
              <li>UK major mobile networks (EE, Vodafone, O2, Three)</li>
            </ul>
            <p className="text-sm text-slate-500 mt-4">
              Minutes are shared across destinations. Allowances reset monthly and do not roll over.
            </p>
          </div>
        </section>

        {/* UK Out-of-Bundle */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">UK Calls (Out of Bundle)</h2>
          <p className="text-slate-600 mb-4">
            If you exceed your 2,000-minute allowance, or call destinations not included in your plan:
          </p>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-3 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Rate per minute</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">UK Geographic (01/02/03) — over allowance</td><td className="border border-slate-300 px-4 py-2">5p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">UK Major Mobile (EE, Vodafone, O2, Three) — over allowance</td><td className="border border-slate-300 px-4 py-2">5p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Other UK Mobile (MVNOs, smaller networks)</td><td className="border border-slate-300 px-4 py-2">25p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Sky Mobile</td><td className="border border-slate-300 px-4 py-2">25p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">BT Mobile</td><td className="border border-slate-300 px-4 py-2">45p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Channel Islands (Landline)</td><td className="border border-slate-300 px-4 py-2">25p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Channel Islands (Mobile)</td><td className="border border-slate-300 px-4 py-2">80p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">UK Service Numbers (084/087)</td><td className="border border-slate-300 px-4 py-2">25p + service charge</td></tr>
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
              <tr><td className="border border-slate-300 px-4 py-2">Personal Numbers (070)</td><td className="border border-slate-300 px-4 py-2">Commonly associated with fraud</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Satellite (Iridium, Inmarsat)</td><td className="border border-slate-300 px-4 py-2">£3-7 per minute</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">International (without bundle)</td><td className="border border-slate-300 px-4 py-2">Add a bundle to enable</td></tr>
            </tbody>
          </table>
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
              <tr><td className="border border-slate-300 px-4 py-2">🇺🇸 USA & Canada</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">500</td><td className="border border-slate-300 px-4 py-2">USA, Canada (landlines & mobiles)</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇮🇳 India</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">300</td><td className="border border-slate-300 px-4 py-2">India (landlines & mobiles)</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇨🇳 China & Hong Kong</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">300</td><td className="border border-slate-300 px-4 py-2">China, Hong Kong (landlines & mobiles)</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇪🇺 Europe</td><td className="border border-slate-300 px-4 py-2">£7/mo</td><td className="border border-slate-300 px-4 py-2">200</td><td className="border border-slate-300 px-4 py-2">France, Germany, Spain, Italy, Ireland, Poland, Romania, Portugal, Netherlands, Belgium, Greece, Austria, Sweden, Switzerland, Norway, Denmark, Finland, Czech Republic, Hungary, Croatia</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇵🇰 South Asia</td><td className="border border-slate-300 px-4 py-2">£7/mo</td><td className="border border-slate-300 px-4 py-2">200</td><td className="border border-slate-300 px-4 py-2">Pakistan, Bangladesh, Sri Lanka</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇯🇲 Caribbean</td><td className="border border-slate-300 px-4 py-2">£10/mo</td><td className="border border-slate-300 px-4 py-2">100</td><td className="border border-slate-300 px-4 py-2">Jamaica, Trinidad & Tobago, Barbados, Antigua, Grenada, St Lucia, St Vincent</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🇳🇬 West Africa</td><td className="border border-slate-300 px-4 py-2">£10/mo</td><td className="border border-slate-300 px-4 py-2">100</td><td className="border border-slate-300 px-4 py-2">Nigeria, Ghana</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">🌍 Rest of World</td><td className="border border-slate-300 px-4 py-2">£15/mo</td><td className="border border-slate-300 px-4 py-2">100</td><td className="border border-slate-300 px-4 py-2">All other international destinations (Australia, South Africa, Philippines, Kenya, etc.)</td></tr>
            </tbody>
          </table>
          <p className="text-sm text-slate-500">
            Bundle minutes apply to landlines and mobiles in the listed destinations. Minutes reset monthly and do not roll over.
          </p>
        </section>

        {/* PAYG International */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Pay As You Go International</h2>
          <p className="text-slate-600 mb-4">
            If you have a bundle and exceed your minutes, or call destinations not in your bundle, 
            pay-as-you-go rates apply:
          </p>
          <table className="w-full border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-4 py-3 text-left">Destination</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Landline</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 px-4 py-2">USA / Canada</td><td className="border border-slate-300 px-4 py-2">5p</td><td className="border border-slate-300 px-4 py-2">5p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">India</td><td className="border border-slate-300 px-4 py-2">10p</td><td className="border border-slate-300 px-4 py-2">12p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">China</td><td className="border border-slate-300 px-4 py-2">8p</td><td className="border border-slate-300 px-4 py-2">10p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Hong Kong</td><td className="border border-slate-300 px-4 py-2">5p</td><td className="border border-slate-300 px-4 py-2">20p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">France / Germany / Spain</td><td className="border border-slate-300 px-4 py-2">5p</td><td className="border border-slate-300 px-4 py-2">15p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Ireland</td><td className="border border-slate-300 px-4 py-2">5p</td><td className="border border-slate-300 px-4 py-2">20p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Poland</td><td className="border border-slate-300 px-4 py-2">5p</td><td className="border border-slate-300 px-4 py-2">15p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Pakistan</td><td className="border border-slate-300 px-4 py-2">15p</td><td className="border border-slate-300 px-4 py-2">18p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Bangladesh</td><td className="border border-slate-300 px-4 py-2">8p</td><td className="border border-slate-300 px-4 py-2">12p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Nigeria</td><td className="border border-slate-300 px-4 py-2">50p</td><td className="border border-slate-300 px-4 py-2">70p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Ghana</td><td className="border border-slate-300 px-4 py-2">60p</td><td className="border border-slate-300 px-4 py-2">80p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Jamaica</td><td className="border border-slate-300 px-4 py-2">80p</td><td className="border border-slate-300 px-4 py-2">95p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Australia</td><td className="border border-slate-300 px-4 py-2">£1.50</td><td className="border border-slate-300 px-4 py-2">50p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">South Africa</td><td className="border border-slate-300 px-4 py-2">55p</td><td className="border border-slate-300 px-4 py-2">85p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Philippines</td><td className="border border-slate-300 px-4 py-2">50p</td><td className="border border-slate-300 px-4 py-2">65p</td></tr>
              <tr><td className="border border-slate-300 px-4 py-2">Kenya</td><td className="border border-slate-300 px-4 py-2">40p</td><td className="border border-slate-300 px-4 py-2">65p</td></tr>
            </tbody>
          </table>
          <p className="text-sm text-slate-500">
            Rates shown are per minute. Calls are billed per second with a 1-minute minimum. 
            For destinations not listed, please contact us.
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
            <p className="text-sm">© 2024 ScamBlocker. Part of Guardian Network Solutions Ltd.</p>
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
