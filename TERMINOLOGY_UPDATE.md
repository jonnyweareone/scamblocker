# 🔄 TERMINOLOGY UPDATE: "Elderly" → "Older People"

## Why This Change Matters
"Elderly" can sound patronizing and reinforces stereotypes. "Older people" or "older adults" is more respectful and person-first language.

---

## Files to Update (6 blog posts)

### 1. WhyElderlyHideScams.tsx
**File path:** `src/pages/blog/WhyElderlyHideScams.tsx`

**Changes needed:**
- Title: "Why Elderly Parents Hide Being Scammed" → "Why Older Parents Hide Being Scammed"
- "elderly parents" → "older parents" (throughout)
- "elderly people" → "older people" (throughout)
- URL stays: `/blog/why-elderly-hide-scams` (don't change URLs - bad for SEO)

---

### 2. WhyElderlyAnswerEveryCall.tsx
**File path:** `src/pages/blog/WhyElderlyAnswerEveryCall.tsx`

**Changes needed:**
- Title: stays same (it's conversational: "Your Mum")
- "elderly people" → "older people"
- "elderly parents" → "older parents"  
- "Being Old" section → "Getting Older"
- URL stays: `/blog/why-elderly-answer-every-call`

---

### 3. WhatIsDigitalLandline.tsx
**File path:** `src/pages/blog/WhatIsDigitalLandline.tsx`

**Changes needed:**
- "Digital Landline for Elderly Parents" → "Digital Landline for Older Parents"
- "elderly parents" → "older parents"
- "elderly care" → "senior care"

---

### 4. BankScamCalls.tsx
**File path:** `src/pages/blog/BankScamCalls.tsx`

**Changes needed:**
- "elderly people" → "older people"
- "75-year-old mother" can stay (specific age is fine)

---

### 5. SafePhoneForElderly.tsx
**File path:** `src/pages/blog/SafePhoneForElderly.tsx`

**Changes needed:**
- Title: "Safe Phone for Elderly" → "Safe Phone for Older Adults"
- "elderly parents" → "older parents"
- "elderly people" → "older people"
- "simple phones for elderly people" → "simple phones for older adults"
- URL stays: `/blog/safe-phone-for-elderly`

---

### 6. HMRCScamCalls.tsx
**File path:** `src/pages/blog/HMRCScamCalls.tsx`

**Changes needed:**
- "elderly" → "older people" (if it appears)

---

## Landing Page Updates

### Landing.tsx
**File path:** `src/pages/Landing.tsx`

**Resources section:**
- "Safe Phone for Elderly Parents" → "Safe Phone for Older Parents"

---

## Blog Index Updates

### BlogIndex.tsx
**File path:** `src/pages/blog/BlogIndex.tsx`

Update all blog post titles and descriptions that mention "elderly"

---

## SEO Meta Tags (Keep for Search)

**IMPORTANT:** Keep "elderly" in:
- Meta keywords (people search this term)
- URLs (don't change URLs after deployment)
- Some meta descriptions (it's a search term)

**Update in:**
- Page titles
- H1 headings
- Body content
- Navigation text

---

## Search & Replace Commands

If you want to do bulk find/replace:

```bash
# In each blog file, replace:
"elderly parents" → "older parents"
"elderly people" → "older people"  
"elderly person" → "older person"
"Elderly Parents" → "Older Parents"
"Elderly People" → "Older People"

# Keep in meta keywords:
keywords="elderly" (people search this)

# Keep in URLs:
/blog/why-elderly-hide-scams (don't change URLs)
```

---

## Quick Manual Update Priority

**High Priority (user-facing):**
1. H1 titles on each blog post
2. Body content
3. Landing page Resources section
4. Blog index page

**Keep as "elderly":**
1. URLs (SEO - don't change)
2. Meta keywords (search terms)
3. File names (technical - don't rename)

---

## Example Updates

### Before:
```tsx
<h1>Why Elderly Parents Hide Being Scammed</h1>
<p>elderly people can't ignore unknown numbers</p>
<h2>Digital Landline for Elderly Parents</h2>
```

### After:
```tsx
<h1>Why Older Parents Hide Being Scammed</h1>
<p>older people can't ignore unknown numbers</p>
<h2>Digital Landline for Older Parents</h2>
```

### Keep (SEO):
```tsx
keywords="elderly hide scams, parent scammed won't tell"
url="/blog/why-elderly-hide-scams"
```

---

## Would you like me to:

**Option A:** Show you each file's exact changes to copy/paste?

**Option B:** Create new versions of all 6 blog files with updates?

**Option C:** Create a script that does find/replace across all files?

**What works best for you?**
