import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Shield, ArrowLeft, Lock } from "lucide-react";

export default function ScamBlockerPrivacy() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy - ScamBlocker | How We Protect Your Data</title>
        <meta name="description" content="ScamBlocker Privacy Policy. Learn how we collect, use, and protect your personal data when using our AI-powered scam call protection service." />
        <link rel="canonical" href="https://scamblocker.co.uk/privacy" />
      </Helmet>
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-violet-600" />
            <span className="text-xl font-bold">
              <span className="text-violet-600">Scam</span>
              <span className="text-slate-800">Blocker</span>
            </span>
          </Link>
          <Link to="/" className="text-violet-600 hover:text-violet-800 flex items-center gap-1 text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Lock className="h-8 w-8 text-violet-600" />
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-8">
            <strong>Last updated:</strong> December 2024<br />
            <strong>Effective from:</strong> December 2024
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Who We Are</h2>
            <p className="text-slate-700 mb-4">
              ScamBlocker is a trading style of <strong>We Are One 1 Limited</strong> ("we", "us", "our"). 
              We are the data controller responsible for your personal data.
            </p>
            <ul className="text-slate-700 space-y-1 list-none pl-0">
              <li><strong>Company Number:</strong> 15052885</li>
              <li><strong>Registered Office:</strong> 20 Wenlock Road, London, England, N1 7GU</li>
              <li><strong>Data Protection Contact:</strong> privacy@scamblocker.co.uk</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. What Data We Collect</h2>
            
            <h3 className="text-lg font-medium text-slate-800 mb-3">2.1 Account Information</h3>
            <ul className="text-slate-700 space-y-2 list-disc pl-6 mb-4">
              <li>Name and contact details (email, phone number, address)</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Account preferences and settings</li>
              <li>Details of the person you're protecting (name, phone number)</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-800 mb-3">2.2 Call Data</h3>
            <ul className="text-slate-700 space-y-2 list-disc pl-6 mb-4">
              <li>Incoming caller phone numbers</li>
              <li>Call timestamps and duration</li>
              <li>AI screening transcripts (what callers say during screening)</li>
              <li>Call outcomes (connected, blocked, or unanswered)</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-800 mb-3">2.3 Voice Data</h3>
            <ul className="text-slate-700 space-y-2 list-disc pl-6 mb-4">
              <li>Audio recordings during AI screening (processed in real-time)</li>
              <li>Voice fingerprints of whitelisted callers (optional, for voice recognition)</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-800 mb-3">2.4 Technical Data</h3>
            <ul className="text-slate-700 space-y-2 list-disc pl-6">
              <li>Device information (if using our app or GA11 device)</li>
              <li>IP addresses and browser information</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. How We Use Your Data</h2>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2 text-left">Purpose</th>
                  <th className="border p-2 text-left">Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Providing the call screening service</td>
                  <td className="border p-2">Contract performance</td>
                </tr>
                <tr>
                  <td className="border p-2">Processing payments</td>
                  <td className="border p-2">Contract performance</td>
                </tr>
                <tr>
                  <td className="border p-2">Detecting and blocking scam calls</td>
                  <td className="border p-2">Legitimate interest (fraud prevention)</td>
                </tr>
                <tr>
                  <td className="border p-2">Improving our AI and scam detection</td>
                  <td className="border p-2">Legitimate interest</td>
                </tr>
                <tr>
                  <td className="border p-2">Sending service notifications</td>
                  <td className="border p-2">Contract performance</td>
                </tr>
                <tr>
                  <td className="border p-2">Marketing communications</td>
                  <td className="border p-2">Consent (you can opt out anytime)</td>
                </tr>
                <tr>
                  <td className="border p-2">Complying with legal obligations</td>
                  <td className="border p-2">Legal obligation</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Who We Share Data With</h2>
            <p className="text-slate-700 mb-4">
              We share your data only with trusted third parties who help us deliver our service:
            </p>
            
            <h3 className="text-lg font-medium text-slate-800 mb-3">Service Providers</h3>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2 text-left">Provider</th>
                  <th className="border p-2 text-left">Purpose</th>
                  <th className="border p-2 text-left">Data Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Deepgram</td>
                  <td className="border p-2">Voice transcription & AI processing</td>
                  <td className="border p-2">USA (SOC2, ISO 27001 certified)</td>
                </tr>
                <tr>
                  <td className="border p-2">Supabase</td>
                  <td className="border p-2">Database & authentication</td>
                  <td className="border p-2">EU (SOC2 certified)</td>
                </tr>
                <tr>
                  <td className="border p-2">Stripe</td>
                  <td className="border p-2">Payment processing</td>
                  <td className="border p-2">EU (PCI-DSS certified)</td>
                </tr>
              </tbody>
            </table>
            
            <p className="text-slate-700 mb-4">
              All service providers are contractually bound to protect your data and only use it for the specified purposes.
            </p>

            <h3 className="text-lg font-medium text-slate-800 mb-3">Other Disclosures</h3>
            <p className="text-slate-700">
              We may also share data with law enforcement if required by law, or to protect the rights, 
              property, or safety of our users or others.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Data Retention</h2>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2 text-left">Data Type</th>
                  <th className="border p-2 text-left">Retention Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Account information</td>
                  <td className="border p-2">Duration of account + 6 years</td>
                </tr>
                <tr>
                  <td className="border p-2">Call logs & transcripts</td>
                  <td className="border p-2">90 days (configurable in settings)</td>
                </tr>
                <tr>
                  <td className="border p-2">Voice recordings</td>
                  <td className="border p-2">Not stored (processed in real-time only)</td>
                </tr>
                <tr>
                  <td className="border p-2">Voice fingerprints</td>
                  <td className="border p-2">Until deleted or account closed</td>
                </tr>
                <tr>
                  <td className="border p-2">Blocked call data</td>
                  <td className="border p-2">12 months (for scam pattern analysis)</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Your Rights</h2>
            <p className="text-slate-700 mb-4">
              Under UK GDPR, you have the following rights:
            </p>
            <ul className="text-slate-700 space-y-2 list-disc pl-6">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Restrict:</strong> Request limitation of processing</li>
              <li><strong>Withdraw consent:</strong> Where processing is based on consent</li>
            </ul>
            <p className="text-slate-700 mt-4">
              To exercise any of these rights, contact us at privacy@scamblocker.co.uk. We will respond within one month.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">7. International Transfers</h2>
            <p className="text-slate-700 mb-4">
              Some of our service providers (such as Deepgram) are based outside the UK. When we transfer data 
              outside the UK, we ensure appropriate safeguards are in place:
            </p>
            <ul className="text-slate-700 space-y-2 list-disc pl-6">
              <li>Standard Contractual Clauses (SCCs) approved by the ICO</li>
              <li>Transfers to countries with adequate data protection laws</li>
              <li>Providers with appropriate certifications (SOC2, ISO 27001)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">8. Security</h2>
            <p className="text-slate-700 mb-4">
              We take the security of your data seriously and implement appropriate measures including:
            </p>
            <ul className="text-slate-700 space-y-2 list-disc pl-6">
              <li>Encryption of data in transit (TLS 1.3) and at rest (AES-256)</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Cookies</h2>
            <p className="text-slate-700 mb-4">
              Our website uses cookies for:
            </p>
            <ul className="text-slate-700 space-y-2 list-disc pl-6">
              <li><strong>Essential cookies:</strong> Required for the website to function</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site (with consent)</li>
            </ul>
            <p className="text-slate-700 mt-4">
              You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Complaints</h2>
            <p className="text-slate-700 mb-4">
              If you have concerns about how we handle your data, please contact us first at privacy@scamblocker.co.uk.
            </p>
            <p className="text-slate-700">
              You also have the right to lodge a complaint with the Information Commissioner's Office (ICO):<br />
              <a href="https://ico.org.uk/make-a-complaint/" className="text-violet-600 hover:text-violet-800" target="_blank" rel="noopener noreferrer">
                ico.org.uk/make-a-complaint
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">11. Changes to This Policy</h2>
            <p className="text-slate-700">
              We may update this privacy policy from time to time. We will notify you of significant changes 
              by email or through a notice on our website.
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
                <Link to="/complaints" className="text-violet-600 hover:text-violet-800">
                  Complaints Code of Practice →
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
