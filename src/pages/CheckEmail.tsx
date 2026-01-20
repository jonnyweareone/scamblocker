import { useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function CheckEmail() {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-violet-600" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">Check Your Email</h1>

        {email && (
          <p className="text-lg text-slate-700 mb-6">
            We sent a link to <strong>{email}</strong>
          </p>
        )}

        <div className="bg-violet-50 rounded-lg p-6 mb-6 text-left">
          <p className="text-sm text-slate-700 mb-4">Click the link in your email to:</p>
          <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
            <li>Access your dashboard</li>
            <li>Complete your 5-minute setup</li>
            <li>Start protecting your family</li>
          </ol>
        </div>

        <p className="text-sm text-slate-500">
          Didn't receive the email? Check your spam folder
        </p>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Need help? Call us: <strong>02392 404117</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
