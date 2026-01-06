import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Bell, Lock, Voicemail, Eye } from "lucide-react";
import { toast } from "sonner";

interface SettingsPanelProps {
  orgId: string;
}

export function SettingsPanel({ orgId }: SettingsPanelProps) {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["consumer-settings", orgId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consumer_settings")
        .select("*")
        .eq("org_id", orgId)
        .single();
      
      if (error && error.code === "PGRST116") {
        // No settings exist, create defaults
        const { data: newSettings, error: insertError } = await supabase
          .from("consumer_settings")
          .insert({ org_id: orgId })
          .select()
          .single();
        if (insertError) throw insertError;
        return newSettings;
      }
      if (error) throw error;
      return data;
    },
    enabled: !!orgId,
  });

  const updateSettingMutation = useMutation({
    mutationFn: async (updates: Record<string, any>) => {
      const { error } = await supabase
        .from("consumer_settings")
        .update(updates)
        .eq("org_id", orgId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consumer-settings", orgId] });
      toast.success("Settings updated");
    },
    onError: (error: any) => {
      toast.error(`Failed to update: ${error.message}`);
    },
  });

  const handleToggle = (field: string, value: boolean) => {
    updateSettingMutation.mutate({ [field]: value });
  };

  const handleUpdate = (field: string, value: any) => {
    updateSettingMutation.mutate({ [field]: value });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Protection Layers */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Protection Settings</CardTitle>
          </div>
          <CardDescription>
            Control which safety features are active
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="whitelist">Whitelist Protection</Label>
              <div className="text-sm text-muted-foreground">
                Allow calls from trusted contacts without screening
              </div>
            </div>
            <Switch
              id="whitelist"
              checked={settings?.whitelist_enabled ?? true}
              onCheckedChange={(checked) => handleToggle("whitelist_enabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="guardrails">Hard Guardrails</Label>
              <div className="text-sm text-muted-foreground">
                Block known scam patterns (bank fraud, HMRC, tech support)
              </div>
            </div>
            <Switch
              id="guardrails"
              checked={settings?.hard_guardrails_enabled ?? true}
              onCheckedChange={(checked) => handleToggle("hard_guardrails_enabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="fraud">AI Fraud Detection</Label>
              <div className="text-sm text-muted-foreground">
                Analyze calls in real-time for suspicious behavior
              </div>
            </div>
            <Switch
              id="fraud"
              checked={settings?.fraud_protection_enabled ?? true}
              onCheckedChange={(checked) => handleToggle("fraud_protection_enabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="block-withheld">Block Withheld Numbers</Label>
              <div className="text-sm text-muted-foreground">
                Automatically block calls from private/withheld numbers
              </div>
            </div>
            <Switch
              id="block-withheld"
              checked={settings?.block_withheld_numbers ?? false}
              onCheckedChange={(checked) => handleToggle("block_withheld_numbers", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="block-international">Block International Numbers</Label>
              <div className="text-sm text-muted-foreground">
                Block calls from outside the UK
              </div>
            </div>
            <Switch
              id="block-international"
              checked={settings?.block_international_numbers ?? false}
              onCheckedChange={(checked) => handleToggle("block_international_numbers", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>
            How should we alert you and your emergency contacts?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-notify">Auto-Notify Emergency Contacts</Label>
              <div className="text-sm text-muted-foreground">
                Alert your emergency contacts when scams are blocked
              </div>
            </div>
            <Switch
              id="auto-notify"
              checked={settings?.auto_notify_emergency_contacts ?? true}
              onCheckedChange={(checked) => handleToggle("auto_notify_emergency_contacts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="announcement">Call Announcements</Label>
              <div className="text-sm text-muted-foreground">
                Announce caller name/number before you answer
              </div>
            </div>
            <Switch
              id="announcement"
              checked={settings?.call_announcement_enabled ?? true}
              onCheckedChange={(checked) => handleToggle("call_announcement_enabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-sms">Notify via SMS</Label>
              <div className="text-sm text-muted-foreground">
                Send alert notifications via text message
              </div>
            </div>
            <Switch
              id="notify-sms"
              checked={settings?.notify_via_sms ?? true}
              onCheckedChange={(checked) => handleToggle("notify_via_sms", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-email">Notify via Email</Label>
              <div className="text-sm text-muted-foreground">
                Send alert notifications via email
              </div>
            </div>
            <Switch
              id="notify-email"
              checked={settings?.notify_via_email ?? true}
              onCheckedChange={(checked) => handleToggle("notify_via_email", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Voicemail */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Voicemail className="h-5 w-5 text-primary" />
            <CardTitle>Voicemail</CardTitle>
          </div>
          <CardDescription>
            Manage voicemail settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="voicemail">Enable Voicemail</Label>
              <div className="text-sm text-muted-foreground">
                Allow callers to leave voicemail if you don't answer
              </div>
            </div>
            <Switch
              id="voicemail"
              checked={settings?.voicemail_enabled ?? true}
              onCheckedChange={(checked) => handleToggle("voicemail_enabled", checked)}
            />
          </div>

          {settings?.voicemail_enabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="rings">Rings Before Voicemail</Label>
                <Select
                  value={String(settings?.rings_before_voicemail || 5)}
                  onValueChange={(value) => handleUpdate("rings_before_voicemail", parseInt(value))}
                >
                  <SelectTrigger id="rings">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 rings (~18 seconds)</SelectItem>
                    <SelectItem value="5">5 rings (~30 seconds)</SelectItem>
                    <SelectItem value="8">8 rings (~48 seconds)</SelectItem>
                    <SelectItem value="10">10 rings (~60 seconds)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="vm-email">Voicemail to Email</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive voicemail notifications via email
                  </div>
                </div>
                <Switch
                  id="vm-email"
                  checked={settings?.voicemail_to_email_enabled ?? true}
                  onCheckedChange={(checked) => handleToggle("voicemail_to_email_enabled", checked)}
                />
              </div>

              {settings?.voicemail_to_email_enabled && (
                <div className="space-y-2">
                  <Label htmlFor="vm-email-address">Email Address</Label>
                  <Input
                    id="vm-email-address"
                    type="email"
                    placeholder="your@email.com"
                    value={settings?.voicemail_email_address || ""}
                    onChange={(e) => handleUpdate("voicemail_email_address", e.target.value)}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Privacy & Security</CardTitle>
          </div>
          <CardDescription>
            Control what gets recorded and who can access it
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="transcription">Default Transcription</Label>
              <div className="text-sm text-muted-foreground">
                Transcribe calls by default (for non-whitelisted calls)
              </div>
            </div>
            <Switch
              id="transcription"
              checked={settings?.post_call_transcription_default ?? false}
              onCheckedChange={(checked) => handleToggle("post_call_transcription_default", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="double-confirm-whitelist">Double-Confirm Whitelist Changes</Label>
              <div className="text-sm text-muted-foreground">
                Require emergency contact approval to add/remove whitelist entries
              </div>
            </div>
            <Switch
              id="double-confirm-whitelist"
              checked={settings?.double_confirm_whitelist_changes ?? true}
              onCheckedChange={(checked) => handleToggle("double_confirm_whitelist_changes", checked)}
            />
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex gap-2">
              <Eye className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <div className="font-medium text-sm">Privacy Guarantee</div>
                <div className="text-xs text-muted-foreground">
                  ScamBlocker never monitors or transcribes calls from family, friends, or
                  contacts you've whitelisted. Only blocked scam calls are reviewed for
                  security purposes.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
