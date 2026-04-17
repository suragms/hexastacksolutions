/**
 * Default About-page avatars. Use files in `public/images/founders/` so they never
 * depend on third-party CDNs (LinkedIn URLs expire / block hotlinking and break `<img>`).
 * Admin upload overrides via localStorage.
 *
 * Source profile photos (re-download into anandu.jpg / surag.jpg when refreshing):
 * - Anandu: https://media.licdn.com/dms/image/v2/D5603AQEiWUz1x8TqFA/profile-displayphoto-scale_400_400/B56ZnwzFGVJ4Ag-/0/1760681546981?e=1778112000&v=beta&t=iR5WXYWVd-oCoJmfyy_FKkipLJiYMBcLpcbT7Xrxlj0
 * - Surag: https://media.licdn.com/dms/image/v2/D5603AQH8pB2vlL3GeA/profile-displayphoto-scale_400_400/B56Zwxt2X8K4Ag-/0/1770360629769?e=1778112000&v=beta&t=xrYbBX0D45F_BexleztxD-88-3xDE6PGJrHoHbTc9mg
 */
export const FOUNDER_DEFAULT_IMAGES = {
  anandu: '/images/founders/anandu.jpg',
  surag: '/images/founders/surag.jpg',
} as const
