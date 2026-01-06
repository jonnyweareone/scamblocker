import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, PhoneOff, PhoneIncoming, Shield, Clock, AlertTriangle } from "lucide-react";
import { formatPhoneNumber } from "@/lib/consumer-helpers";
import { formatDistanceToNow } from "date-fns";

interface CallHistoryProps {
  orgId: string;
}

interface CallLog {
  id: string;
  cli: string | null;
  call_type: string;
  layer_result: string;
  call_outcome: string | null;
  caller_claimed_name: string | null;
  caller_claimed_org: string | null;
  duration_seconds: number | null;
  risk_score: number | null;
  created_at: string;
  answered: boolean | null;
  has_voicemail: boolean | null;
}

export function CallHistory({ orgId }: CallHistoryProps) {
  const { data: calls, isLoading } = useQuery({
    queryKey: ["consumer-call-logs", orgId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consumer_call_logs")
        .select("*")
        .eq("org_id", orgId)
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data as CallLog[];
    },
    enabled: !!orgId,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Call History</CardTitle>
          <CardDescription>Recent calls and their protection status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getCallIcon = (layerResult: string) => {
    switch (layerResult) {
      case "whitelist_allowed":
        return <PhoneIncoming className="h-5 w-5 text-green-500" />;
      case "guardrail_blocked":
      case "verification_blocked":
        return <PhoneOff className="h-5 w-5 text-red-500" />;
      default:
        return <Phone className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getResultBadge = (layerResult: string) => {
    switch (layerResult) {
      case "whitelist_allowed":
        return <Badge className="bg-green-500/10 text-green-600">Trusted</Badge>;
      case "guardrail_blocked":
        return <Badge variant="destructive">Blocked - Scam Pattern</Badge>;
      case "verification_blocked":
        return <Badge variant="destructive">Blocked - Failed Verification</Badge>;
      case "verification_allowed":
        return <Badge className="bg-blue-500/10 text-blue-600">Verified</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Call History</CardTitle>
        </div>
        <CardDescription>
          Recent calls and their protection status. Blocked scam calls are highlighted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!calls || calls.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Phone className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No call history yet</p>
            <p className="text-sm">Calls will appear here once your protection is active</p>
          </div>
        ) : (
          <div className="space-y-3">
            {calls.map((call) => (
              <div
                key={call.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  call.layer_result.includes("blocked") 
                    ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20" 
                    : "bg-card"
                }`}
              >
                <div className="flex items-center gap-4">
                  {getCallIcon(call.layer_result)}
                  <div>
                    <div className="font-medium">
                      {call.caller_claimed_name || formatPhoneNumber(call.cli ?? undefined) || "Unknown"}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(call.created_at), { addSuffix: true })}
                      {call.duration_seconds && (
                        <span>• {Math.floor(call.duration_seconds / 60)}:{String(call.duration_seconds % 60).padStart(2, '0')}</span>
                      )}
                    </div>
                    {call.caller_claimed_org && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Claimed: {call.caller_claimed_org}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {getResultBadge(call.layer_result)}
                  {call.risk_score && call.risk_score > 0.5 && (
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <AlertTriangle className="h-3 w-3" />
                      Risk: {Math.round(call.risk_score * 100)}%
                    </div>
                  )}
                  {call.has_voicemail && (
                    <Badge variant="outline" className="text-xs">Voicemail</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
