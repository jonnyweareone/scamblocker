# Facebook Ads Landing Page - Implementation Complete

## What We Built

### New Landing Page: `/stop-scam-calls`

**Location:** `/src/pages/ad-landing/StopScamCalls.tsx`

**URL:** `https://scamblocker.com/stop-scam-calls`

---

## Key Features

### 1. **2-Step Lead Capture Form**

**Step 1:** "Who are you protecting?" (dropdown)
- Options: myself, parent, parents, grandparent, grandparents, spouse, other
- Auto-advances to Step 2 on selection

**Step 2:** Contact details
- Name (required)
- Email (required)  
- Phone (required)
- Optional: "I'd like to book a call" checkbox

### 2. **Value Offer Prominently Displayed**

```
Usually £24.99/month
NOW £14.99/month

Complete landline replacement + unlimited UK calls included

✓ AI-powered scam call blocking
✓ Unlimited calls to UK landlines & mobiles
✓ Keep your existing number
✓ No installation needed
```

**Value Exchange Messaging:**
- "Complete landline replacement" - not just a bolt-on
- "Unlimited UK calls" - replaces BT/VM landline
- "Save £10/month" - clear savings
- "One low monthly price" - no hidden fees

### 3. **Styling Matches Existing Site**

- Uses same color scheme (violet-600 to fuchsia-600 gradients)
- Reuses ScamBlocker logo component
- Same typography and spacing
- Consistent button styles
- Mobile-responsive design

### 4. **FAQ Section Reused**

Pulled from main Landing.tsx:
- 8 relevant FAQs focused on landline replacement
- Accordion component for clean UX
- Questions about contract, installation, number porting, etc.

---

## Database Setup

### New Table: `ad_leads`

**Migration file:** `/supabase/migrations/20260121_create_ad_leads_table.sql`

**Columns:**
- Form data: `protecting`, `name`, `email`, `phone`, `wants_call`
- Tracking: `source`, `landing_page`, UTM parameters
- Status management: `status`, `assigned_to`, `notes`
- Conversion tracking: `converted_to_order_id`, `converted_at`

**Features:**
- Indexes on email, phone, status, source
- Row Level Security enabled
- Public can INSERT (for form submissions)
- Authenticated users can SELECT/UPDATE (for admin)
- Auto-updated `updated_at` timestamp

---

## What You Need To Do

### 1. **Run the Database Migration**

```bash
cd /Users/davidsmith/Documents/GitHub/scamblocker
supabase db push
```

Or manually run the SQL in Supabase dashboard:
`/supabase/migrations/20260121_create_ad_leads_table.sql`

### 2. **Test Locally**

```bash
npm run dev
```

Navigate to: `http://localhost:5173/stop-scam-calls`

Test the form:
1. Select "My parent" from dropdown
2. Fill in contact details
3. Submit
4. Check Supabase `ad_leads` table

### 3. **Deploy to Production**

```bash
git add .
git commit -m "Add Facebook Ads landing page /stop-scam-calls"
git push origin main
```

Vercel will auto-deploy.

### 4. **Set Up Facebook Ad**

**Campaign Objective:** Traffic or Leads (test both)

**Ad Copy Suggestions:**

*Headline:*
"Stop Scam Calls Before They Reach You"

*Primary Text:*
"81% of scams happen by phone. ScamBlocker uses AI to screen unknown callers before your phone rings. Complete landline replacement with unlimited UK calls. Now £14.99/month (usually £24.99). No smartphone needed."

*Call to Action:*
"Learn More" or "Get Offer"

**Landing Page URL:**
```
https://scamblocker.com/stop-scam-calls
```

**Add UTM Parameters for Tracking:**
```
https://scamblocker.com/stop-scam-calls?utm_source=facebook&utm_medium=cpc&utm_campaign=stop_scam_calls&utm_content=variant_a
```

### 5. **Add Meta Pixel (Optional)**

If you want Meta Pixel tracking:

1. Get your Pixel ID from Facebook Business Manager
2. Add to `.env.local` and `.env.production`:
   ```
   VITE_META_PIXEL_ID=your_pixel_id_here
   ```
3. Import MetaPixel component in StopScamCalls.tsx:
   ```tsx
   import { MetaPixel } from "@/components/MetaPixel";
   
   // In component:
   <MetaPixel pixelId={import.meta.env.VITE_META_PIXEL_ID} />
   ```

---

## Lead Management

### View Leads in Supabase

1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Open `ad_leads` table
4. See all form submissions with:
   - Who they're protecting
   - Contact details
   - Whether they want a call
   - Timestamp

### Lead Statuses

- `new` - Just submitted
- `contacted` - You've reached out
- `qualified` - Good fit, interested
- `converted` - Signed up for service
- `disqualified` - Not a good fit

---

## Expected Performance

### CPL Target: £4-5

**Based on these assumptions:**
- CPC: £1.50-2.00
- Landing page conversion rate: 25-35%
- CPL: £4.50-8.00 initially
- CPL: £4.00-5.00 after optimization

### Conversion Funnel

1. **Ad Click** → Landing page (£1.50-2.00 CPC)
2. **Form Submit** → Lead captured (25-35% conversion)
3. **Call Booking** → Qualify lead (50% opt-in for calls)
4. **Sign Up** → Customer (target 30-40% close rate)

**Example:**
- 100 clicks @ £2.00 = £200 spend
- 30 leads @ £6.67 CPL
- 12 call bookings
- 4 customers @ £50 CPA

### Optimization Strategy

**Week 1-2:** Test both approaches
- Campaign A: Meta Lead Form (for comparison)
- Campaign B: Traffic → `/stop-scam-calls`

**Week 3+:** Scale winner
- Kill underperformer
- Increase budget on winner
- Test new ad creative
- A/B test landing page copy

---

## Files Created/Modified

### New Files:
- `/src/pages/ad-landing/StopScamCalls.tsx` - Landing page
- `/src/components/MetaPixel.tsx` - Meta Pixel component (optional)
- `/supabase/migrations/20260121_create_ad_leads_table.sql` - Database schema

### Modified Files:
- `/src/App.tsx` - Added route for `/stop-scam-calls`
- `/.env.local` - Added VITE_META_PIXEL_ID placeholder

---

## Next Steps

1. ✅ Run database migration
2. ✅ Test form locally
3. ✅ Deploy to production
4. ✅ Create Facebook Ad campaign
5. ✅ Monitor CPL in first 48 hours
6. ✅ Optimize based on results

---

## Questions?

The landing page is production-ready and matches your brand. 

**Key selling point:** It's not just scam blocking - it's a complete landline replacement that costs LESS than BT/Virgin while adding AI protection.

The value exchange is clear: Give us your details, get £10/month savings + unlimited calls + scam protection.

Ready to push live?
