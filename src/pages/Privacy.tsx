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

export default function Privacy() {
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
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">Last updated: January 2025</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 mb-4">
            We collect information necessary to provide our call protection service, including:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
            <li>Contact details (name, email, phone number, address)</li>
            <li>Call metadata (caller ID, call duration, timestamps)</li>
            <li>Voice recordings for call screening purposes</li>
            <li>Payment information (processed securely via Stripe)</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 mb-4">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
            <li>Provide and improve our call protection service</li>
            <li>Train our AI models to better detect scam calls</li>
            <li>Send you alerts about blocked calls</li>
            <li>Process payments and manage your account</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Retention</h2>
          <p className="text-slate-600 mb-4">
            Call recordings are retained for 30 days to allow for dispute resolution and service improvement. 
            Account data is retained for the duration of your subscription plus 6 years for legal compliance.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Your Rights</h2>
          <p className="text-slate-600 mb-4">
            Under GDPR, you have the right to access, correct, delete, or export your personal data. 
            Contact us at privacy@scamblocker.co.uk to exercise these rights.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Contact</h2>
          <p className="text-slate-600 mb-4">
            Data Controller: We Are One 1 Limited<br />
            Email: privacy@scamblocker.co.uk
          </p>

          <p className="text-slate-500 text-sm mt-12">
            We Are One 1 Limited, Company No. 15052885<br />
            20 Wenlock Road, London, England, N1 7GU
          </p>
        </div>
      </div>
    </div>
  );
}
