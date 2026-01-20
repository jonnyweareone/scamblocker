import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export default function Onboarding() {
  const [loading, setLoading] = useState(true);
  const [step] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    s <= step ? 'bg-violet-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-slate-600">Step {step} of 8</p>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome to ScamBlocker! 🛡️
          </h1>
          <p className="text-slate-600 mb-8">
            Let's get you protected in just 5 minutes
          </p>

          <div className="bg-violet-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-slate-900 mb-2">Full onboarding wizard coming soon!</h3>
            <p className="text-sm text-slate-600">
              This will guide you through:
            </p>
            <ol className="text-sm text-slate-600 mt-2 space-y-1 list-decimal list-inside">
              <li>Your details</li>
              <li>Who you're protecting</li>
              <li>Shipping address</li>
              <li>Phone number selection</li>
              <li>Broadband compatibility</li>
              <li>Device selection</li>
              <li>Whitelist contacts (optional)</li>
              <li>Payment & complete setup</li>
            </ol>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-fuchsia-700 transition-all"
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}
