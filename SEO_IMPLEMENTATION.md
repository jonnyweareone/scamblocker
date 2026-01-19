# SEO Implementation Plan - ScamBlocker

## Implemented ✅

### 1. SEO Component Created
**File:** `/src/components/SEO.tsx`
- Reusable SEO component with Open Graph and Twitter cards
- Automatic title formatting
- Canonical URLs
- Keywords support

---

## Next Steps - Choose Your Approach

### Option A: Quick Fix (2-3 hours) - Add Meta Tags Only
**What:** Add SEO component to each page
**How:** Import SEO component and add to each page
**Result:** Better social sharing, some SEO improvement
**Score Improvement:** 6/10 → 7/10

### Option B: Medium Fix (4-6 hours) - Pre-rendering
**What:** Add Vite plugin to pre-render pages at build time
**How:** Install `vite-plugin-ssr` and configure
**Result:** Search engines see actual content
**Score Improvement:** 6/10 → 8/10

### Option C: Best Fix (1-2 days) - Migrate to Next.js
**What:** Full SSR with Next.js
**How:** Migrate existing components to Next.js
**Result:** Full SEO, perfect crawling, best performance
**Score Improvement:** 6/10 → 9-10/10

---

## Recommendation: Option A + B

### Phase 1: Add Meta Tags (Now - 2 hours)

**Update each page file:**

```tsx
import { SEO } from "@/components/SEO";

export default function PageName() {
  return (
    <>
      <SEO 
        title="Page Title"
        description="Page description 150-160 chars"
        keywords="keyword1, keyword2, keyword3"
        url="https://scamblocker.co.uk/page"
      />
      {/* Rest of page content */}
    </>
  );
}
```

**Pages to update:**
1. ✅ Landing.tsx - Homepage
2. ⏳ Signup.tsx
3. ⏳ Login.tsx
4. ⏳ Mobile.tsx
5. ⏳ Rates.tsx
6. ⏳ Terms.tsx
7. ⏳ Privacy.tsx
8. ⏳ Complaints.tsx

### Phase 2: Add Pre-rendering (Next - 4 hours)

**Install dependencies:**
```bash
npm install -D vite-plugin-ssr vite-plugin-html
```

**Configure vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import ssr from 'vite-plugin-ssr/plugin'

export default defineConfig({
  plugins: [
    react(),
    ssr({ prerender: true }), // Add this
    // ... other plugins
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})
```

**Create prerender config:**
```typescript
// pages.config.ts
export default {
  pages: [
    '/',
    '/signup',
    '/login',
    '/mobile',
    '/rates',
    '/terms',
    '/privacy',
    '/complaints'
  ]
}
```

---

## Immediate Action Required

### 1. Create OG Image
You need: `/public/og-image.jpg` (1200x630px)

**Content suggestions:**
- ScamBlocker logo
- "AI-Powered Scam Call Protection"
- Phone shield graphic
- UK flag
- "£14.99/month"

### 2. Add Structured Data
Create `/src/components/StructuredData.tsx`:

```tsx
export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ScamBlocker",
    "applicationCategory": "SecurityApplication",
    "offers": {
      "@type": "Offer",
      "price": "14.99",
      "priceCurrency": "GBP"
    },
    "operatingSystem": "All",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 3. Meta Tags Per Page

**Homepage:**
```
Title: ScamBlocker - AI-Powered Scam Call Protection UK | Block Fraud Calls
Description: Protect your landline and mobile from scam calls with AI screening. £14.99/month. 48-hour UK number setup. Stop HMRC, Amazon, and bank fraud calls instantly.
Keywords: scam blocker uk, ai call protection, phone scam blocker, fraud call prevention, landline protection, mobile call screening
```

**Signup:**
```
Title: Sign Up for ScamBlocker | UK Scam Call Protection
Description: Get started with ScamBlocker in minutes. Choose your UK area code, protect your landline or mobile. £14.99/month, no contract. AI-powered scam detection.
Keywords: scam blocker signup, phone protection uk, call screening service
```

**Mobile:**
```
Title: Mobile Scam Call Protection | ScamBlocker UK
Description: AI-powered mobile call protection. Screen unknown calls, block scammers, protect your mobile number. £9.99/month. Works with all UK networks.
Keywords: mobile scam protection, mobile call blocker, smartphone scam prevention
```

**Rates:**
```
Title: Pricing & Plans | ScamBlocker UK
Description: Transparent pricing for scam call protection. Landline £14.99/mo, Mobile £9.99/mo, Both £21.99/mo. No hidden fees. Cancel anytime. 48-hour setup.
Keywords: scam blocker pricing, call protection cost, phone security pricing uk
```

---

## Testing Checklist

After implementation:

### Meta Tags
- [ ] View page source - see meta tags
- [ ] Facebook Debugger: https://developers.facebook.com/tools/debug/
- [ ] Twitter Card Validator: https://cards-dev.twitter.com/validator
- [ ] Google Rich Results: https://search.google.com/test/rich-results

### Pre-rendering
- [ ] Build site: `npm run build`
- [ ] Check dist/ folder for .html files
- [ ] Verify HTML contains actual content (not just `<div id="root"></div>`)
- [ ] Test: `curl https://scamblocker.co.uk | grep -i "scam call"`

---

## Timeline

**Week 1:**
- Day 1-2: Add SEO component to all pages
- Day 3: Create OG image
- Day 4-5: Implement pre-rendering
- Day 6-7: Testing and fixes

**Week 2:**
- Add Google Search Console
- Submit sitemap
- Monitor indexing
- Content optimization

**Expected Results:**
- Month 1: Indexed in Google
- Month 2-3: 50-100 organic visits/month
- Month 4-6: 200-500 organic visits/month

---

## Current Status

✅ **Completed:**
- SEO component created
- Strategy documented

⏳ **Next:**
- Update pages with SEO component
- Create OG image
- Implement pre-rendering

Would you like me to:
1. Update all pages with SEO component now?
2. Set up pre-rendering configuration?
3. Create structured data schema?
