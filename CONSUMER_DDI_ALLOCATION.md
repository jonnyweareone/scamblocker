# Consumer DDI Allocation & Routing System

## Overview
Complete implementation of DDI (Direct Dial-In) allocation for ScamBlocker consumer accounts with automatic routing to the Railway consumer agent for AI screening.

## Architecture

### Database Structure

```
┌─────────────────┐
│ number_inventory│ (Available DDI pool)
│ - e164          │
│ - status        │
│ - allocated_to  │
└────────┬────────┘
         │ allocate
         ▼
┌─────────────────┐
│ phone_numbers   │ (Allocated DDIs)
│ - number        │
│ - org_id        │
│ - number_type   │ = 'consumer' ← Routes to Railway agent
│ - call_flow_id  │ ────┐
└─────────────────┘     │
                         │ links to
         ┌───────────────┘
         ▼
┌─────────────────┐
│ call_flows      │ (Consumer call flow)
│ - flow_type     │ = 'consumer'
│ - entrypoint    │ = 'ai_screening'
│ - workflow_steps│ = [ai_screening → forward_to_device]
└────────┬────────┘
         │ uses
         ▼
┌─────────────────┐
│ sip_devices     │ (User's phone)
│ - sip_username  │ = '1001.orgslug'
│ - sip_password  │
│ - org_id        │
└─────────────────┘
```

### Routing Flow

```
Incoming Call to DDI
    ↓
phone_numbers table
    ↓ (number_type='consumer')
Railway Consumer Agent
    ↓
call_flows (flow_type='consumer')
    ↓ Step 1: AI Screening
ScamBlocker AI
    ↓ (if approved)
    ↓ Step 2: Forward to Device
sip_devices
    ↓
User's Phone (1001.orgslug)
    ↓
Answer!
```

## Components Created

### 1. API Endpoint: `/api/available-numbers`
**Purpose:** Fetch available DDIs from number inventory pool

**Request:**
```
GET /api/available-numbers?prefix=0208
```

**Response:**
```json
{
  "numbers": [
    {
      "id": "uuid",
      "e164": "+442089999999",
      "prefix": "0208",
      "area_name": "London",
      "monthly_cost_gbp": 1.50
    }
  ],
  "grouped": {
    "London": [...],
    "Manchester": [...]
  },
  "total": 9
}
```

### 2. Database Function: `allocate_consumer_ddi()`
**Purpose:** Allocate DDI to consumer org and create/link SIP device

**Parameters:**
- `p_org_id`: Consumer org UUID
- `p_number_inventory_id`: Selected number from pool
- `p_user_id`: User UUID for SIP device
- `p_route_type`: 'consumer' (routes to Railway agent)

**Creates:**
1. ✅ Updates `number_inventory` (marks as allocated)
2. ✅ Creates `sip_devices` entry (1001.orgslug format)
3. ✅ Creates `phone_numbers` entry (with number_type='consumer')

**Returns:**
```json
{
  "success": true,
  "phone_number_id": "uuid",
  "sip_device_id": "uuid",
  "sip_username": "1001.customer-abc123",
  "sip_password": "generated_password",
  "e164": "+442089999999",
  "route_type": "consumer"
}
```

### 3. Database Function: `create_default_consumer_flow()`
**Purpose:** Create default ScamBlocker AI screening call flow

**Creates:**
```sql
call_flows (
  flow_type: 'consumer',
  entrypoint: 'ai_screening',
  workflow_steps: [
    {
      type: 'ai_screening',
      config: {
        screening_mode: 'adaptive',
        hard_guardrails: true,
        fraud_detection: true,
        intro_ai: true,
        live_monitoring: true
      }
    },
    {
      type: 'forward_to_device',
      config: {
        device_type: 'sip',
        ring_timeout: 30
      }
    }
  ],
  settings: {
    route_type: 'consumer',
    agent_endpoint: 'railway'
  }
)
```

### 4. Updated Function: `create_consumer_account_quick()`
**Now includes:**
- Creates default consumer call flow
- Allocates selected DDI (if provided)
- Links DDI to call flow
- Creates SIP device with credentials

**New Parameters:**
- `p_selected_number_id`: UUID of selected number from inventory

## SIP Credentials Format

### Username Pattern
```
1001.{org_slug}
```

**Examples:**
- `1001.john-smith-a3f9b2`
- `1001.jane-doe-7k2m5p`

### Authentication
- **Password:** Bcrypt hashed (Drachtio compatible)
- **Storage:** `sip_devices.sip_password_hash`
- **Lookup:** Drachtio queries by `sip_username`

## Quick Setup UI Flow

### Step 1: Choose Protection Type
- Landline (£14.99/mo)
- Mobile (£9.99/mo)
- Both (£21.99/mo - Save £2.99)

### Step 2: Protection Details
**If Landline selected:**

1. **Number Choice:**
   - ○ Get a new ScamBlocker number
   - ○ Keep my existing number (port it)

2. **If "New Number" selected:**
   - Shows list of available DDIs from inventory
   - Grouped by area name (London, Manchester, etc.)
   - User selects preferred number
   - ✅ Automatically allocated on completion

3. **If "Port Number" selected:**
   - Collects current number
   - Collects current provider
   - Creates port request

4. **Shipping Address:**
   - For phone adapter delivery

### Step 3: Confirmation
- Reviews selections
- Clicks "Activate Protection"
- ✅ Consumer org created
- ✅ Call flow created (AI screening → forward)
- ✅ DDI allocated (if new number)
- ✅ SIP device created (1001.slug)
- ✅ Order created (if shipping needed)
- ✅ Redirects to dashboard

## What Gets Created on Completion

```
✅ Consumer org (parent: SONIQ master)
✅ Org membership (user → owner)
✅ Consumer settings (all protections enabled)
✅ Portal user entry
✅ Referral code
✅ Call flow (consumer type, AI screening)
✅ Phone number (DDI with consumer routing)
✅ SIP device (1001.slug credentials)
✅ Order record (if shipping required)
```

## Drachtio Integration

### SIP Registration
```
Endpoint: sip.scamblocker.co.uk:5060
Username: 1001.customer-abc123
Password: [bcrypt_hash]
```

### Call Routing
1. Drachtio receives INVITE to DDI
2. Looks up DDI in `phone_numbers` table
3. Sees `number_type='consumer'`
4. Routes to **Railway consumer agent**
5. Agent loads `call_flows` for that org
6. Executes AI screening workflow
7. If approved, forwards to SIP device (1001.slug)

## Railway Consumer Agent Configuration

The consumer agent needs to:
1. Listen for number_type='consumer' calls
2. Load call_flow by org_id
3. Execute workflow_steps in order:
   - AI screening with ScamBlocker logic
   - Forward approved calls to SIP device
4. Log all interactions to consumer_call_logs

## Testing Checklist

- [ ] Can fetch available numbers from API
- [ ] Can select number in Quick Setup UI
- [ ] Quick Setup creates consumer org
- [ ] Call flow created with correct type ('consumer')
- [ ] DDI allocated from inventory
- [ ] SIP device created (1001.slug format)
- [ ] DDI linked to call flow
- [ ] Can register SIP phone with credentials
- [ ] Incoming call routes to Railway consumer agent
- [ ] AI screening workflow executes
- [ ] Call forwards to SIP device after screening

## Next Steps

1. **Configure Railway Consumer Agent** to handle number_type='consumer' routing
2. **Test end-to-end call flow** from DDI → AI screening → SIP device
3. **Add monitoring** for consumer call flows
4. **Build dashboard** to show assigned DDI and call logs
5. **Implement number porting** workflow for "Keep existing number"

## Benefits

✅ **Automatic routing** - DDI automatically routes to consumer agent
✅ **SIP credentials** - 1001.slug format ready for Drachtio
✅ **AI screening** - Default flow includes all ScamBlocker protections
✅ **Scalable** - Can allocate multiple DDIs per org if needed
✅ **SONIQ integration** - Uses existing user authentication
✅ **No manual config** - Everything created automatically
