# 23 — Operations (Discipline, Profit, Clients)

Product enforces playbook habits from `11-GROWTH`, `18-MARKETING-MANAGER`, and `21-STARTUP-AGGRESSIVE`. It does **not** replace human outreach.

## Features ↔ rules

| Feature | Rule / habit |
|--------|----------------|
| Daily Ops outreach counter (target 5/day IST) | Aggressive acquisition cadence |
| Streak (≥5 outreach / IST day) | Consistency over bursts |
| SLA list + CRM red flags (2h unreplied; quoted 3d / 24h) | Reply SLA from growth playbooks |
| Deal value + pricing floor gap (`src/data/pricingTiers.ts`) | Protect ₹15k website floor / tier floors |
| Revenue tab (pipeline, funnel, MTD vs `MONTHLY_REVENUE_TARGET`) | Profit visibility |
| Convert won → Client + Project + onboarding tasks | Delivery handoff |
| Contracts / invoices (manual mark paid) | Cash discipline — no Stripe/Razorpay in MVP |
| Ops digest (SUPER_ADMIN or cron + `OPS_DIGEST_SECRET`) | Weekly accountability |
| Case study draft via `/api/ai/generate-post` | Human-edited proof, never auto-DM clients |

## Admin tabs

- **Daily Ops** — outreach log, streak, SLA, weekly metrics, digest
- **CRM** — deal money, referral, SLA borders, convert + case study on `won`
- **Revenue** — pipeline / funnel / MTD / retainers / unpaid
- **Clients** — CRM clients (extends portal `Client`; password optional)

## Date keys

All daily / weekly keys use **Asia/Kolkata**.

## Non-goals

- No payment gateway
- No auto messages to clients
- Auto-confirmation email does **not** stamp `firstRepliedAt` (human reply / leaving `new` does)
