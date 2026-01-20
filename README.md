# 🛡️ ScamBlocker

**AI-Powered Scam Call Protection for UK Families**

Stop scammers before they reach your loved ones. ScamBlocker uses AI to screen unknown calls in real-time, blocking HMRC scams, fake bank alerts, and fraud before they can manipulate vulnerable people.

🌐 **Live Site:** [https://scamblocker.co.uk](https://scamblocker.co.uk)

[![License](https://img.shields.io/badge/license-Proprietary-red)]()
[![Status](https://img.shields.io/badge/status-Production-brightgreen)]()

---

## 🎯 The Problem

- **47%** of UK landline calls are scams
- **78%** of elderly people are targeted  
- **£10,000** average loss per victim

Traditional call blocking doesn't work because scammers constantly change numbers. We needed something smarter.

---

## 🚀 The Solution

ScamBlocker's **5-Layer Protection System**:

1. **🤍 Whitelist** - Trusted callers skip screening
2. **🔍 Trust Score** - Number verification & spam detection
3. **🎙️ Voice Screen** - Your voice answers, not your loved one
4. **🧠 AI Analysis** - Real-time pressure tactic detection
5. **📊 Live Monitor** - Ongoing protection during calls

---

## ✨ Features

- ✅ **AI Voice Screening** - Catches manipulation tactics
- ✅ **Digital Landline** - UK area codes (020, 0161, 01483, etc.)
- ✅ **Family Dashboard** - Monitor protection remotely
- ✅ **Mobile & Landline** - Works with both
- ✅ **Zero Setup** - Ready in 5 minutes
- ✅ **UK-Based** - GDPR compliant, local support

---

## 🏗️ Tech Stack

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Vite
- React Router

**Backend:**
- Supabase (PostgreSQL)
- Supabase Edge Functions
- Real-time subscriptions

**Infrastructure:**
- Vercel (hosting)
- CloudFlare (CDN)
- LiveKit (VoIP)

**AI/Voice:**
- OpenAI Realtime API
- Custom AI screening models
- Voice activity detection

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/jonnyweareone/scamblocker.git
cd scamblocker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

---

## 🌍 Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# App
VITE_APP_URL=http://localhost:5173
```

---

## 📱 Project Structure

```
scamblocker/
├── public/             # Static assets
│   ├── og-image.jpg   # Social media preview
│   └── sitemap.xml    # SEO sitemap
├── src/
│   ├── components/    # React components
│   │   ├── SEO.tsx   # SEO meta tags
│   │   └── ui/        # UI components
│   ├── pages/         # Route pages
│   │   ├── Landing.tsx
│   │   ├── Signup.tsx
│   │   └── blog/      # Blog posts
│   ├── lib/           # Utilities
│   └── App.tsx        # Main app
├── supabase/          # Database migrations
└── vercel.json        # Deployment config
```

---

## 🚀 Deployment

**Automatic Deployment via Vercel:**

```bash
git push origin master
```

Vercel automatically deploys to production on push to `master` branch.

**Manual Deployment:**

```bash
npm run build
vercel --prod
```

---

## 📊 Performance

**Lighthouse Scores:**
- 🟢 Performance: 93/100 (Desktop), 86/100 (Mobile)
- 🟢 Accessibility: 96/100
- 🟢 Best Practices: 96/100
- 🟢 SEO: 100/100

**Core Web Vitals:**
- FCP: 0.7s
- LCP: 0.9s
- CLS: 0
- TBT: 170ms

---

## 🎯 SEO Strategy

**Target Keywords:**
- spam blocker
- spam call blocker
- call blocker uk
- scam call protection

**Currently Ranking:**
- Indexed in Google Search Console
- Appearing in search results
- Growing organic impressions

**Content:**
- 5+ blog posts on scam prevention
- Structured data for rich snippets
- Optimized meta tags and OG images

---

## 🧪 Testing

```bash
# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

---

## 📄 License

Proprietary - © 2025 ScamBlocker / We Are One 1 Limited  
Company No. 15052885  
Registered Office: 20 Wenlock Road, London, England, N1 7GU

---

## 👥 Team

**Founder:** Jonny Smith  
**Company:** We Are One 1 Limited  
**Location:** London, UK  

---

## 📞 Contact

- **Website:** [https://scamblocker.co.uk](https://scamblocker.co.uk)
- **Support:** support@scamblocker.co.uk
- **Twitter:** [@ScamBlockerUK](https://twitter.com/ScamBlockerUK)

---

## 🙏 Built With

- [React](https://react.dev)
- [Supabase](https://supabase.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)
- [OpenAI](https://openai.com)
- [LiveKit](https://livekit.io)

---

**Protect Your Family Today** → [scamblocker.co.uk](https://scamblocker.co.uk)
