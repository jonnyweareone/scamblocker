import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        // Check what type of org user has
        const { data: memberships } = await supabase
          .from("org_memberships")
          .select(`
            org_id,
            role,
            orgs!inner(id, name, slug, type)
          `)
          .eq("user_id", session.user.id);

        // Check if user is SONIQ master admin
        const soniqMembership = memberships?.find((m: any) => m.orgs.type === 'soniq');
        if (soniqMembership) {
          // Redirect to SoniqMail admin
          window.location.href = "https://app.soniq.com/admin";
          return;
        }

        // Check if user has consumer org
        const consumerMembership = memberships?.find((m: any) => m.orgs.type === 'consumer');
        if (consumerMembership) {
          navigate("/dashboard");
        } else {
          navigate("/quick-setup");
        }
      }
      setCheckingSession(false);
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check what type of org user has
      const { data: memberships } = await supabase
        .from("org_memberships")
        .select(`
          org_id,
          role,
          orgs!inner(id, name, slug, type)
        `)
        .eq("user_id", data.user.id);

      // Check if user is SONIQ master admin
      const soniqMembership = memberships?.find((m: any) => m.orgs.type === 'soniq');
      if (soniqMembership) {
        toast.success("Welcome back, SONIQ Admin!");
        // Redirect to SoniqMail admin (or show error for now)
        window.location.href = "https://app.soniq.com/admin"; // Replace with actual admin URL
        return;
      }

      // Check if user has consumer org
      const consumerMembership = memberships?.find((m: any) => m.orgs.type === 'consumer');
      if (consumerMembership) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        // User authenticated but no consumer org - needs quick setup
        toast.success("Welcome! Let's set up your ScamBlocker protection");
        navigate("/quick-setup");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4">
          <Link to="/"><ScamBlockerLogo /></Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to manage your protection</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link to="/join" className="text-violet-600 hover:underline font-medium">
                  Get protected
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
