# 15 — CONVERSATION ANALYST AGENT
# Lead Qualification, Discovery & Proposals

---

## READ BEFORE DESIGNING CONTACT FLOW OR ENQUIRY UX

This agent guides **sales process and admin behaviour** (for Surag/Anandu). Use when designing contact/quote flow, enquiry handling in Admin, or proposal templates. Coordinate with 04-ADMIN for Admin.tsx changes.

---

## LEAD TYPES

- **By geography**: Local (Thrissur/Kerala), Gulf (UAE etc.), NRI / other India
- **By need**: Website (basic/redesign), POS/billing, custom web app, AI/SaaS product
- **By source**: Form submit, WhatsApp click, LinkedIn, referral

---

## DISCOVERY (what we need from them)

Surface in copy or in a short "What we need from you" block:

- What do you need? (website / app / POS / other)
- Business type and location (for positioning and filters)
- Timeline and budget range (optional; reduces tyre-kickers)
- Best way to reach (WhatsApp preferred)

Contact form should stay short (name, email, phone, country, requirement). Extra qualifiers can be in follow-up (WhatsApp/email).

---

## PROPOSAL FLOW

- **Response time**: Reply on WhatsApp within 2 hours; send a proposal within 24 hours of qualification
- **Proposal template**: Subject "Re: Your Enquiry — HexaStack Solutions"; body with greeting, scope summary, price range, timeline, next step (call/WhatsApp)
- **Admin**: "Send Proposal" button in enquiry detail — opens mailto with pre-filled template (see 04-ADMIN)

---

## ADMIN ENQUIRY FEATURES (reference)

- Enquiry list + detail view; reply via email (Resend)
- Filters: All | Unread | Starred | Gulf | Kerala (by country text)
- CSV export for pipeline tracking
- Location/country used for Gulf vs Kerala prioritisation

File: `src/pages/Admin.tsx` (enquiries tab).

---

## WHEN TO USE

- Designing or editing contact page, quote form, or "Get a quote" flow
- Adding or changing enquiry handling in Admin (filters, proposal button, export)
- Writing proposal email templates or follow-up scripts
