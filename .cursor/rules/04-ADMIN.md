# 04 — ADMIN AGENT
# Admin Dashboard | Built from real Admin.tsx (900+ lines)

---

## READ BEFORE ANY ADMIN TASK

```bash
cat src/pages/Admin.tsx    # Full admin panel — all 6 tabs in one file
```

## CURRENT ADMIN ARCHITECTURE

```
Auth: Frontend-only password check → ADMIN_PASSWORD = 'hexastack@2024'
Login: Enter password → stores isAuthenticated in useState
Tabs: analytics | enquiries | projects (portfolio) | settings | services | products
No JWT. No session expiry. No server-side auth check.
```

## 6 ADMIN TABS (all exist in Admin.tsx)

```
1. analytics  — stats cards + recent views table
2. enquiries  — list + detail + reply via email
3. projects   — portfolio CRUD with image upload
4. settings   — CompanySettings form (WhatsApp, email, tagline etc)
5. services   — CRUD for /api/services (MongoDB native)
6. products   — CRUD for /api/products (MongoDB native)
```

## WHAT TO IMPROVE IN ADMIN (don't rebuild — add to existing)

### Fix 1: Tab for enquiry filtering
```tsx
// In the enquiries tab, add filter buttons above the list:
type Filter = 'all' | 'unread' | 'starred' | 'gulf' | 'kerala';
// Filter by: enquiry.country contains 'UAE'/'Gulf'/'Saudi' → 'gulf'
// Filter by: enquiry.country contains 'Kerala'/'India' → 'kerala'
```

### Fix 2: Proposal template button in enquiry detail
```tsx
// When viewing an enquiry, add "Send Proposal" button:
const proposalSubject = `Re: Your Enquiry — HexaStack Solutions`;
const proposalBody = `Hi ${enquiry.name},\n\nThank you for reaching out...`;
const mailtoLink = `mailto:${enquiry.email}?subject=${encodeURIComponent(proposalSubject)}&body=${encodeURIComponent(proposalBody)}`;
// Opens user's email client with pre-filled template
```

### Fix 3: Export CSV button
```tsx
// In enquiries tab header, add:
const handleExport = () => {
  const csv = [
    ['Date','Name','Email','Phone','Country','Requirement','Status'].join(','),
    ...enquiries.map(e => [
      new Date(e.createdAt).toLocaleDateString(),
      e.name, e.email, e.phone || '',
      e.country || '', 
      `"${e.requirement.replace(/"/g, '""')}"`,
      e.isRead ? 'Read' : 'Unread'
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hexastack-enquiries-${Date.now()}.csv`;
  a.click();
};
```

### Fix 4: Show "Location" and "Client Type" in portfolio manager
```tsx
// Add these fields to the portfolio project form:
// location: dropdown "UAE | Thrissur, Kerala | India | Other"
// clientType: dropdown "Restaurant | Healthcare | SaaS | Retail | Other"
// These map to the new Prisma fields added in Backend agent
```
