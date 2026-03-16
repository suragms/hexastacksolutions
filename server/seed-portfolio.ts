/**
 * Seed sample Portfolio (showcase) items for the Admin "Projects" tab and public Work page.
 * Run: npx ts-node --project tsconfig.server.json server/seed-portfolio.ts
 */
import { db } from './db';

const samples = [
  {
    title: 'HexaBill – Billing & POS',
    description: 'Smart billing and POS for small businesses. GST-ready, inventory, and reports.',
    techStack: 'React, Node.js, MongoDB',
    projectUrl: 'https://hexabill.hexastacksolutions.com',
    featured: true,
    displayOrder: 0,
    location: 'Kerala, India',
    clientType: 'SaaS',
    imageUrl: 'https://via.placeholder.com/800x500/1e40af/ffffff?text=HexaBill',
  },
  {
    title: 'NutriScan AI',
    description: 'Photo your food, get full macro and micro nutrients. GPT-4o Vision–powered nutrition app.',
    techStack: 'React, GPT-4o Vision, Node.js',
    projectUrl: null,
    featured: true,
    displayOrder: 1,
    location: 'SaaS (Global)',
    clientType: 'SaaS',
    imageUrl: 'https://via.placeholder.com/800x500/059669/ffffff?text=NutriScan+AI',
  },
  {
    title: 'Student Hub',
    description: 'CGPA calculator, attendance, internal marks, and PDF tools for students.',
    techStack: 'React, Vercel',
    projectUrl: 'https://studentshub-gold.vercel.app',
    featured: false,
    displayOrder: 2,
    location: 'Kerala',
    clientType: 'SaaS',
    imageUrl: 'https://via.placeholder.com/800x500/7c3aed/ffffff?text=Student+Hub',
  },
];

async function seedPortfolio() {
  try {
    const existing = await db.portfolio.count();
    if (existing > 0) {
      console.log(`Portfolio already has ${existing} item(s). Skipping seed.`);
      process.exit(0);
      return;
    }
    for (let i = 0; i < samples.length; i++) {
      const s = samples[i];
      await db.portfolio.create({
        data: {
          title: s.title,
          description: s.description,
          techStack: s.techStack,
          projectUrl: s.projectUrl,
          featured: s.featured,
          displayOrder: s.displayOrder,
          location: s.location,
          clientType: s.clientType,
          media: s.imageUrl
            ? { create: { type: 'IMAGE' as const, url: s.imageUrl } }
            : undefined,
        },
        include: { media: true },
      });
      console.log('Created portfolio:', s.title);
    }
    console.log('Portfolio seed done.');
  } catch (error) {
    console.error('Portfolio seed failed:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

seedPortfolio();
