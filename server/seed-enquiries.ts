/**
 * Seed sample Enquiries (ContactMessage) and Analytics for the Admin Enquiries and Analytics tabs.
 * Run: npm run db:seed-enquiries
 */
import { db } from './db';

const sampleEnquiries = [
  { name: 'Enterprise Client', email: 'director@enterprise.com', requirement: 'We need a highly available ERP system deployed for our 12 regional branches.', companyName: 'Enterprise Holdings Co.', isRead: false },
  { name: 'Michael', email: 'michael.startup@tech.co', requirement: 'Looking to hire HexaStack for a multi-tenant SaaS buildout starting next quarter.', isRead: true },
  { name: 'Sarah', email: 'sarah@retail.in', phone: '+91 98765 43210', requirement: 'Need a billing and inventory system for our 5 retail outlets. GST and multi-branch support required.', companyName: 'Retail Plus', isRead: false },
];

async function seed() {
  try {
    const enquiryCount = await db.contactMessage.count();
    if (enquiryCount === 0) {
      await db.contactMessage.createMany({ data: sampleEnquiries });
      console.log('Created', sampleEnquiries.length, 'enquiries.');
    } else {
      console.log('Enquiries already exist (' + enquiryCount + '). Skipping.');
    }

    const today = new Date().toISOString().split('T')[0];
    await db.analytics.upsert({
      where: { date: today },
      update: { totalViews: 450, homeViews: 200, contactViews: 15, formSubmissions: 3 },
      create: { date: today, totalViews: 450, homeViews: 200, contactViews: 15, formSubmissions: 3 },
    });
    console.log('Analytics (today) upserted.');

    console.log('Enquiries & Analytics seed done.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

seed();
