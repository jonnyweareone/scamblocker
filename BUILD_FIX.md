# ScamBlocker Frontend Build Fix

## Problem
Vercel build was failing with:
```
error TS2307: Cannot find module '@supabase/auth-helpers-nextjs'
error TS2307: Cannot find module 'next/headers'
error TS2307: Cannot find module 'next/server'
```

## Root Cause
The scamblocker frontend is a **Vite/React app** but had a Next.js API route mixed in:
- `/src/app/api/available-numbers/route.ts`

This API route was trying to use Next.js imports in a Vite project.

## Solution ✅
**Removed the API route** - it doesn't belong in the frontend!

The `/api/available-numbers` endpoint should be in the **SONIQ v2.2 backend** at:
- `/Users/davidsmith/Documents/GitHub/soniq-v22/src/app/api/available-numbers/route.ts`

Or as a Supabase Edge Function.

## Changes Made
```bash
# Removed the entire Next.js app directory
rm -rf /Users/davidsmith/Documents/GitHub/scamblocker/src/app

# Committed locally
git commit -m "Remove Next.js API route - should be in soniq-v22 backend"
```

## Next Steps
1. **Push the commit** to trigger new Vercel build
2. **Move the API endpoint** to soniq-v22 if needed
3. **Update frontend** to call the correct API URL

---

## Architecture Reminder

```
┌─────────────────────────────────────────┐
│  ScamBlocker Frontend (Vite/React)      │
│  Repo: scamblocker                      │
│  Deploy: Vercel                         │
│  - Landing pages                        │
│  - Signup flow                          │
│  - Settings UI                          │
│  - Dashboard                            │
└─────────────────────────────────────────┘
              │
              │ HTTP API calls
              ▼
┌─────────────────────────────────────────┐
│  SONIQ v2.2 Backend (Next.js)           │
│  Repo: soniq-v22                        │
│  Deploy: Vercel                         │
│  - API routes (/api/*)                  │
│  - Supabase Edge Functions              │
│  - Orchestrator webhook handler         │
└─────────────────────────────────────────┘
              │
              │ Database
              ▼
┌─────────────────────────────────────────┐
│  Supabase (dtosgubmmdqxbeirtbom)        │
│  - Shared tables (both B2B + consumer)  │
│  - phone_numbers, call_flows, etc.      │
└─────────────────────────────────────────┘
```

**Key Point:** ScamBlocker frontend is **just UI** - all logic is in soniq-v22 backend.
