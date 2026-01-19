# 🔧 BUILD FIX - Missing Icon Imports

## Error
```
src/pages/Landing.tsx(1000,24): error TS2304: Cannot find name 'AlertTriangle'.
src/pages/Landing.tsx(1038,24): error TS2304: Cannot find name 'PhoneCall'.
```

## Fix Applied

**File:** `src/pages/Landing.tsx` (Line 14-18)

**Change the import from:**
```tsx
import { 
  Shield, Phone, Smartphone, ShieldCheck, Users, CreditCard, 
  CheckCircle2, ArrowRight, X, Clock, 
  Zap, Brain, Eye, PhoneOff, ShieldAlert, Activity, Lock, Play,
  PhoneIncoming, PhoneMissed, Mic, Calendar,
  Heart, Tv, FileText, Mail, Sparkles
} from "lucide-react";
```

**To:**
```tsx
import { 
  Shield, Phone, Smartphone, ShieldCheck, Users, CreditCard, 
  CheckCircle2, ArrowRight, X, Clock, 
  Zap, Brain, Eye, PhoneOff, ShieldAlert, Activity, Lock, Play,
  PhoneIncoming, PhoneMissed, Mic, Calendar,
  Heart, Tv, FileText, Mail, Sparkles, AlertTriangle, PhoneCall
} from "lucide-react";
```

**Just add:** `, AlertTriangle, PhoneCall` to the end of the imports.

---

## Why This Happened

When I added the Resources section to Landing.tsx, I used:
- `<AlertTriangle>` icon for HMRC blog card
- `<PhoneCall>` icon for Digital Landline blog card

But forgot to add them to the imports at the top!

---

## Quick Deploy

```bash
# Update just this one line in src/pages/Landing.tsx
# Line 18: Add , AlertTriangle, PhoneCall

git add src/pages/Landing.tsx
git commit -m "Fix: Add missing icon imports (AlertTriangle, PhoneCall)"
git push
```

**Build will succeed now! ✅**
