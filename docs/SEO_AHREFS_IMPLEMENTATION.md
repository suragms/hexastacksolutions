# Ahrefs SEO Implementation Guide

This document implements the `Thrissur-Kerala-Gulf SEO Plan` operationally.

## 1) Input files (required)

Place these exports in `docs/seo-ahrefs-inputs/` with exact names:

- `organic_keywords.csv`
- `top_pages.csv`
- `competitor_keywords.csv`
- `keyword_gap.csv`

## 2) Run pipeline

```bash
npm run seo:ahrefs
```

If inputs are missing, the script writes:

- `docs/seo-ahrefs-outputs/README_MISSING_INPUTS.md`

## 3) Output deliverables

Generated files:

- `docs/seo-ahrefs-outputs/keyword_master.csv`
- `docs/seo-ahrefs-outputs/top30_priority_keywords.csv`
- `docs/seo-ahrefs-outputs/quick_wins_positions_11_40.csv`
- `docs/seo-ahrefs-outputs/pain_point_matrix.csv`

Manual planning docs in repo:

- `docs/SEO_PAGE_CLUSTER_MAP.md`
- `docs/SEO_PAIN_POINT_MATRIX.md`
- `docs/SEO_90_DAY_EXECUTION.md`

## 4) How scoring works

The script scores priority using:

- Position opportunity (11-40 strongest)
- Low-to-mid volume preference (local high-intent)
- Lower KD preference
- Market alignment (`thrissur`, `kerala`, `gulf`)
- Intent (`commercial`, `transactional` preferred)
- Business fit (`high`/`medium`/`low`)

## 5) Market clusters

- `thrissur`
- `kerala`
- `gulf` (UAE/Qatar/Saudi/Kuwait/Bahrain)
- `generic` (needs manual review)

## 6) Pain-point clusters

- `compliance` (VAT/GST/invoice/tax)
- `operations` (POS, stock, reconciliation, workflow)
- `growth` (website leads, SEO visibility, enquiries)
- `other` (manual review required)

## 7) Next execution sequence

1. Run pipeline after Ahrefs export upload.
2. Validate top 30 list with business owner.
3. Apply on-page updates to money pages first (`/`, `/services`, `/work`, `/products/hexabill`).
4. Publish supporting blog content based on unresolved pain-point clusters.
5. Re-run monthly and compare movement.
