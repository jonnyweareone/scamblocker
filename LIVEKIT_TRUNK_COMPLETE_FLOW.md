# COMPLETE Consumer DDI → ScamBlocker Flow with Whitelist & Monitoring

## Critical Architecture Details

**Key Insight:** This is NOT a simple "screen and transfer" system. It's a sophisticated multi-layer protection platform with:

1. **Whitelist bypass** - Family/friends skip ALL screening
2. **Two-phase AI operation** - Initial screening → Silent monitoring
3. **Context preservation** - Agent remembers who caller is during monitoring
4. **Payment protection** - Intervention if financial requests detected mid-call

---

## Complete Call Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                  INCOMING CALL TO CONSUMER DDI                       │
│                    (e.g., +442046283347)                             │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                     LIVEKIT SIP TRUNK                                │
│  - Receives inbound call to DDI                                     │
│  - Creates new LiveKit room: "consumer-{call_id}"                   │
│  - Room metadata includes:                                           │
│    * from_number: Caller's phone number                             │
│    * to_number/ddi: Consumer's DDI                                  │
│    * agent_type: 'scamblocker'                                      │
│    * agent_name: 'soniq-scamblocker'                                │
│    * org_id: Consumer org UUID                                      │
│    * scam_mode: 'prescreen'                                         │
│  - Dispatches agent to room (agent joins automatically)             │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│              SCAMBLOCKER AGENT - PHASE 1: SCREENING                  │
│  Location: /Users/davidsmith/Documents/GitHub/soniq-scamblocker     │
│  Deployed: Railway                                                   │
│                                                                      │
│  Agent is ALREADY in the room (dispatched by LiveKit)               │
│                                                                      │
│  1. ⚡ FIRST ACTION: Check if from_number is in whitelist           │
│     └─ If WHITELISTED → Skip to Step 7 (instant connect)            │
│                                                                      │
│  2. Answers with AI voice (Athena - British female)                 │
│  3. Says: "Hello, thank you for calling. Before I connect you,      │
│     may I ask who's calling and what this is regarding?"            │
│  4. Engages caller for up to 30-45 seconds                          │
│  5. Real-time transcription & pattern matching:                     │
│     - Urgency/threats                                               │
│     - Money requests                                                │
│     - Info requests (SSN, bank details)                             │
│     - Impersonation (IRS, bank, HMRC, etc.)                         │
│     - Pressure tactics                                              │
│  6. Decision made:                                                  │
│     ├─ BLOCK (≥70% scam confidence)                                │
│     ├─ SUSPICIOUS (50-69% confidence)                               │
│     └─ ALLOW (<50% confidence)                                      │
│                                                                      │
│  7. ⚡ CRITICAL POINT: Agent stays in room for monitoring           │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
         ┌──────────────────┐  ┌──────────────────────────────────┐
         │   SCAM DETECTED   │  │   CALL CLEARED                    │
         │   (Score ≥ 70%)   │  │   (Score < 70%)                   │
         └──────────────────┘  └──────────────────────────────────┘
                    ↓                   ↓
         ┌──────────────────┐  ┌──────────────────────────────────┐
         │ 1. Log to DB     │  │ Agent says: "Thank you [Name].   │
         │ 2. Say "This     │  │ I'll connect you now"            │
         │    appears to be │  │                                   │
         │    a scam call"  │  │ LiveKit orchestrates:             │
         │ 3. Terminate     │  │ - Tells Drachtio to invite SIP    │
         │    call          │  │   device to room                  │
         │ 4. Send alert to │  │ - SIP URI: 1001.{slug}@sip.domain│
         │    family        │  │                                   │
         │ 5. Agent leaves  │  │ ⚡ Agent STAYS in room            │
         └──────────────────┘  └──────────────────────────────────┘
                                              ↓
                               ┌──────────────────────────────────┐
                               │  DRACHTIO INVITES SIP DEVICE     │
                               │  TO LIVEKIT ROOM                 │
                               │                                   │
                               │  sip:1001.orgslug@sip.domain     │
                               │                                   │
                               │  User's phone rings!              │
                               └──────────────────────────────────┘
                                              ↓
                               ┌──────────────────────────────────┐
                               │  USER ANSWERS                    │
                               │                                   │
                               │  Now THREE parties in room:      │
                               │  1. Caller (external PSTN)        │
                               │  2. Protected person (SIP device) │
                               │  3. ScamBlocker Agent (silent)    │
                               └──────────────────────────────────┘
                                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│         SCAMBLOCKER AGENT - PHASE 2: SILENT MONITORING              │
│                                                                      │
│  Agent is STILL in room but operating differently:                  │
│                                                                      │
│  Mode: Silent Listener                                              │
│  - Does NOT speak unless fraud detected                             │
│  - Continues transcribing BOTH audio streams:                       │
│    * Caller's voice                                                 │
│    * Protected person's voice                                       │
│  - Monitors for context change or new patterns                      │
│  - Preserves context from screening phase                           │
│    (e.g., "This is Johnny about hair appointment")                  │
│                                                                      │
│  ⚡ INTERVENTION TRIGGERS:                                           │
│  If ANY of these detected during live call:                         │
│  • Payment request ("gift card", "bank transfer", "send money")     │
│  • Banking info request ("account number", "sort code", "PIN")      │
│  • Remote access ("TeamViewer", "AnyDesk", "remote control")        │
│  • Pressure tactics ("do it now", "don't tell anyone")              │
│  • Topic shift (started as hair appointment, now asking for money)  │
│                                                                      │
│  ON DETECTION:                                                      │
│  1. Agent INTERRUPTS call                                           │
│  2. Mutes caller (or terminates if severe)                          │
│  3. Speaks to protected person:                                     │
│     "I'm sorry to interrupt, but this call has shown signs          │
│      of fraudulent activity. I'm going to end it now."             │
│  4. Logs incident to database                                       │
│  5. Sends URGENT alert to emergency contacts                        │
│  6. Terminates call if payment blocker triggered                    │
│                                                                      │
│  NORMAL CALL COMPLETION:                                            │
│  - If no fraud detected for 30-60 seconds, agent confidence high    │
│  - Agent quietly leaves room                                        │
│  - Call continues as normal between caller and protected person     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## LiveKit Orchestration Details

### How LiveKit Controls Everything

**LiveKit SIP Trunk is the orchestrator** - it handles all call routing:

```
1. DDI receives call
2. LiveKit creates room
3. LiveKit dispatches agent (Railway agent auto-joins)
4. Agent makes decision
5. LiveKit tells Drachtio: "invite SIP device to room"
6. Drachtio sends INVITE to user's phone
7. User joins room
8. All parties now in same LiveKit room
9. Agent stays and monitors
```

### LiveKit SIP Trunk Configuration

```json
{
  "trunk_id": "consumer-scamblocker-trunk",
  "type": "inbound",
  "rules": [
    {
      "rule_id": "consumer-ddi-screening",
      "match": {
        "ddi_pattern": "^\\+44.*",
        "db_check": {
          "query": "SELECT org_id, call_flow_id FROM phone_numbers WHERE number = $ddi AND number_type = 'consumer' AND status = 'active'",
          "source": "supabase"
        }
      },
      "action": {
        "type": "create_room_and_dispatch",
        "room_name": "consumer-${call_id}",
        "dispatch_agent": {
          "agent_name": "soniq-scamblocker",
          "metadata": {
            "agent_type": "scamblocker",
            "agent_name": "soniq-scamblocker",
            "scam_mode": "prescreen",
            "from_number": "${caller_id}",
            "to_number": "${ddi}",
            "org_id": "${org_id_from_query}",
            "call_flow_id": "${call_flow_id_from_query}"
          }
        },
        "sip_outbound_config": {
          "enabled": true,
          "on_agent_decision": "allow",
          "invite_sip_device": {
            "uri_template": "sip:1001.${org_slug}@${sip_domain}",
            "lookup_org_slug": {
              "query": "SELECT slug FROM orgs WHERE id = $org_id",
              "source": "supabase"
            }
          }
        }
      }
    }
  ]
}
```

### Key Points

1. **LiveKit creates the room** - not Drachtio, not custom code
2. **LiveKit dispatches the agent** - agent auto-joins room
3. **LiveKit orchestrates SIP invite** - after agent decision
4. **Drachtio is just the SIP gateway** - it doesn't make routing decisions
5. **Agent stays in room for monitoring** - doesn't leave after allow decision

---

## Database Schema for Routing

### phone_numbers Table
```sql
CREATE TABLE phone_numbers (
  id UUID PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES orgs(id),
  number TEXT NOT NULL UNIQUE,           -- E.164: +442046283347
  country_code TEXT NOT NULL,            -- +44
  number_type TEXT NOT NULL,             -- 'consumer' = routes to ScamBlocker
  call_flow_id UUID REFERENCES call_flows(id),
  status TEXT NOT NULL DEFAULT 'active',
  capabilities JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_phone_numbers_routing 
ON phone_numbers(number, number_type, status) 
WHERE status = 'active';
```

### consumer_whitelist Table
```sql
CREATE TABLE consumer_whitelist (
  id UUID PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES orgs(id),
  phone_number TEXT NOT NULL,            -- E.164 format
  contact_name TEXT,
  relationship TEXT,                     -- 'family', 'friend', 'doctor', etc.
  trust_level TEXT NOT NULL DEFAULT 'trusted',
  added_by UUID REFERENCES auth.users(id),
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_called_at TIMESTAMPTZ,
  call_count INTEGER DEFAULT 0
);

CREATE INDEX idx_consumer_whitelist_lookup 
ON consumer_whitelist(org_id, phone_number);
```

### sip_devices Table
```sql
CREATE TABLE sip_devices (
  id UUID PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES orgs(id),
  org_user_id UUID REFERENCES auth.users(id),
  sip_username TEXT NOT NULL UNIQUE,     -- 1001.{org_slug}
  sip_password_hash TEXT NOT NULL,       -- Bcrypt for Drachtio
  label TEXT,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## ScamBlocker Agent Behavior

### Agent Accepts Jobs

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

### Phase 1: Screening Mode

```python
async def _run_prescreen(self):
    # Check whitelist FIRST
    if await self._check_whitelist():
        await self._connect_immediately()
        return
    
    # Create screening agent
    agent = Agent(
        instructions="""You are a call screener. Briefly engage the caller.
        
        Ask them:
        1. Who they are calling from (company/organization)
        2. The purpose of their call
        3. If they have a reference number
        
        Be polite and professional. Listen for:
        - Pressure tactics
        - Urgency ("act now", "final notice")
        - Money requests
        - Information requests (bank details, SSN)
        - Threats or impersonation
        
        After 30 seconds, make a decision:
        - ALLOW if legitimate
        - BLOCK if suspected scam
        - SUSPICIOUS if unsure
        """,
        voice="aura-athena-en"
    )
    
    # Engage caller for up to 30 seconds
    await self._screening_conversation(agent)
    
    # Agent makes decision but STAYS in room
    decision = await self._analyze_and_decide()
    
    if decision == "ALLOW":
        await self._handle_allow()
        # ⚡ Agent does NOT leave - switches to monitoring mode
        await self._run_monitor()
    elif decision == "BLOCK":
        await self._handle_block()
        # Agent leaves after blocking
    else:  # SUSPICIOUS
        await self._handle_suspicious()
        # Agent stays and monitors more closely
        await self._run_monitor(enhanced=True)
```

### Phase 2: Silent Monitoring Mode

```python
async def _run_monitor(self, enhanced=False):
    """Silent listener mode - only interrupt on fraud detection"""
    logger.info("🔍 Entering silent monitoring mode...")
    
    # Store screening context
    caller_context = {
        "name": self.scam_ctx.caller_name,
        "reason": self.scam_ctx.call_reason,
        "initial_score": self.scam_ctx.scam_confidence
    }
    
    # Set agent to silent mode
    self.session.set_silent_mode(True)
    
    # Continue transcribing BOTH streams
    while self._running:
        transcript = await self._get_transcript()
        
        # Check for fraud patterns in live call
        fraud_detected = await self._check_live_fraud_patterns(
            transcript,
            caller_context
        )
        
        if fraud_detected:
            # INTERVENTION
            await self._interrupt_call(fraud_detected)
            break
        
        # Check for payment requests
        if await self._detect_payment_request(transcript):
            await self._trigger_payment_blocker()
            break
        
        # If call stable for 60s, leave
        if time.time() - self.connection_start > 60 and not enhanced:
            logger.info("✅ Call appears legitimate, leaving monitoring")
            break
    
    await self._cleanup()
```

### Fraud Detection During Live Call

```python
LIVE_MONITORING_PATTERNS = {
    "payment_request": [
        "gift card", "wire transfer", "bank transfer", "send money",
        "western union", "bitcoin", "cryptocurrency", "cash app",
        "venmo", "paypal", "payment", "pay now"
    ],
    "banking_info": [
        "account number", "sort code", "routing number", "PIN",
        "security code", "CVV", "card number", "online banking"
    ],
    "remote_access": [
        "teamviewer", "anydesk", "remote desktop", "remote access",
        "remote control", "download this", "install software"
    ],
    "topic_shift": [
        # Detected if topic changes from screening context
        # e.g., started as "hair appointment" now asking for money
    ]
}

async def _interrupt_call(self, fraud_type):
    """Interrupt live call when fraud detected"""
    
    # Mute caller first
    await self.lk_api.mute_participant(self.caller_track_id)
    
    # Speak to protected person only
    await self.session.say(
        "I'm sorry to interrupt. This call has shown signs of "
        f"{fraud_type}. For your protection, I'm ending this call now.",
        target_participant=self.protected_person_id
    )
    
    # Log incident
    await self._log_fraud_intervention(fraud_type)
    
    # Alert emergency contacts
    await self._send_urgent_alert(fraud_type)
    
    # Terminate call
    await self.lk_api.room.delete_room(self.ctx.room.name)
```

---

## What Needs to Be Configured

### ✅ Already Complete
- [x] ScamBlocker agent deployed on Railway
- [x] Agent accepts jobs with `agent_name='soniq-scamblocker'`
- [x] Scam pattern detection working
- [x] Real-time transcription & analysis
- [x] Database schema complete
- [x] SIP device format (1001.slug) defined

### 🚀 LiveKit SIP Trunk Configuration Needed

1. **Configure Inbound Trunk** in LiveKit Dashboard
   - Match: `number_type='consumer'` from phone_numbers table
   - Action: Create room + dispatch agent
   - Query Supabase for org_id and call_flow_id

2. **Configure SIP Outbound** for user invitation
   - After agent allows call
   - Invite SIP device: `1001.{org_slug}@sip.domain.com`
   - Drachtio handles SIP INVITE

3. **Agent Monitoring Mode**
   - Update agent to NOT leave after ALLOW
   - Implement silent monitoring mode
   - Add live fraud pattern detection
   - Add payment blocker logic

### 📋 Drachtio Configuration

Drachtio needs to:
- Register SIP devices with `1001.slug` format
- Accept INVITE from LiveKit for user connection
- Handle SIP authentication
- Bridge call to user's physical phone

---

## Summary

**The Key Differences from Standard Call Routing:**

1. **LiveKit orchestrates everything** - not Drachtio
2. **Agent is dispatched TO the room** by LiveKit
3. **Agent stays in room for monitoring** after allow
4. **Whitelist bypass** - trusted callers skip screening
5. **Two-phase operation** - screening then monitoring
6. **Context preservation** - agent remembers initial conversation
7. **Live intervention** - agent can interrupt mid-call

**The Flow:**
```
DDI → LiveKit → Creates Room + Dispatches Agent → Agent Screens → 
LiveKit Invites User (via Drachtio) → Agent Monitors Silently → 
Interrupts Only If Fraud Detected
```

This is NOT a simple "answer and transfer" - it's an ongoing protective presence throughout the call.
