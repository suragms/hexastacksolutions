/**
 * Seed sample SEO Location Pages and Backlinks for the Admin SEO Pages and Backlinks tabs.
 * Run: npm run db:seed-seo-backlinks
 */
import { db } from './db';

const sampleSeoPages = [
  { location: 'Thrissur', locationSlug: 'thrissur', service: 'Web Development', serviceSlug: 'web-development', title: 'Web Development Company Thrissur | HexaStack Solutions', description: 'Custom web development and websites in Thrissur, Kerala. From brochure sites to web apps. Local team, India and Gulf clients.', h1: 'Web Development Company in Thrissur', region: 'KERALA' },
  { location: 'Thrissur', locationSlug: 'thrissur', service: 'POS Software', serviceSlug: 'pos-software', title: 'POS Software Thrissur | Restaurant & Retail Billing | HexaStack', description: 'POS and billing software for Thrissur businesses. GST-compliant, multi-branch. Built in Kerala.', h1: 'POS Software in Thrissur', region: 'KERALA' },
  { location: 'UAE', locationSlug: 'uae', service: 'Web Development', serviceSlug: 'web-development', title: 'Web Development Company UAE | HexaStack Solutions', description: 'Custom web development for UAE businesses. From Kerala team. Websites and web apps.', h1: 'Web Development Company in UAE', region: 'GULF' },
];

const sampleBacklinks = [
  { sourceUrl: 'https://example.com/directory/hexastack', targetUrl: 'https://hexastacksolutions.com', sourceSite: 'Example Directory', linkType: 'directory', daDr: 'DA 35', notes: 'Tech directory listing', status: 'active' },
  { sourceUrl: 'https://partner-blog.com/guest-post', targetUrl: 'https://hexastacksolutions.com/services', sourceSite: 'Partner Blog', linkType: 'guest_post', daDr: 'DR 28', notes: 'Guest post on software', status: 'active' },
];

async function seed() {
  try {
    const seoCount = await db.seoLocationPage.count();
    if (seoCount === 0) {
      await db.seoLocationPage.createMany({ data: sampleSeoPages });
      console.log('Created', sampleSeoPages.length, 'SEO location pages.');
    } else {
      console.log('SEO pages already exist (' + seoCount + '). Skipping.');
    }

    const backlinkCount = await db.backlink.count();
    if (backlinkCount === 0) {
      await db.backlink.createMany({ data: sampleBacklinks });
      console.log('Created', sampleBacklinks.length, 'backlinks.');
    } else {
      console.log('Backlinks already exist (' + backlinkCount + '). Skipping.');
    }

    console.log('SEO Pages & Backlinks seed done.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

seed();
