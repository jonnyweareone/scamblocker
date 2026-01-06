import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

export default function Terms() {
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
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">Last updated: January 2025</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Service Description</h2>
          <p className="text-slate-600 mb-4">
            ScamBlocker provides AI-powered call screening and protection services for UK landlines and mobile phones. 
            Our service intercepts incoming calls and uses artificial intelligence to detect and block potential scam calls.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Eligibility</h2>
          <p className="text-slate-600 mb-4">
            You must be at least 18 years old and a UK resident to subscribe to our services. 
            By subscribing, you confirm that you have the authority to make decisions for the phone line being protected.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Pricing and Payment</h2>
          <p className="text-slate-600 mb-4">
            <strong>ScamBlocker Home (Landline):</strong> £14.99/month for the first 6 months, then £24.99/month. 
            £29 one-time setup fee. 12-month minimum term.
          </p>
          <p className="text-slate-600 mb-4">
            <strong>ScamBlocker Mobile:</strong> £7.99/month. No setup fee. 30-day rolling contract.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Cooling-Off Period</h2>
          <p className="text-slate-600 mb-4">
            You have 14 days from the date of purchase to cancel your subscription for a full refund, 
            in accordance with the Consumer Contracts Regulations 2013.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Service Limitations</h2>
          <p className="text-slate-600 mb-4">
            While we strive to block all scam calls, no system is 100% effective. We cannot guarantee that every 
            scam call will be blocked, nor can we guarantee that legitimate calls will never be incorrectly flagged.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact</h2>
          <p className="text-slate-600 mb-4">
            For any questions about these terms, please contact us at support@scamblocker.co.uk
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
