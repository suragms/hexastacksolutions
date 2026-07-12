/** Pricing floors extracted from Pricing.tsx for CRM proposal gap checks. */

export type PricingTier = {
  id: string
  name: string
  floorInr: number
  label: string
}

export const PRICING_TIERS: PricingTier[] = [
  { id: 'basic_website', name: 'Basic Website', floorInr: 15000, label: 'Rs.15,000' },
  { id: 'business_app', name: 'Business App', floorInr: 60000, label: 'Rs.60,000' },
  { id: 'pos_billing', name: 'POS & Billing', floorInr: 75000, label: 'Rs.75,000' },
  { id: 'enterprise', name: 'Enterprise', floorInr: 200000, label: 'Rs.2L+' },
]

/** Default website floor used when service is unknown. */
export const WEBSITE_FLOOR_INR = 15000

export function floorForService(serviceOrProduct?: string | null): PricingTier {
  const s = (serviceOrProduct || '').toLowerCase()
  if (s.includes('pos') || s.includes('billing') || s.includes('hexabill')) {
    return PRICING_TIERS[2]
  }
  if (s.includes('app') || s.includes('saas') || s.includes('dashboard')) {
    return PRICING_TIERS[1]
  }
  if (s.includes('enterprise') || s.includes('ai') || s.includes('multi')) {
    return PRICING_TIERS[3]
  }
  return PRICING_TIERS[0]
}

export function dealGapVsFloor(
  dealValue: number | null | undefined,
  serviceOrProduct?: string | null
): { floor: PricingTier; gap: number | null; belowFloor: boolean } {
  const floor = floorForService(serviceOrProduct)
  if (dealValue == null || Number.isNaN(dealValue)) {
    return { floor, gap: null, belowFloor: false }
  }
  const gap = dealValue - floor.floorInr
  return { floor, gap, belowFloor: gap < 0 }
}
