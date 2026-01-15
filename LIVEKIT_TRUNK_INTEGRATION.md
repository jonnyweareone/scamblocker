# Consumer DDI → LiveKit SIP Trunk → ScamBlocker Agent Flow

## Complete Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    INCOMING CALL TO CONSUMER DDI                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       DRACHTIO SIP SERVER                        │
│  - Receives INVITE to DDI (e.g., +442089999999)                │
│  - Queries phone_numbers table                                   │
│  - Finds: number_type='consumer', call_flow_id=xxx              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     LIVEKIT SIP TRUNK                            │
│  - Creates new LiveKit room                                     │
│  - Room metadata includes:                                       │
│    * from_number: Caller ID                                     │
│    * to_number/ddi: Consumer's DDI                              │
│    * agent_type: 'scamblocker'                                  │
│    * agent_name: 'soniq-scamblocker'                            │
│    * org_id: Consumer org UUID                                  │
│    * scam_mode: 'prescreen'                                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              SCAMBLOCKER AGENT (Railway)                         │
│  Location: /Users/davidsmith/Documents/GitHub/soniq-scamblocker │
│                                                                  │
│  1. Agent accepts job (agent_name='soniq-scamblocker')          │
│  2. Connects to LiveKit room                                    │
│  3. Answers call with AI voice                                  │
│  4. Asks: "Who's calling and what is this regarding?"           │
│  5. Analyses speech for 30 seconds max                          │
│  6. Checks for scam patterns:                                   │
│     - Urgency/threats                                           │
│     - Money requests                                            │
│     - Info requests (SSN, bank details)                         │
│     - Impersonation (IRS, bank, etc.)                           │
│  7. Scores scam confidence (0-100%)                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
         ┌──────────────────┐  ┌──────────────────┐
         │   SCAM DETECTED   │  │   CALL CLEARED   │
         │   (Score ≥ 70%)   │  │   (Score < 70%)  │
         └──────────────────┘  └──────────────────┘
                    ↓                   ↓
         ┌──────────────────┐  ┌──────────────────┐
         │ 1. Log to DB     │  │ 1. "I'll connect │
         │ 2. Say "This     │  │     you now"      │
         │    appears to be │  │ 2. Invite SIP    │
         │    a scam call"  │  │    device to room │
         │ 3. Terminate     │  │ 3. Bridge call   │
         └──────────────────┘  └──────────────────┘
                                        ↓
                              ┌──────────────────┐
                              │ DRACHTIO INVITES │
                              │  SIP DEVICE TO   │
                              │   LIVEKIT ROOM   │
                              │                  │
                              │ SIP URI:         │
                              │ 1001.orgslug@... │
                              └──────────────────┘
                                        ↓
                              ┌──────────────────┐
                              │  USER'S PHONE    │
                              │     RINGS!       │
                              └──────────────────┘
```

## LiveKit SIP Trunk Configuration

### Inbound Trunk Rule for Consumer DDIs

```json
{
  "rule_id": "consumer-scamblocker",
  "trunk_id": "consumer-trunk",
  "match_pattern": {
    "ddi": "\\+44.*",
    "query_condition": "SELECT 1 FROM phone_numbers WHERE number = $ddi AND number_type = 'consumer'"
  },
  "action": {
    "type": "dispatch_agent",
    "room_name": "scam-screen-${call_id}",
    "agent_name": "soniq-scamblocker",
    "metadata": {
      "agent_type": "scamblocker",
      "agent_name": "soniq-scamblocker",
      "scam_mode": "prescreen",
      "from_number": "${caller_id}",
      "to_number": "${ddi}",
      "org_id": "${org_id_from_phone_numbers}",
      "call_flow_id": "${call_flow_id_from_phone_numbers}"
    }
  }
}
```

## Database Schema for Routing

### phone_numbers Table
```sql
CREATE TABLE phone_numbers (
  id UUID PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES orgs(id),
  number TEXT NOT NULL UNIQUE,           -- E.164 format: +442089999999
  country_code TEXT NOT NULL,            -- +44
  number_type TEXT NOT NULL,             -- 'consumer' = routes to ScamBlocker
  call_flow_id UUID REFERENCES call_flows(id),
  status TEXT NOT NULL DEFAULT 'active',
  capabilities JSONB NOT NULL,
  provider TEXT,
  provider_number_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups during call routing
CREATE INDEX idx_phone_numbers_lookup 
ON phone_numbers(number, number_type, status) 
WHERE status = 'active';
```

### call_flows Table
```sql
CREATE TABLE call_flows (
  id UUID PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES orgs(id),
  name TEXT NOT NULL,
  flow_type TEXT NOT NULL,               -- 'consumer' for ScamBlocker
  entrypoint TEXT,                       -- 'ai_screening'
  workflow_steps JSONB NOT NULL,
  settings JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### sip_devices Table
```sql
CREATE TABLE sip_devices (
  id UUID PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES orgs(id),
  org_user_id UUID REFERENCES auth.users(id),
  sip_username TEXT NOT NULL UNIQUE,     -- Format: 1001.orgslug
  sip_password_hash TEXT NOT NULL,       -- Bcrypt for Drachtio auth
  label TEXT,
  settings JSONB NOT NULL DEFAULT '{}',
  last_registered_at TIMESTAMPTZ,
  last_registered_ip INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## ScamBlocker Agent Behavior

### Request Handler
The agent only accepts jobs where metadata contains:
- `agent_type` in ("scamblocker", "scam", "screen"), OR
- `agent_name` == "soniq-scamblocker"

```python
async def request_handler(req: JobRequest):
    metadata = json.loads(req.job.metadata or "{}")
    agent_type = metadata.get("agent_type", "").lower()
    agent_name = metadata.get("agent_name", "")
    
    if agent_type in ("scamblocker", "scam", "screen") or agent_name == "soniq-scamblocker":
        await req.accept()  # ✅ Accept consumer calls
    else:
        await req.reject()  # ❌ Reject other agent types
```

### Prescreen Mode
Default mode for consumer calls:
1. Agent joins room immediately
2. Answers with AI voice: "Hello, thank you for calling. Before I connect you, may I ask who's calling and what this is regarding?"
3. Engages caller for up to 30 seconds
4. Real-time transcription & pattern matching
5. If 3+ scam patterns detected → Terminate
6. If clear → Invite SIP device to room

### Scam Pattern Detection
```python
SCAM_PATTERNS = {
    "urgency": ["act now", "immediately", "final notice"],
    "threats": ["arrest", "warrant", "police", "lawsuit"],
    "money_requests": ["gift card", "wire transfer", "bitcoin"],
    "info_requests": ["social security", "ssn", "bank account"],
    "impersonation": ["irs", "social security administration"],
    "pressure": ["don't tell anyone", "stay on the line"]
}

SCAM_THRESHOLD = 3  # Matches needed to flag as scam
```

## Call Flow After Screening

### If SCAM Detected (score ≥ 70%)
```python
async def _handle_scam_detected(self):
    # 1. Log to database
    await self.supabase.table("scam_reports").insert({...})
    
    # 2. Inform caller
    await self.session.say(
        "This call has been flagged as potentially fraudulent. "
        "The call is now being terminated."
    )
    
    # 3. Terminate call
    await self.lk_api.room.delete_room(self.ctx.room.name)
```

### If CALL Cleared (score < 70%)
```python
async def _report_screening_result(self):
    if self.scam_ctx.scam_confidence > 50:
        # Medium confidence - warn user
        await self.session.say(
            "I'll connect you now, but please be cautious - "
            "never give out personal information over the phone."
        )
    else:
        await self.session.say("Thank you. I'll connect you now.")
    
    # LiveKit SIP Trunk invites SIP device to room
    # Drachtio sends INVITE to: 1001.orgslug@sip.domain.com
    # User's phone rings and joins the room
```

## Drachtio SIP Device Invitation

After screening passes, LiveKit SIP Trunk:
1. Looks up `sip_devices` table for org_id
2. Finds SIP device with username `1001.{org_slug}`
3. Sends INVITE to SIP device
4. SIP device registers and joins LiveKit room
5. Call is bridged: Caller ↔ LiveKit ↔ User's Phone

### SIP Device Format
```
Username: 1001.john-smith-a3f9b2
Domain: sip.scamblocker.co.uk (or sip.soniq.com)
Auth: Bcrypt password from sip_devices table
```

## Implementation Checklist

### ✅ Already Complete
- [x] ScamBlocker agent deployed on Railway
- [x] Agent accepts jobs with `agent_name='soniq-scamblocker'`
- [x] Scam pattern detection working
- [x] Real-time transcription & analysis
- [x] Database logging for scam reports

### 🔧 Database Setup Complete
- [x] `phone_numbers` table with `number_type='consumer'`
- [x] `call_flows` table with `flow_type='consumer'`
- [x] `sip_devices` table with `1001.slug` format
- [x] Functions to allocate DDI and create flows
- [x] Functions to create SIP devices

### 🚀 LiveKit SIP Trunk Configuration Needed

**Configure Inbound Trunk for Consumer DDIs:**

1. **Create Trunk** in LiveKit Dashboard:
   ```
   Name: Consumer ScamBlocker Trunk
   Type: Inbound
   Numbers: All consumer DDIs (query from phone_numbers)
   ```

2. **Configure Dispatch Rules:**
   - Match: `number_type='consumer'` from phone_numbers table
   - Action: Dispatch to agent `soniq-scamblocker`
   - Metadata:
     ```json
     {
       "agent_type": "scamblocker",
       "agent_name": "soniq-scamblocker",
       "scam_mode": "prescreen",
       "from_number": "${caller_id}",
       "to_number": "${ddi}",
       "org_id": "${org_id}",
       "call_flow_id": "${call_flow_id}"
     }
     ```

3. **Configure SIP Outbound** for device invitation:
   - After screening passes
   - Invite SIP device: `1001.{org_slug}@sip.domain.com`
   - Auth using credentials from `sip_devices` table

### 📝 Next Steps

1. **Configure LiveKit SIP Trunk** to:
   - Route `number_type='consumer'` to ScamBlocker agent
   - Query Supabase for org_id and call_flow_id
   - Invite SIP device after screening passes

2. **Update Drachtio** to:
   - Register SIP devices with `1001.slug` format
   - Handle INVITE from LiveKit after screening
   - Bridge calls to user's physical phone

3. **Test End-to-End:**
   - Call consumer DDI
   - Verify ScamBlocker answers
   - Verify scam detection works
   - Verify cleared calls connect to SIP device
   - Verify user's phone rings

4. **Dashboard Integration:**
   - Show assigned DDI in consumer dashboard
   - Display SIP credentials for softphone setup
   - Show call logs with scam screening results

## Environment Variables

### ScamBlocker Agent (Railway)
```bash
LIVEKIT_URL=wss://...
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
# API keys loaded from Supabase:
# - DEEPGRAM_API_KEY
# - OPENAI_API_KEY
```

### LiveKit SIP Trunk
```bash
SUPABASE_URL=... # For querying phone_numbers table
SUPABASE_ANON_KEY=... # Read-only access
```

## Summary

**The Flow:**
1. ✅ Call comes in to consumer DDI
2. ✅ Drachtio → LiveKit SIP Trunk
3. ✅ SIP Trunk creates room + dispatches ScamBlocker agent
4. ✅ Agent screens call for 30s
5. ⚠️ **Need to configure:** SIP Trunk invites SIP device after screening
6. ⚠️ **Need to configure:** Drachtio bridges call to user's phone

**Key Insight:** LiveKit SIP Trunk handles the orchestration, not custom code. We just need to configure the trunk rules to dispatch to the ScamBlocker agent and then invite the SIP device after screening passes.
