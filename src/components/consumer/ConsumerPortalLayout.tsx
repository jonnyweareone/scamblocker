import { ReactNode, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, HelpCircle, Mail } from "lucide-react";
import { toast } from "sonner";

interface ConsumerPortalLayoutProps {
  children: ReactNode;
  userName?: string;
}

export function ConsumerPortalLayout({ children, userName }: ConsumerPortalLayoutProps) {
  const navigate = useNavigate();
  const [cameFromSoniqMail, setCameFromSoniqMail] = useState(false);

  useEffect(() => {
    // Check if user came from SoniqMail SSO
    const fromSoniqMail = sessionStorage.getItem('came_from_soniqmail') === 'true';
    setCameFromSoniqMail(fromSoniqMail);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const handleBackToMail = () => {
    // Redirect back to SoniqMail
    window.location.href = import.meta.env.VITE_SONIQMAIL_URL || 'https://soniqmail.com';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">ScamBlocker</span>
          </Link>
          <div className="flex items-center gap-3">
            {userName && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {userName}
              </span>
            )}
            {cameFromSoniqMail && (
              <Button variant="outline" size="sm" onClick={handleBackToMail}>
                <Mail className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Mail</span>
                <span className="sm:hidden">Mail</span>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/guides">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>ScamBlocker by Guardian Voice</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/terms" className="hover:text-foreground">Terms</Link>
              <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link to="/complaints" className="hover:text-foreground">Complaints</Link>
              <Link to="/rates" className="hover:text-foreground">Rates</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
