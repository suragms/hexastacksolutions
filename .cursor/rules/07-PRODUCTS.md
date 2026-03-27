# 07 — PRODUCTS AGENT
# Products Pages | HexaBill + HexaCV + others

---

## READ BEFORE ANY PRODUCTS TASK

```bash
cat src/pages/Products.tsx           # main products listing page
cat src/pages/products/HexaBill.tsx  # HexaBill detail page (read fully)
cat src/pages/products/HexaCV.tsx    # HexaCV page (check if it has content)
cat server/routes/products.ts        # API — MongoDB native driver
```

## PRODUCTS (4 real products shown on Home.tsx)

```
HexaBill     — /products/hexabill (internal page exists)
               POS + billing + inventory + multi-branch + VAT India/Gulf
               Status: "Request Demo" → /contact?demo=1

HexaCV       — https://www.hexacv.online/ (external)
               Free ATS resume builder, privacy-first, no login
               Status: Live

Hexa AI Tool Suite — https://www.hexacv.online/free-tools (external)
               Career tools: ATS checker, JD analyzer, bullet improver
               Status: Live

Student Tools — https://studentshub-gold.vercel.app/ (external)
               CGPA, attendance, marks calculators + PDF tools
               Status: Live
```

## HEXABILL PAGE — what to verify in HexaBill.tsx

```
□ Has SEO component with correct title/description
□ Shows pricing clearly (or "Request Demo" CTA)
□ Shows features list
□ Has WhatsApp CTA
□ Has case study or "used by" proof
□ Mobile layout works
```

## ADMIN PRODUCTS TAB

The admin products tab in Admin.tsx manages entries in the Product MongoDB collection.
These override the hardcoded productCards array in Home.tsx when the API returns data.

```
Fields: name, link, description, features (array), isComingSoon, displayOrder
When isComingSoon=true → product is hidden from Home page display
```
