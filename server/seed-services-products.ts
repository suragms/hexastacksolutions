/**
 * Seed sample Services and Products for the Admin tabs and public Services/Products pages.
 * Run: npm run db:seed-services-products
 */
import { db } from './db';

const sampleServices = [
  { name: 'Custom Business Software', description: 'You have a workflow nobody\'s software fits. We build the one that does.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 1 },
  { name: 'Billing & ERP Systems', description: 'Stop reconciling invoices by hand. VAT-ready for India and Gulf.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 2 },
  { name: 'AI & Automation', description: 'That task your team does 40 times a day — we automate it.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 3 },
  { name: 'SaaS Product Build', description: 'Wireframe to live product. Architecture, build, launch.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 4 },
  { name: 'Cloud & Hosting', description: 'Your software shouldn\'t go down on your busiest day.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 5 },
  { name: 'Software Audit & Fix', description: 'Slow system? Expensive stack? We find what\'s wasting your money.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 6 },
];

const sampleProducts = [
  { name: 'HexaBill', description: 'Invoicing, POS, inventory, multi-branch, VAT-ready — India and Gulf. Used by businesses in UAE and Kerala.', features: ['Multi-Branch Support', 'VAT Compliant', 'Offline Fallback', 'Deep CRM Analytics'], link: '/products/hexabill', category: 'business', isComingSoon: false, displayOrder: 1 },
  { name: 'HexaCV', description: 'Your resume is probably getting rejected before a human sees it. Find out your ATS score — free.', features: ['ATS Score', 'Privacy-first', 'No login'], link: 'https://www.hexacv.online/', category: 'free', isComingSoon: false, displayOrder: 2 },
  { name: 'Hexa AI Tool Suite', description: 'ATS checker, JD vs resume comparison, bullet improver, section checker. Part of HexaCV.', features: ['ATS Checker', 'JD vs Resume', 'Bullet Improver'], link: 'https://www.hexacv.online/free-tools', category: 'free', isComingSoon: false, displayOrder: 3 },
  { name: 'Student Tools', description: 'CGPA, attendance deficit, internal marks. Built for Kerala university students.', features: ['CGPA Calculator', 'Attendance', 'Internal Marks'], link: 'https://studentshub-gold.vercel.app/', category: 'free', isComingSoon: false, displayOrder: 4 },
];

async function seed() {
  try {
    const serviceCount = await db.service.count();
    const productCount = await db.product.count();

    if (serviceCount === 0) {
      await db.service.createMany({ data: sampleServices });
      console.log('Created', sampleServices.length, 'services.');
    } else {
      console.log('Services already exist (' + serviceCount + '). Skipping.');
    }

    if (productCount === 0) {
      await db.product.createMany({ data: sampleProducts });
      console.log('Created', sampleProducts.length, 'products.');
    } else {
      console.log('Products already exist (' + productCount + '). Skipping.');
    }

    console.log('Services & Products seed done.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

seed();
