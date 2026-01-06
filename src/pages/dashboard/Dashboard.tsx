import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { ConsumerPortalLayout } from "@/components/consumer/ConsumerPortalLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Phone, Settings, Users, History, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Import dashboard components
import { CallHistory } from "@/components/consumer/CallHistory";
import { WhitelistManager } from "@/components/consumer/WhitelistManager";
import { SettingsPanel } from "@/components/consumer/SettingsPanel";
import { EmergencyContacts } from "@/components/consumer/EmergencyContacts";

interface ConsumerOrg {
  id: string;
  name: string;
  slug: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [consumer, setConsumer] = useState<ConsumerOrg | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    loadConsumerData();
  }, []);

  const loadConsumerData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      setUserName(user.email || "");

      // Get user's consumer org
      const { data: membership, error } = await supabase
        .from("org_memberships")
        .select(`
          org_id,
          orgs!inner(id, name, slug, type)
        `)
        .eq("user_id", user.id)
        .eq("orgs.type", "consumer")
        .maybeSingle();

      if (error) throw error;

      if (!membership) {
        navigate("/login");
        return;
      }

      const org = membership.orgs as unknown as ConsumerOrg;
      setConsumer(org);
    } catch (error) {
      console.error("Error loading consumer data:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ConsumerPortalLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ConsumerPortalLayout>
    );
  }

  if (!consumer) {
    return null;
  }

  const tabs = [
    { value: "overview", label: "Overview", mobileLabel: "Home", icon: Shield },
    { value: "history", label: "Call History", mobileLabel: "Calls", icon: History },
    { value: "whitelist", label: "Trusted Contacts", mobileLabel: "Trusted", icon: Users },
    { value: "emergency", label: "Emergency Contacts", mobileLabel: "Emergency", icon: Phone },
    { value: "settings", label: "Settings", mobileLabel: "Settings", icon: Settings },
  ];

  return (
    <ConsumerPortalLayout userName={userName}>
      <Helmet>
        <title>My Account - ScamBlocker | Protection Dashboard</title>
        <meta name="description" content="Manage your ScamBlocker protection settings, view blocked calls, and configure whitelist from your personal dashboard." />
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{consumer.name}</h1>
            <p className="text-muted-foreground">Manage your call protection settings</p>
          </div>
          <Badge variant="secondary" className="w-fit">
            <Shield className="h-3 w-3 mr-1" />
            Protected
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full h-auto flex justify-start gap-1 overflow-x-auto scrollbar-hide bg-muted/50 p-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3 py-1.5"
              >
                <tab.icon className="h-4 w-4 mr-1 sm:mr-2" />
                {isMobile ? tab.mobileLabel : tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Protection Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                    Active
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your calls are being screened for potential scams
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Your ScamBlocker Number
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your protected number details will appear here
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View your call history in the Calls tab
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <CallHistory orgId={consumer.id} />
          </TabsContent>

          <TabsContent value="whitelist" className="mt-6">
            <WhitelistManager orgId={consumer.id} />
          </TabsContent>

          <TabsContent value="emergency" className="mt-6">
            <EmergencyContacts orgId={consumer.id} />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <SettingsPanel orgId={consumer.id} />
          </TabsContent>
        </Tabs>
      </div>
    </ConsumerPortalLayout>
  );
}
