import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <>
      <SEO 
        title="Contact ScamBlocker - UK Scam Call Protection Support"
        description="Get in touch with ScamBlocker for AI-powered scam call protection support. Phone: 02392 404117, Email: support@scamblocker.co.uk. UK-based customer service."
        keywords="contact scamblocker, scam blocker support, phone scam help, customer service uk"
        url="https://scamblocker.co.uk/contact"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-violet-100">
              We're here to help protect your family from scam calls
            </p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            
            {/* Phone */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-violet-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Phone Support</h2>
              </div>
              <a 
                href="tel:02392404117" 
                className="text-3xl font-bold text-violet-600 hover:text-violet-700 transition-colors block mb-2"
              >
                02392 404117
              </a>
              <p className="text-slate-600">
                Monday - Friday: 9am - 6pm<br />
                Saturday: 10am - 2pm
              </p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-fuchsia-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Email Support</h2>
              </div>
              <a 
                href="mailto:support@scamblocker.co.uk" 
                className="text-2xl font-bold text-fuchsia-600 hover:text-fuchsia-700 transition-colors block mb-2 break-all"
              >
                support@scamblocker.co.uk
              </a>
              <p className="text-slate-600">
                We typically respond within 24 hours
              </p>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-violet-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Address</h2>
              </div>
              <address className="text-slate-700 not-italic leading-relaxed">
                We Are One 1 Limited<br />
                20 Wenlock Road<br />
                London, England<br />
                N1 7GU<br />
                United Kingdom
              </address>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-fuchsia-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Support Hours</h2>
              </div>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday:</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Common Questions</h2>
            <div className="space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  How quickly will I get a response?
                </h3>
                <p className="text-slate-700">
                  Email responses are typically sent within 24 hours during business days. 
                  For urgent issues, please call us during support hours.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Do you offer technical support?
                </h3>
                <p className="text-slate-700">
                  Yes! Our team can help with setup, troubleshooting, and any questions 
                  about how ScamBlocker works. We're here to ensure your family stays protected.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Can I request a demo?
                </h3>
                <p className="text-slate-700">
                  Absolutely! Email us at support@scamblocker.co.uk and we'll schedule 
                  a personalized demo to show you how ScamBlocker protects your family.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  What if I need help outside business hours?
                </h3>
                <p className="text-slate-700">
                  Send us an email anytime and we'll respond as soon as we're back in the office. 
                  For existing customers, your protection runs 24/7 automatically.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Family?</h2>
            <p className="text-xl text-violet-100 mb-6">
              Get started in just 5 minutes
            </p>
            <a 
              href="/signup" 
              className="inline-block bg-white text-violet-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-violet-50 transition-colors"
            >
              Start Free Trial →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
