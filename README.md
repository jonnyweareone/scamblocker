# ScamBlocker

![ScamBlocker](https://img.shields.io/badge/ScamBlocker-AI%20Protection-7c3aed)
![UK Based](https://img.shields.io/badge/🇬🇧-100%25%20UK%20Based-blue)
![GDPR](https://img.shields.io/badge/GDPR-Compliant-green)

**Stop scam calls before they reach your family.** Real-time AI protection for UK landlines and mobiles.

## 🛡️ What is ScamBlocker?

ScamBlocker uses real-time AI to intercept and block scam calls **before** they connect — not after the damage is done. Unlike other services that record calls and alert you later, we stop scammers in their tracks.

### The Problem

- **47%** of all calls are scam attempts
- **78%** of scams target people over 65
- **£10,000** average loss per victim
- Traditional call blockers only work on known numbers

### Our Solution

5 layers of AI protection working together:

1. **Whitelist** — Family & friends skip screening
2. **Trust Score** — Number verification against spam databases
3. **Voice Screen** — Your voice asks "Who's calling?"
4. **AI Analysis** — Real-time intent detection for scam patterns
5. **Live Monitor** — Ongoing protection with Payment Blocker™

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| **ScamBlocker Home** | £14.99/mo* | Landline protection, GA11 adapter included, 2000 UK minutes |
| **ScamBlocker Mobile** | £9.99/mo | Mobile protection, no setup fee, 30-day rolling |

*£14.99 for first 6 months, then £24.99/mo. 12-month minimum term.

## 🚀 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Radix UI
- **Backend:** Supabase (Auth, Database, Edge Functions)
- **Payments:** Stripe
- **Hosting:** Vercel
- **AI:** SONIQ Voice Platform

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   └── ui/           # Reusable UI components (shadcn/ui)
├── integrations/
│   └── supabase/     # Supabase client
├── lib/
│   └── utils.ts      # Utility functions
├── pages/
│   ├── Landing.tsx   # Homepage
│   ├── Signup.tsx    # Sign up flow
│   ├── Mobile.tsx    # Mobile product page
│   ├── Login.tsx     # Login page
│   ├── Terms.tsx     # Terms of service
│   ├── Privacy.tsx   # Privacy policy
│   ├── Complaints.tsx # Complaints procedure
│   └── Rates.tsx     # Call rates
├── App.tsx           # Router setup
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## 🔐 Environment Variables

Create a `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## 🌐 Deployment

Automatically deployed to Vercel on push to `main`.

**Custom Domain:** scamblocker.co.uk

## 📄 Legal

- **Company:** We Are One 1 Limited
- **Company No:** 15052885
- **Registered Office:** 20 Wenlock Road, London, England, N1 7GU
- **ADR Scheme:** CISAS (Communications and Internet Services Adjudication Scheme)

## 📞 Support

- Email: support@scamblocker.co.uk
- Complaints: complaints@scamblocker.co.uk

---

Built with ❤️ by [We Are One 1 Limited](https://weareone1.co.uk) | Powered by [SONIQ](https://soniq.io)
