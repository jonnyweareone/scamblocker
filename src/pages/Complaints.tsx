import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScamBlockerComplaints() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Complaints Procedure - ScamBlocker | How to Make a Complaint</title>
        <meta name="description" content="ScamBlocker complaints procedure. How to make a complaint and escalate to CISAS if needed. We aim to resolve all complaints within 10 working days." />
        <link rel="canonical" href="https://scamblocker.co.uk/complaints" />
      </Helmet>
      {/* Header */}
      <header className="py-6 border-b">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to ScamBlocker
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Complaints Code of Practice</h1>
        <p className="text-slate-500 mb-8">Last updated: December 2024</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Our Commitment</h2>
            <p className="text-slate-700">
              We Are One 1 Limited, trading as ScamBlocker, is committed to providing excellent service. 
              However, we recognise that sometimes things go wrong. This Code of Practice explains how to 
              make a complaint and what you can expect from us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">How to Make a Complaint</h2>
            <p className="text-slate-700 mb-4">You can contact us in the following ways:</p>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700 mb-2"><strong>Email:</strong> support@scamblocker.co.uk</p>
              <p className="text-slate-700 mb-2"><strong>Post:</strong> ScamBlocker Complaints, 20 Wenlock Road, London, England, N1 7GU</p>
            </div>
            <p className="text-slate-700 mt-4">
              When making a complaint, please include your account details and a clear description of the issue.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Our Complaints Process</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-slate-900">Step 1: Acknowledgement</h3>
                <p className="text-slate-700">
                  We will acknowledge your complaint within 2 working days of receipt.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-slate-900">Step 2: Investigation</h3>
                <p className="text-slate-700">
                  We will investigate your complaint thoroughly and keep you informed of our progress.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-slate-900">Step 3: Resolution</h3>
                <p className="text-slate-700">
                  We aim to resolve all complaints within 8 weeks of receipt. We will send you a 
                  written response explaining our findings and any action we have taken.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">If You're Not Satisfied</h2>
            <p className="text-slate-700 mb-4">
              If you are not satisfied with our response, or if we have not resolved your complaint 
              within 8 weeks, you have the right to refer your complaint to our Alternative Dispute 
              Resolution (ADR) provider.
            </p>
            <div className="bg-violet-50 p-6 rounded-lg border border-violet-200">
              <h3 className="font-semibold text-slate-900 mb-2">CISAS (Communications & Internet Services Adjudication Scheme)</h3>
              <p className="text-slate-700 mb-2">
                CISAS is approved by Ofcom to handle complaints about communications providers.
              </p>
              <p className="text-slate-700 mb-2"><strong>Website:</strong>{" "}
                <a href="https://www.cedr.com/consumer/cisas/" className="text-violet-600 hover:text-violet-800" target="_blank" rel="noopener noreferrer">
                  www.cedr.com/consumer/cisas
                </a>
              </p>
              <p className="text-slate-700 mb-2"><strong>Phone:</strong> 020 7520 3827</p>
              <p className="text-slate-700"><strong>Email:</strong> info@cedr.com</p>
            </div>
            <p className="text-slate-700 mt-4 text-sm">
              ADR services are free for consumers. You can refer your complaint to CISAS at any time 
              after 8 weeks from the date of your original complaint, or earlier if we have issued 
              a "deadlock letter" confirming we cannot resolve the matter.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">What We Can Help With</h2>
            <p className="text-slate-700 mb-4">This complaints process covers:</p>
            <ul className="text-slate-700 space-y-2 list-disc pl-6">
              <li>Service quality and performance issues</li>
              <li>Billing and payment disputes</li>
              <li>Contract and terms disputes</li>
              <li>Equipment and device issues</li>
              <li>Customer service concerns</li>
              <li>Data protection and privacy concerns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Record Keeping</h2>
            <p className="text-slate-700">
              We keep records of all complaints for a minimum of 12 months and use this information 
              to improve our services and prevent similar issues occurring in the future.
            </p>
          </section>

          <section className="mb-8 p-6 bg-slate-50 rounded-lg">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Related Documents</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-violet-600 hover:text-violet-800">
                  Terms of Service →
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-violet-600 hover:text-violet-800">
                  Privacy Policy →
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© {new Date().getFullYear()} ScamBlocker, a trading style of We Are One 1 Limited</p>
          <p className="text-xs text-slate-500">Company No. 15052885 | Registered Office: 20 Wenlock Road, London, England, N1 7GU</p>
        </div>
      </footer>
    </div>
  );
}
