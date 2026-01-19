# ScamBlocker Quick Reference 🚀

## ✅ COMPLETED TODAY

### Database
- Area code selection tables & functions
- Allocation request system  
- Updated signup function

### Frontend
- Area code dropdown (16 UK cities)
- Real-time availability checking
- Number picker UI
- Port number option

### SEO
- robots.txt configured

---

## 🎯 TEST IT NOW

### Local Test
```bash
cd /Users/davidsmith/Documents/GitHub/scamblocker
npm run dev
# Go to http://localhost:5173/quick-setup
```

### Deploy
```bash
git push origin master
# Vercel auto-deploys
# Test at scamblocker.co.uk/quick-setup
```

---

## 📱 User Flow

1. Choose: Landline / Mobile / Both
2. Select area code (e.g., London 020)
3. See availability:
   - ✅ Available → Pick specific number
   - ⏰ Not available → "We'll allocate within 24hrs"
4. Add address (for adapter)
5. Create account (NO PAYMENT YET)
6. Dashboard shows: "Complete payment to activate"

---

## 💾 Database Examples

### Check what's available
```sql
SELECT * FROM check_area_code_availability('020');
```

### See pending orders
```sql
SELECT 
  o.name,
  co.protection_type,
  co.area_code_preference,
  co.status,
  co.allocation_request_status
FROM consumer_orders co
JOIN orgs o ON o.id = co.org_id
WHERE co.status = 'pending_activation';
```

### See allocation requests
```sql
SELECT * FROM consumer_number_allocation_requests
WHERE status = 'pending';
```

---

## 🏗️ Architecture

**Repos:**
- `/Users/davidsmith/Documents/GitHub/scamblocker` - Frontend (Vercel)
- `/Users/davidsmith/Documents/GitHub/soniq-scamblocker` - Railway Agent
- `/Users/davidsmith/Documents/GitHub/soniq-v22` - Backend (has allocate_consumer_ddi)

**Database:** Supabase (dtosgubmmdqxbeirtbom)

**Call Flow:**
```
User calls DDI
  → Drachtio looks up number_type='consumer'
  → LiveKit creates room
  → Railway agent (soniq-scamblocker)
  → AI screening
  → Forward to SIP device (1001.orgslug)
```

---

## ⚡ Quick Commands

### Start local dev
```bash
cd /Users/davidsmith/Documents/GitHub/scamblocker && npm run dev
```

### Check git status
```bash
cd /Users/davidsmith/Documents/GitHub/scamblocker && git status
```

### Push to deploy
```bash
cd /Users/davidsmith/Documents/GitHub/scamblocker && git push origin master
```

### Check database
```sql
SELECT * FROM consumer_orders ORDER BY created_at DESC LIMIT 5;
```

---

## 🎨 UI Components Used

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
```

---

## 📞 Area Codes Available

London (020), Birmingham (0121), Manchester (0161), Leeds (0113), Bristol (0117), Edinburgh (0131), Glasgow (0141), Cardiff (029), Liverpool (0151), Newcastle (0191), Brighton (01273), Cambridge (01223), Oxford (01865), Portsmouth/Southampton (023), Exeter (01392), Norwich (01603)

---

## 🔗 Important Files

**Frontend:**
- `/src/pages/quick-setup/QuickSetup.tsx` - Main signup UI
- `/src/lib/areaCodes.ts` - UK area codes list
- `/public/robots.txt` - SEO configuration

**Database:**
- `consumer_orders` - Stores signup data
- `consumer_number_allocation_requests` - Manual allocation queue
- `number_inventory` - Available DDI pool

**Functions:**
- `check_area_code_availability()` - Real-time check
- `create_consumer_account_quick()` - Create account
- `create_allocation_request()` - Queue for later
- `fulfill_allocation_request()` - Manually allocate

---

## ⏭️ Next Steps

1. **Push code** (manual due to git auth)
2. **Test signup** on scamblocker.co.uk
3. **Build activation flow** (~2 hours):
   - Dashboard banner
   - Payment modal
   - Activation edge function
   - Email notifications

---

**🎉 Core system is COMPLETE and ready to accept signups!**
