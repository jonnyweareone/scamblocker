# ScamBlocker SEO Implementation Checklist

## ✅ Completed Before Crash

1. **SEO Component Created** - `/src/components/SEO.tsx`
   - Meta tags (title, description, keywords)
   - Open Graph tags (Facebook/LinkedIn)
   - Twitter Card tags
   - Canonical URLs
   - Geo-targeting for UK

2. **Structured Data Component** - `/src/components/StructuredData.tsx`
   - Organization schema
   - SoftwareApplication schema
   - Service schema
   - FAQ schema
   - Product/Pricing schema
   - Aggregate ratings

3. **Keyword Strategy Document** - `/KEYWORD_STRATEGY.md`
   - Primary keywords identified
   - Secondary keywords mapped
   - Long-tail opportunities
   - 24 blog post topics
   - New landing page strategy

---

## 🚀 Next Steps - Priority Order

### Phase 1: Add Meta Tags to Existing Pages (2-3 hours)

**Import components at top of each file:**
```tsx
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
```

**Add to component return (before other JSX):**
```tsx
return (
  <>
    <SEO 
      title="Page Title"
      description="Page description"
      keywords="custom, keywords, if, needed"
      url="https://scamblocker.co.uk/page-url"
    />
    <StructuredData type="homepage" />
    {/* Rest of page content */}
  </>
);
```

**Pages to update:**

- [ ] **Landing.tsx** (Homepage)
```tsx
<SEO 
  title="ScamBlocker - AI-Powered Scam Call Protection UK | Digital Landline"
  description="Protect your landline and mobile from scam calls with AI screening. Perfect for elderly protection. £14.99/month. Digital landline with UK area codes. Stop HMRC, bank & Amazon scams."
  keywords="scam blocker, digital landline, safe phone for elderly, prevent phone scams, call protection uk, ai call screening, elderly phone protection, virtual landline uk"
  url="https://scamblocker.co.uk"
/>
<StructuredData type="homepage" />
```

- [ ] **Signup.tsx**
```tsx
<SEO 
  title="Sign Up for ScamBlocker | Digital Landline & Scam Call Protection"
  description="Get started with ScamBlocker in minutes. Choose your UK area code, protect landline or mobile. AI-powered scam protection for elderly & families. £14.99/month."
  keywords="scam blocker signup, digital landline uk, phone protection registration, elderly phone service"
  url="https://scamblocker.co.uk/signup"
/>
<StructuredData type="product" />
```

- [ ] **Mobile.tsx**
```tsx
<SEO 
  title="Mobile Scam Call Protection | AI Call Screening for Smartphones"
  description="Protect your mobile from scam calls with AI screening. Block HMRC, bank & Amazon scams on your smartphone. £9.99/month. Works with all UK networks."
  keywords="mobile scam protection, mobile call blocker, smartphone scam blocker, ai call screening mobile"
  url="https://scamblocker.co.uk/mobile"
/>
<StructuredData type="product" />
```

- [ ] **Rates.tsx**
```tsx
<SEO 
  title="Pricing & Plans | ScamBlocker Digital Landline & Call Protection"
  description="Transparent pricing: Landline £14.99/mo, Mobile £9.99/mo, Both £21.99/mo. No hidden fees. Digital landline with scam protection. 48-hour setup. Cancel anytime."
  keywords="scam blocker pricing, digital landline cost, call protection pricing uk, phone security prices"
  url="https://scamblocker.co.uk/rates"
/>
<StructuredData type="product" />
```

- [ ] **Login.tsx**
```tsx
<SEO 
  title="Login | ScamBlocker Account Dashboard"
  description="Access your ScamBlocker dashboard to manage call protection, view blocked scams, and configure your digital landline settings."
  keywords="scamblocker login, account dashboard, manage call protection"
  url="https://scamblocker.co.uk/login"
/>
```

- [ ] **Terms.tsx**
```tsx
<SEO 
  title="Terms of Service | ScamBlocker UK"
  description="Read ScamBlocker's terms of service for our AI-powered call protection and digital landline services in the UK."
  url="https://scamblocker.co.uk/terms"
/>
```

- [ ] **Privacy.tsx**
```tsx
<SEO 
  title="Privacy Policy | ScamBlocker - GDPR Compliant"
  description="ScamBlocker's privacy policy. Learn how we protect your data. 100% UK-based, GDPR compliant phone protection service."
  url="https://scamblocker.co.uk/privacy"
/>
```

- [ ] **Complaints.tsx**
```tsx
<SEO 
  title="Complaints Procedure | ScamBlocker UK"
  description="ScamBlocker complaints procedure. We're committed to excellent service. Contact us if you have any concerns."
  url="https://scamblocker.co.uk/complaints"
/>
```

---

### Phase 2: Create New Landing Pages (4-6 hours)

Create these new pages to target high-value keywords:

- [ ] **/digital-landline** (NEW PAGE - Critical)
  - Target: "digital landline uk" (5,000 searches/month)
  - Copy: 1,200+ words about digital landlines
  - Include: Benefits, how it works, comparison table, FAQ
  - CTA: Sign up for digital landline

- [ ] **/elderly-phone-protection** (NEW PAGE - Critical)
  - Target: "safe phone for elderly" (8,000 searches/month)
  - Copy: 1,500+ words targeting caregivers/families
  - Include: Why elderly are targeted, protection features, setup guide
  - CTA: Protect your parents today

- [ ] **/prevent-phone-scams** (NEW PAGE - High Priority)
  - Target: "prevent phone scams" (12,000 searches/month)
  - Copy: 2,000+ words educational content
  - Include: Common scam types, warning signs, protection methods
  - CTA: Get automatic protection

- [ ] **/how-it-works** (NEW PAGE - Medium Priority)
  - Target: "how does call screening work"
  - Copy: 1,000+ words with diagrams
  - Include: Technology explanation, call flow, AI features
  - CTA: See it in action

---

### Phase 3: Blog Setup & First 4 Posts (8-12 hours)

**Setup Blog Infrastructure:**

- [ ] Create `/blog` route in App.tsx
- [ ] Create blog listing page component
- [ ] Create blog post template component
- [ ] Add blog to sitemap.xml
- [ ] Add blog link to footer navigation

**Write First 4 Posts (High Priority):**

1. [ ] "The Ultimate Guide to Identifying Phone Scams in 2026"
   - 2,500+ words
   - Target: "how to identify phone scams"
   - Include: 15+ scam types, warning signs, examples

2. [ ] "What is a Digital Landline? Complete Guide for UK Users"
   - 2,000+ words
   - Target: "what is digital landline"
   - Include: Definition, benefits, how it works, vs traditional

3. [ ] "7 Warning Signs Your Elderly Parent is Being Targeted"
   - 1,800 words
   - Target: "elderly phone scams"
   - Emotional, shareable content

4. [ ] "HMRC Scam Calls: How to Spot and Stop Them"
   - 1,500 words
   - Target: "hmrc scam calls" (30,000 searches/month!)
   - High-volume keyword capture

---

### Phase 4: Pre-rendering Setup (4-6 hours)

**Install Dependencies:**
```bash
npm install -D vite-plugin-ssr @vitejs/plugin-react-swc
```

**Update vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ssr from 'vite-plugin-ssr/plugin'

export default defineConfig({
  plugins: [
    react(),
    ssr({ 
      prerender: {
        partial: false // Prerender all pages
      }
    })
  ]
})
```

**Create renderer files:**
- [ ] `_default.page.server.tsx` - Server-side rendering
- [ ] `_default.page.client.tsx` - Client-side hydration
- [ ] Update route structure for SSR

**Test Pre-rendering:**
```bash
npm run build
# Check dist/ folder for .html files with content
```

---

### Phase 5: Technical SEO Improvements (2-3 hours)

- [ ] **Create OG Image** (`/public/og-image.jpg`)
  - Size: 1200x630px
  - Content: ScamBlocker logo, "AI-Powered Scam Protection", phone shield graphic
  
- [ ] **Add Favicon variations**
  - favicon.ico (16x16, 32x32)
  - apple-touch-icon.png (180x180)
  - android-chrome-192x192.png
  - android-chrome-512x512.png

- [ ] **Update index.html** with meta tags
  ```html
  <meta name="theme-color" content="#7c3aed">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  ```

- [ ] **Add security headers** in vercel.json
  ```json
  {
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          }
        ]
      }
    ]
  }
  ```

- [ ] **Performance optimizations**
  - Image lazy loading
  - Code splitting
  - Font preloading
  - Critical CSS inlining

---

### Phase 6: Google Search Console (30 mins)

- [ ] Add DNS TXT record for verification
  ```
  Type: TXT
  Name: @
  Value: google-site-verification=GWD46pRgpviRlwcVAmzjFmRdZ94hvC2QQV5
  ```

- [ ] Verify domain in Search Console
- [ ] Submit sitemap.xml
- [ ] Request indexing for key pages
- [ ] Set up email alerts for crawl errors

---

### Phase 7: Content Optimization (Ongoing)

**Week 1-2:**
- [ ] Write blog posts 1-4
- [ ] Create digital-landline page
- [ ] Create elderly-phone-protection page

**Week 3-4:**
- [ ] Write blog posts 5-8
- [ ] Create prevent-phone-scams page
- [ ] Create how-it-works page

**Month 2:**
- [ ] Write 8 more blog posts
- [ ] Internal linking strategy
- [ ] Update old posts with new links

**Month 3:**
- [ ] Write final 8 blog posts
- [ ] Create comparison pages
- [ ] Build resource library

---

## 📊 Success Metrics

**Month 1 Targets:**
- [ ] All pages have meta tags
- [ ] Pre-rendering working
- [ ] Google Search Console verified
- [ ] 4-8 blog posts published
- [ ] 2-3 new landing pages live

**Month 2 Targets:**
- [ ] 50-100 organic visits/month
- [ ] 10-20 pages indexed
- [ ] 12-16 blog posts total
- [ ] Featured snippet for 1-2 keywords

**Month 3 Targets:**
- [ ] 200-500 organic visits/month
- [ ] 20-30 pages indexed
- [ ] 20-24 blog posts total
- [ ] Ranking top 20 for 10+ keywords
- [ ] Featured snippets for 3-5 keywords

**Month 6 Targets:**
- [ ] 1,000+ organic visits/month
- [ ] Ranking top 10 for target keywords
- [ ] 50+ backlinks
- [ ] £2,000-5,000 MRR from organic traffic

---

## 🎯 Quick Wins (Do These First!)

1. **Add SEO component to all pages** (2 hours)
2. **Create /digital-landline page** (2 hours)
3. **Create /elderly-phone-protection page** (2 hours)
4. **Write HMRC scam blog post** (2 hours)
5. **Submit to Google Search Console** (30 mins)

**Total: 8.5 hours for massive SEO improvement**

---

## 💡 Pro Tips

**Blog Post Writing:**
- Use Grammarly for editing
- Include at least 3 images per post
- Add internal links to product pages
- End with strong CTA
- Update meta description
- Include FAQ section

**Keyword Research:**
- Use Google Autocomplete
- Check "People Also Ask"
- Use AnswerThePublic.com
- Spy on competitors with SEMrush

**Link Building:**
- Submit to UK directories
- Guest post on tech blogs
- Get listed on comparison sites
- Press release for launch
- Reach out to Age UK, Citizens Advice

---

## 🚨 Critical Reminders

1. **Every new page needs SEO component**
2. **Every blog post needs structured data**
3. **Update sitemap after new pages**
4. **Internal link from old posts to new**
5. **Monitor Search Console weekly**
6. **Track rankings monthly**
7. **Update content quarterly**

---

**Ready to start? Begin with Phase 1 - Add meta tags to all existing pages!**
