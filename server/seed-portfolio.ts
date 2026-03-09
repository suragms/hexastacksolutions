/**
 * One-time seed for 3 real HexaStack portfolio projects.
 * Run: npx ts-node --project tsconfig.server.json server/seed-portfolio.ts
 * Requires DATABASE_URL in .env
 */
import { db } from './db';

const realProjects = [
  {
    title: 'Gulf Restaurant POS System',
    description: 'Complete restaurant management system for a UAE client. Real-time order tracking, table management, kitchen display, inventory, and daily sales reports. Handles 200+ orders/day.',
    techStack: 'React, Node.js, MongoDB, Socket.io, Express',
    location: 'UAE',
    clientType: 'Restaurant',
    featured: true,
    displayOrder: 0,
  },
  {
    title: 'Medical Lab Management System — Kerala',
    description: 'Full laboratory information system for a Kerala clinic. Patient registration, test ordering, sample tracking, result entry, automated PDF reports, and billing. Used daily.',
    techStack: 'React, Express, PostgreSQL, TypeScript',
    location: 'Thrissur, Kerala',
    clientType: 'Healthcare',
    featured: true,
    displayOrder: 1,
  },
  {
    title: 'NutriScan AI — Nutrition Tracking SaaS',
    description: 'AI-powered nutrition app. Users photograph food, GPT-4o Vision returns full macro+micro nutrient breakdown. Live SaaS with user accounts, history, admin panel.',
    techStack: 'FastAPI, Python, OpenAI GPT-4o Vision, SQLite, JavaScript',
    location: 'SaaS (Global)',
    clientType: 'SaaS / Health Tech',
    featured: true,
    displayOrder: 2,
  },
];

async function seed() {
  try {
    const existing = await db.portfolio.count();
    if (existing > 0) {
      console.log('Portfolio already has projects. Skip seed or delete existing first.');
      process.exit(0);
      return;
    }
    await db.portfolio.createMany({ data: realProjects });
    console.log('Seeded 3 portfolio projects.');
  } catch (e) {
    console.error('Seed failed:', e);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

seed();
