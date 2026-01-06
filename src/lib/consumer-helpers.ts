/**
 * ScamBlocker - Consumer Mode Helpers
 * 
 * Utility functions and types for consumer protection features.
 */

// ============= Type Definitions =============

export type PrivacyTier = 'private' | 'soniq_reviewable';

export type CallType = 'whitelisted' | 'blocked' | 'verified' | 'unknown' | 'screened' | 'suspicious' | 'incomplete' | 'failed';

export type CallOutcome = 'connected' | 'missed' | 'blocked' | 'failed' | 'hangup_during_screen' | 'voicemail' | 'unknown';

export type LayerResult = 
  | 'whitelist_allowed' 
  | 'guardrail_blocked' 
  | 'verification_allowed' 
  | 'verification_blocked';

export interface ConsumerSettings {
  id: string;
  org_id: string;
  whitelist_enabled: boolean;
  hard_guardrails_enabled: boolean;
  fraud_protection_enabled: boolean;
  intro_ai_enabled: boolean;
  post_call_transcription_default: boolean;
  auto_notify_emergency_contacts: boolean;
  call_announcement_enabled: boolean;
  double_confirm_whitelist_changes: boolean;
  double_confirm_settings_changes: boolean;
  voicemail_enabled: boolean;
  rings_before_voicemail: number;
  voicemail_greeting_text?: string;
  voicemail_max_seconds: number;
  voicemail_to_email_enabled: boolean;
  voicemail_email_address?: string;
  voicemail_include_transcript: boolean;
  mobile_divert_enabled: boolean;
  mobile_divert_number?: string;
  mobile_divert_after_seconds: number;
  block_phone_payments: boolean;
  appointed_contact_name?: string;
  appointed_contact_phone?: string;
  notify_appointed_contact: boolean;
  notify_via_sms: boolean;
  notify_via_email: boolean;
  notification_email?: string;
  notification_phone?: string;
  block_withheld_numbers: boolean;
  block_international_numbers: boolean;
  allowed_international_prefixes: string[];
  screen_voice?: string;
  screen_message?: string;
  announce_voice?: string;
  live_monitoring_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmergencyContact {
  id: string;
  org_id: string;
  name: string;
  relationship?: string;
  phone_number?: string;
  email?: string;
  preferred_channel: 'sms' | 'call' | 'whatsapp' | 'email';
  is_primary: boolean;
  can_approve_changes: boolean;
  is_appointed: boolean;
  created_at: string;
}

export interface HardGuardrail {
  id: string;
  org_id?: string;
  pattern_type: 'keyword' | 'cli_prefix' | 'cli_withheld' | 'international' | 'carrier' | 'voiceprint';
  pattern_value: string;
  action: 'block' | 'flag' | 'allow';
  category?: string;
  severity: 'critical' | 'high' | 'medium';
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface ConsumerCallLog {
  id: string;
  org_id: string;
  call_sid: string;
  cli?: string;
  call_type: CallType;
  call_outcome: CallOutcome;
  layer_result: LayerResult;
  is_private: boolean;
  soniq_reviewable: boolean;
  risk_score?: number;
  risk_factors?: Record<string, any>;
  intro_transcript?: string;
  duration_seconds?: number;
  screening_duration_ms?: number;
  caller_claimed_name?: string;
  caller_claimed_org?: string;
  payment_blocked: boolean;
  payment_block_reason?: string;
  blocked_reason?: string;
  answered: boolean;
  has_voicemail: boolean;
  voicemail_id?: string;
  was_diverted_to_mobile: boolean;
  created_at: string;
}

// ============= Helper Functions =============

export function getCallTypeLabel(callType: CallType): string {
  switch (callType) {
    case 'whitelisted':
      return 'Whitelisted Contact';
    case 'blocked':
      return 'Blocked (Scam)';
    case 'verified':
      return 'Verified Caller';
    case 'screened':
      return 'Screened';
    case 'suspicious':
      return 'Suspicious';
    case 'incomplete':
      return 'Incomplete';
    case 'failed':
      return 'Failed';
    case 'unknown':
      return 'Unknown Caller';
    default:
      return 'Unknown';
  }
}

export function getCallOutcomeLabel(callOutcome: CallOutcome): string {
  switch (callOutcome) {
    case 'connected':
      return 'Connected';
    case 'missed':
      return 'Missed';
    case 'blocked':
      return 'Blocked';
    case 'failed':
      return 'Failed';
    case 'hangup_during_screen':
      return 'Hung Up During Screening';
    case 'voicemail':
      return 'Voicemail';
    case 'unknown':
      return 'Unknown';
    default:
      return 'Unknown';
  }
}

export function getLayerResultLabel(layerResult: LayerResult): string {
  switch (layerResult) {
    case 'whitelist_allowed':
      return 'Allowed (Whitelist)';
    case 'guardrail_blocked':
      return 'Blocked (Hard Guardrail)';
    case 'verification_allowed':
      return 'Allowed (Verified Safe)';
    case 'verification_blocked':
      return 'Blocked (Verification Failed)';
    default:
      return 'Unknown';
  }
}

export function getRiskLevel(riskScore?: number): 'low' | 'medium' | 'high' | 'unknown' {
  if (riskScore === undefined || riskScore === null) return 'unknown';
  if (riskScore < 0.3) return 'low';
  if (riskScore < 0.7) return 'medium';
  return 'high';
}

export function getRiskColorClass(riskScore?: number): string {
  const level = getRiskLevel(riskScore);
  switch (level) {
    case 'low':
      return 'text-green-600';
    case 'medium':
      return 'text-yellow-600';
    case 'high':
      return 'text-red-600';
    default:
      return 'text-muted-foreground';
  }
}

export function formatPhoneNumber(phoneNumber?: string): string {
  if (!phoneNumber) return 'Unknown';
  
  if (phoneNumber.startsWith('+44')) {
    const rest = phoneNumber.substring(3);
    if (rest.length === 10) {
      return `+44 ${rest.substring(0, 4)} ${rest.substring(4, 7)} ${rest.substring(7)}`;
    }
  }
  
  return phoneNumber;
}
