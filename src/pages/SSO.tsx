import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Shield, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

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

export default function SSO() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Authenticating...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function authenticateWithToken() {
      try {
        const code = searchParams.get("code");
        
        if (!code) {
          throw new Error("No authentication code provided");
        }

        setStatus("Verifying your credentials...");

        // Exchange the code for tokens
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sso-exchange`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Token exchange failed');
        }

        const { access_token, refresh_token, user } = await response.json();

        setStatus("Establishing your session...");
        
        console.log('Received tokens, setting session...');

        // CRITICAL: Use the correct method for setting session
        // setSession expects both tokens, but if refresh_token is invalid, it will fail
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError) {
          console.error('setSession error:', sessionError);
          // If the error is about invalid refresh token, we can still try to proceed
          if (sessionError.message?.includes('refresh') || sessionError.message?.includes('Refresh')) {
            console.warn('Refresh token issue, but proceeding with access token');
          } else {
            throw new Error(sessionError.message);
          }
        }

        // Verify we have a session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('Failed to establish session');
        }

        console.log('Session established successfully');

        // Clear the URL
        window.history.replaceState({}, document.title, '/sso');

        // Mark that user came from SoniqMail SSO
        sessionStorage.setItem('came_from_soniqmail', 'true');

        setStatus("Success! Redirecting to dashboard...");
        toast.success("Welcome to ScamBlocker!");
        
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 500);

      } catch (err: any) {
        console.error("SSO authentication error:", err);
        setError(err.message || "Authentication failed");
        toast.error("Failed to authenticate");
        
        window.history.replaceState({}, document.title, '/sso');
        
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      }
    }

    authenticateWithToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4">
          <ScamBlockerLogo />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100">
                <Shield className="h-8 w-8 text-violet-600" />
              </div>

              {error ? (
                <>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-900">Authentication Failed</h2>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">Redirecting to login page...</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-900">Signing you in</h2>
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-violet-600" />
                      <p className="text-slate-600">{status}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
