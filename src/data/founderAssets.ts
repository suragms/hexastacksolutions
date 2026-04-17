/**
 * Default About-page avatars. Use files in `public/images/founders/` so they never
 * depend on third-party CDNs (LinkedIn URLs expire / block hotlinking and break `<img>`).
 * Admin upload overrides via localStorage.
 */
export const FOUNDER_DEFAULT_IMAGES = {
  anandu: '/images/founders/anandu.jpg',
  surag: '/images/founders/surag.jpg',
} as const
