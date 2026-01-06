import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { 
  Gift, 
  Copy, 
  Check, 
  Share2, 
  Users, 
  Clock, 
  CheckCircle2,
  Loader2,
  MessageCircle,
  Mail,
  Facebook
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralStats {
  referral_code: string;
  total_referrals: number;
  pending_referrals: number;
  confirmed_referrals: number;
  credits_earned: number;
  credits_used: number;
  credits_available: number;
}

interface Referral {
  id: string;
  status: string;
  referee_signed_up_at: string;
  referee_first_payment_at: string | null;
  referrer_credit_applied_at: string | null;
}

interface ReferralDashboardProps {
  orgId: string;
}

export function ReferralDashboard({ orgId }: ReferralDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const referralLink = stats?.referral_code 
    ? `https://scamblocker.co.uk/signup?ref=${stats.referral_code}`
    : "";

  useEffect(() => {
    loadReferralData();
  }, [orgId]);

  const loadReferralData = async () => {
    try {
      // Get referral stats
      const { data: statsData, error: statsError } = await supabase
        .from("consumer_referral_stats")
        .select("*")
        .eq("org_id", orgId)
        .maybeSingle();

      if (statsError) throw statsError;
      setStats(statsData);

      // Get referral history
      const { data: referralsData, error: referralsError } = await supabase
        .from("consumer_referrals")
        .select("*")
        .eq("referrer_org_id", orgId)
        .order("created_at", { ascending: false });

      if (referralsError) throw referralsError;
      setReferrals(referralsData || []);
    } catch (error) {
      console.error("Error loading referral data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareViaWhatsApp = () => {
    const text = `🛡️ Protect your family from phone scams with ScamBlocker! Use my referral code ${stats?.referral_code} to get your first month FREE: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareViaEmail = () => {
    const subject = "Protect your family from phone scams - Get your first month FREE!";
    const body = `Hi,\n\nI've been using ScamBlocker to protect my family from phone scams and thought you might be interested.\n\nUse my referral code ${stats?.referral_code} to get your first month FREE!\n\nSign up here: ${referralLink}\n\nBest wishes`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="text-4xl">🎁</div>
            <h2 className="text-2xl font-bold">Give a Month, Get a Month FREE!</h2>
            <p className="text-purple-100 max-w-md mx-auto">
              Share ScamBlocker with friends & family. They get their first month FREE, 
              and when they pay their first bill, you get a FREE month too!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Friends Referred
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold">{stats?.total_referrals || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-bold">{stats?.pending_referrals || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Free Months Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold">{stats?.credits_available || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code & Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Your Referral Code
          </CardTitle>
          <CardDescription>
            Share this code or link with friends and family
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Code Display */}
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border-2 border-dashed border-purple-200">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your Code</p>
              <p className="text-2xl font-mono font-bold text-purple-700">
                {stats?.referral_code || "Loading..."}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(stats?.referral_code || "")}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          {/* Link Input */}
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="secondary"
              onClick={() => copyToClipboard(referralLink)}
            >
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy Link
            </Button>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 min-w-[120px] bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              onClick={shareViaWhatsApp}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              className="flex-1 min-w-[120px] bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              onClick={shareViaEmail}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button
              variant="outline"
              className="flex-1 min-w-[120px] bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
              onClick={shareViaFacebook}
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Referral History
          </CardTitle>
          <CardDescription>
            Track the status of your referrals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Gift className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No referrals yet</p>
              <p className="text-sm">Share your code to start earning free months!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      referral.status === 'credited' 
                        ? 'bg-green-100' 
                        : referral.status === 'confirmed'
                        ? 'bg-blue-100'
                        : 'bg-amber-100'
                    }`}>
                      {referral.status === 'credited' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : referral.status === 'confirmed' ? (
                        <Check className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">Friend Referred</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(referral.referee_signed_up_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      referral.status === 'credited' 
                        ? 'default'
                        : referral.status === 'confirmed'
                        ? 'secondary'
                        : 'outline'
                    }
                    className={
                      referral.status === 'credited'
                        ? 'bg-green-500'
                        : ''
                    }
                  >
                    {referral.status === 'credited' 
                      ? '✓ Credit Applied'
                      : referral.status === 'confirmed'
                      ? 'Confirmed'
                      : 'Awaiting Payment'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Share Your Code</p>
                <p className="text-sm text-muted-foreground">
                  Send your referral code or link to friends and family
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-medium">They Sign Up</p>
                <p className="text-sm text-muted-foreground">
                  They get their first month FREE when using your code
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-medium">You Get Rewarded</p>
                <p className="text-sm text-muted-foreground">
                  When they pay their first bill, you get a FREE month
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
