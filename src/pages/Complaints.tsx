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

export default function Complaints() {
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
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Complaints Procedure</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            We're committed to providing excellent service. If something goes wrong, we want to put it right.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Step 1: Contact Us</h2>
          <p className="text-slate-600 mb-4">
            In the first instance, please contact our customer service team:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
            <li>Email: complaints@scamblocker.co.uk</li>
            <li>Phone: 0800 XXX XXXX (Mon-Fri, 9am-5pm)</li>
            <li>Post: ScamBlocker Complaints, 20 Wenlock Road, London, N1 7GU</li>
          </ul>
          <p className="text-slate-600 mb-4">
            We aim to resolve all complaints within 5 working days.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Step 2: Escalation</h2>
          <p className="text-slate-600 mb-4">
            If you're not satisfied with our initial response, you can request escalation to a senior manager. 
            We will respond within 10 working days.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Step 3: CISAS</h2>
          <p className="text-slate-600 mb-4">
            If we haven't resolved your complaint within 8 weeks, or you're not satisfied with our final response, 
            you can refer your complaint to CISAS (Communications and Internet Services Adjudication Scheme).
          </p>
          <p className="text-slate-600 mb-4">
            CISAS is an independent Alternative Dispute Resolution (ADR) scheme approved by Ofcom.
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
            <li>Website: www.cedr.com/consumer/cisas</li>
            <li>Phone: 020 7520 3827</li>
            <li>Email: info@cedr.com</li>
          </ul>

          <p className="text-slate-500 text-sm mt-12">
            We Are One 1 Limited, Company No. 15052885<br />
            20 Wenlock Road, London, England, N1 7GU
          </p>
        </div>
      </div>
    </div>
  );
}
