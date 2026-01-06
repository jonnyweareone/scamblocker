import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";

export default function ScamBlockerTerms() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Terms of Service - ScamBlocker | Contract Terms & Conditions</title>
        <meta name="description" content="ScamBlocker Terms of Service including contract terms, pricing, cancellation policy, fair use policy, and service level agreements for UK landline and mobile scam protection." />
        <link rel="canonical" href="https://scamblocker.co.uk/terms" />
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-slate-500 mb-8">Last updated: December 2024</p>

        <div className="prose prose-slate max-w-none">

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. About Us</h2>
            <p className="text-slate-600 mb-4">
              ScamBlocker is a trading name of We Are One 1 Limited, a company registered in England and Wales. 
              Our registered office is at 20 Wenlock Road, London, England, N1 7GU. Company number: 15052885.
            </p>
            <p className="text-slate-600">
              We are a registered communications provider regulated by Ofcom. Our services are provided in accordance with 
              the Communications Act 2003 and relevant Ofcom regulations.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Our Services</h2>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">2.1 ScamBlocker Home (Landline)</h3>
            <p className="text-slate-600 mb-4">A VoIP-based landline replacement service with AI-powered scam call protection. Includes:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>GA11 ATA adapter (supplied as part of setup)</li>
              <li>Free number porting from your existing provider</li>
              <li>2,000 minutes per month to UK landlines (01, 02, 03) and UK major mobiles (EE, Vodafone, O2, Three)</li>
              <li>AI-powered call screening and scam blocking</li>
              <li>Payment Blocker™ supervision feature</li>
              <li>Family dashboard and alerts</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">2.2 ScamBlocker Mobile</h3>
            <p className="text-slate-600 mb-4">An eSIM-based service providing a second phone number with AI protection. Includes:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>New UK mobile number</li>
              <li>eSIM activation (works alongside your existing provider)</li>
              <li>AI-powered call screening and scam blocking</li>
              <li>Payment Blocker™ supervision feature</li>
              <li>Call forwarding to your main mobile</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Pricing & Payment</h2>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">3.1 ScamBlocker Home</h3>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li><strong>Standard price:</strong> £24.99 per month</li>
              <li><strong>Introductory offer:</strong> £14.99 per month for the first 6 months (new customers only)</li>
              <li><strong>Setup fee:</strong> £29 one-time fee (includes GA11 adapter, delivery, and number porting)</li>
              <li><strong>Minimum term:</strong> 12 months</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">3.2 ScamBlocker Mobile</h3>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li><strong>Price:</strong> £7.99 per month</li>
              <li><strong>Setup fee:</strong> None</li>
              <li><strong>Minimum term:</strong> 30-day rolling contract</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">3.3 Billing</h3>
            <p className="text-slate-600 mb-4">
              All services are billed monthly in advance. Payment is taken by Direct Debit or credit/debit card. 
              Your billing date is the anniversary of your service activation date.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Cancellation & Early Termination</h2>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">4.1 Cooling-Off Period</h3>
            <p className="text-slate-600 mb-4">
              Under the Consumer Contracts Regulations 2013, you have 14 days from service activation to cancel 
              without giving a reason. During this period:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>You will receive a full refund of any payments made</li>
              <li>The GA11 adapter (ScamBlocker Home) must be returned in its original condition</li>
              <li>Your number will be released back to your previous provider upon request</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">4.2 Early Termination (ScamBlocker Home)</h3>
            <p className="text-slate-600 mb-4">
              If you cancel after the 14-day cooling-off period but before the end of your 12-month minimum term:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li><strong>Option A:</strong> Pay an early termination fee of £40, OR</li>
              <li><strong>Option B:</strong> Return the GA11 adapter in working condition</li>
            </ul>
            <p className="text-slate-600 mb-4">
              If you are on the introductory offer (£14.99/month for 6 months), the introductory discount will be 
              removed upon early cancellation. Any months already billed at the discounted rate will be recalculated 
              at the standard rate of £24.99/month, and the difference will be added to your final bill.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">4.3 Cancellation (ScamBlocker Mobile)</h3>
            <p className="text-slate-600 mb-4">
              ScamBlocker Mobile is a 30-day rolling contract. You may cancel at any time with 30 days' notice. 
              No early termination fees apply after the 14-day cooling-off period.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">4.4 After Minimum Term</h3>
            <p className="text-slate-600 mb-4">
              After your 12-month minimum term (ScamBlocker Home), your service continues on a rolling monthly basis. 
              You may cancel at any time with 30 days' notice and no early termination fees.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Included Allowances</h2>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">5.1 ScamBlocker Home</h3>
            <p className="text-slate-600 mb-4">Your monthly allowance includes:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>2,000 minutes to UK geographic numbers (01, 02, 03)</li>
              <li>2,000 minutes to UK major mobile networks (EE, Vodafone, O2, Three)</li>
            </ul>
            <p className="text-slate-600 mb-4">
              Minutes are shared across these destinations. Allowances reset on your billing date each month 
              and do not roll over.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">5.2 ScamBlocker Mobile</h3>
            <p className="text-slate-600 mb-4">
              ScamBlocker Mobile provides call screening and forwarding only. Outbound calling uses your 
              existing mobile provider's allowance.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Out-of-Bundle Rates</h2>
            <p className="text-slate-600 mb-4">
              Calls exceeding your included allowance or to destinations not covered will be charged at the following rates:
            </p>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">6.1 UK Calls</h3>
            <table className="w-full border-collapse border border-slate-300 mb-4">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-300 px-4 py-2 text-left">Destination</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Rate per minute</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-slate-300 px-4 py-2">UK Geographic / Major Mobiles (over allowance)</td><td className="border border-slate-300 px-4 py-2">5p</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">Other UK Mobile (MVNOs, smaller networks)</td><td className="border border-slate-300 px-4 py-2">25p</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">BT Mobile</td><td className="border border-slate-300 px-4 py-2">45p</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">Channel Islands (Landline)</td><td className="border border-slate-300 px-4 py-2">25p</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">Channel Islands (Mobile)</td><td className="border border-slate-300 px-4 py-2">80p</td></tr>
              </tbody>
            </table>
            <p className="text-slate-600 mb-4">
              For full international rates, see our <Link to="/rates" className="text-violet-600 underline">Rate Card</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">7. Blocked Destinations</h2>
            <p className="text-slate-600 mb-4">
              To protect you from unexpected charges and common scam vectors, the following destinations are 
              blocked by default and cannot be unblocked:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li><strong>Premium rate numbers (09)</strong> — Often used for scams and premium services</li>
              <li><strong>Directory enquiries (118)</strong> — Extremely high call costs</li>
              <li><strong>Personal numbers (070)</strong> — Commonly associated with fraud</li>
              <li><strong>Satellite services (Iridium, Inmarsat)</strong> — £3-7 per minute</li>
              <li><strong>International calls</strong> — Blocked by default; add a bundle to enable specific destinations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">8. International Calling Bundles</h2>
            <p className="text-slate-600 mb-4">
              International calls are blocked by default. You can add one or more calling bundles to enable 
              specific destinations. Bundles can be added or removed at any time from your account.
            </p>
            <table className="w-full border-collapse border border-slate-300 mb-4">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-300 px-4 py-2 text-left">Bundle</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Minutes</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Destinations</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-slate-300 px-4 py-2">USA & Canada</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">500</td><td className="border border-slate-300 px-4 py-2">USA, Canada (landlines & mobiles)</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">India</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">300</td><td className="border border-slate-300 px-4 py-2">India (landlines & mobiles)</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">China & Hong Kong</td><td className="border border-slate-300 px-4 py-2">£5/mo</td><td className="border border-slate-300 px-4 py-2">300</td><td className="border border-slate-300 px-4 py-2">China, Hong Kong</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">Europe</td><td className="border border-slate-300 px-4 py-2">£7/mo</td><td className="border border-slate-300 px-4 py-2">200</td><td className="border border-slate-300 px-4 py-2">France, Germany, Spain, Italy, Ireland, Poland, Romania, Portugal, Netherlands, Belgium, Greece, Austria, Sweden + others</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">South Asia</td><td className="border border-slate-300 px-4 py-2">£7/mo</td><td className="border border-slate-300 px-4 py-2">200</td><td className="border border-slate-300 px-4 py-2">Pakistan, Bangladesh, Sri Lanka</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">Caribbean</td><td className="border border-slate-300 px-4 py-2">£10/mo</td><td className="border border-slate-300 px-4 py-2">100</td><td className="border border-slate-300 px-4 py-2">Jamaica, Trinidad & Tobago, Barbados, Antigua, Grenada, St Lucia</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">West Africa</td><td className="border border-slate-300 px-4 py-2">£10/mo</td><td className="border border-slate-300 px-4 py-2">100</td><td className="border border-slate-300 px-4 py-2">Nigeria, Ghana</td></tr>
                <tr><td className="border border-slate-300 px-4 py-2">Rest of World</td><td className="border border-slate-300 px-4 py-2">£15/mo</td><td className="border border-slate-300 px-4 py-2">100</td><td className="border border-slate-300 px-4 py-2">All other international destinations not covered above</td></tr>
              </tbody>
            </table>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">9. Fair Use Policy</h2>
            <p className="text-slate-600 mb-4">
              Your 2,000-minute allowance is for normal residential use. This means personal calls from your home.
            </p>
            <p className="text-slate-600 mb-4">The following uses are not permitted:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Business or commercial use</li>
              <li>Call forwarding to premium rate or revenue-share services</li>
              <li>Auto-dialling, predictive dialling, or telemarketing</li>
              <li>Any activity generating abnormal call volumes</li>
              <li>Reselling or sharing your service with others</li>
            </ul>
            <p className="text-slate-600 mb-4">
              We reserve the right to review accounts exceeding 4,000 minutes per month or showing non-residential 
              calling patterns. If we determine your usage is not for normal residential purposes, we may suspend 
              your service or move you to a business tariff.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">10. Service Levels</h2>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">10.1 Availability</h3>
            <p className="text-slate-600 mb-4">
              We aim to provide 99.9% service availability. This excludes planned maintenance (of which we will 
              give reasonable notice) and events outside our control.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">10.2 Service Credits</h3>
            <p className="text-slate-600 mb-4">
              If our service is unavailable for more than 24 continuous hours due to a fault on our network, 
              we will automatically apply a service credit to your next bill. You do not need to contact us 
              to request this credit.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">10.3 Emergency Calls</h3>
            <p className="text-slate-600 mb-4">
              VoIP services may not work during power cuts or internet outages. We recommend keeping a mobile 
              phone available for emergency calls. Our service supports 999/112 emergency calls when operational, 
              and we provide your registered address to emergency services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">11. Equipment</h2>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">11.1 GA11 Adapter (ScamBlocker Home)</h3>
            <p className="text-slate-600 mb-4">
              The GA11 adapter remains the property of We Are One 1 Limited Ltd until the end of your 
              12-month minimum term. After this period, ownership transfers to you. During the minimum term:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>You are responsible for keeping the adapter in good working condition</li>
              <li>If you cancel early, you must either pay the £40 early termination fee or return the adapter</li>
              <li>Failure to return the adapter (if choosing that option) will result in a £40 charge</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">12. Number Porting</h2>
            <p className="text-slate-600 mb-4">
              We will port your existing landline number to our service free of charge. Porting typically 
              completes within 1 working day. During the porting process:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>You must provide accurate information about your current provider</li>
              <li>You must not have any outstanding disputes or early termination fees with your current provider</li>
              <li>There may be a brief period (typically minutes) when calls cannot be received during the switch</li>
            </ul>
            <p className="text-slate-600 mb-4">
              If you leave ScamBlocker, you have the right to port your number to another provider. We will 
              process outbound porting requests within 1 working day.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">13. Privacy & Data Protection</h2>
            <p className="text-slate-600 mb-4">
              We process your personal data in accordance with our <Link to="/privacy" className="text-violet-600 underline">Privacy Policy</Link>. 
              Our AI call screening analyses call audio in real-time to detect scam patterns. Call recordings may 
              be retained for up to 30 days for service improvement and dispute resolution.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">14. Complaints</h2>
            <p className="text-slate-600 mb-4">
              If you have a complaint, please contact us first. We aim to resolve all complaints within 10 working days.
            </p>
            <p className="text-slate-600 mb-4">
              If we cannot resolve your complaint to your satisfaction within 8 weeks, or if we have reached a 
              deadlock, you may refer your complaint to CISAS (Communications & Internet Services Adjudication Scheme), 
              an Ofcom-approved Alternative Dispute Resolution scheme.
            </p>
            <p className="text-slate-600 mb-4">
              For full details, see our <Link to="/complaints" className="text-violet-600 underline">Complaints Procedure</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">15. Changes to These Terms</h2>
            <p className="text-slate-600 mb-4">
              We may update these terms from time to time. If we make material changes that affect your rights, 
              we will give you at least 30 days' notice. If you do not accept the changes, you may cancel your 
              service without early termination fees during this notice period.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">16. Governing Law</h2>
            <p className="text-slate-600 mb-4">
              These terms are governed by the laws of England and Wales. Any disputes will be subject to the 
              exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">17. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              We Are One 1 Limited Ltd<br />
              20 Wenlock Road, London, England, N1 7GU<br />
              Email: support@scamblocker.co.uk<br />
              Phone: [Support Number]
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 ScamBlocker. Part of We Are One 1 Limited Ltd.</p>
            <div className="flex gap-6 text-sm">
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/rates" className="hover:text-white">Rates</Link>
              <Link to="/complaints" className="hover:text-white">Complaints</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
