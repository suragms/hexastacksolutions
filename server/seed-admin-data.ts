import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function seedAdminData() {
    try {
        console.log('Seeding Analytics...');
        const today = new Date().toISOString().split('T')[0];
        await db.analytics.upsert({
            where: { date: today },
            update: { totalViews: 450, homeViews: 200, contactViews: 15, formSubmissions: 3 },
            create: { date: today, totalViews: 450, homeViews: 200, contactViews: 15, formSubmissions: 3 }
        });

        console.log('Seeding Enquiries...');
        await db.contactMessage.createMany({
            data: [
                {
                    name: 'Enterprise Client',
                    email: 'director@enterprise.com',
                    requirement: 'We need a highly available ERP system deployed for our 12 regional branches.',
                    companyName: 'Enterprise Holdings Co.',
                    isRead: false
                },
                {
                    name: 'Michael',
                    email: 'michael.startup@tech.co',
                    requirement: 'Looking to hire HexaStack for a multi-tenant SaaS buildout starting next quarter.',
                    isRead: true
                }
            ]
        });

        console.log('Seeding Portfolio Projects...');
        const p1 = await db.portfolio.create({
            data: {
                title: 'Global Retail POS',
                description: 'A robust multi-branch Point of Sale and inventory platform processing $5M daily transaction volume.',
                techStack: 'React, Node.js, PostgreSQL',
                projectUrl: 'https://www.hexastacksolutions.com',
                featured: true,
                displayOrder: 1
            }
        });

        console.log('Seeding Services...');
        await db.service.createMany({
            data: [
                { name: 'Custom Business Software', description: 'You have a workflow nobody\'s software fits. We build the one that does.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 1 },
                { name: 'Billing & ERP Systems', description: 'Stop reconciling invoices by hand. VAT-ready for India and Gulf.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 2 },
                { name: 'AI & Automation', description: 'That task your team does 40 times a day — we automate it.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 3 },
                { name: 'SaaS Product Build', description: 'Wireframe to live product. Architecture, build, launch.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 4 },
                { name: 'Cloud & Hosting', description: 'Your software shouldn\'t go down on your busiest day.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 5 },
                { name: 'Software Audit & Fix', description: 'Slow system? Expensive stack? We find what\'s wasting your money.', icon: '/logo-icon-white.png', link: '/services', isComingSoon: false, displayOrder: 6 },
            ]
        });

        console.log('Seeding Products...');
        await db.product.createMany({
            data: [
                { name: 'HexaBill', description: 'Invoicing, POS, inventory, multi-branch, VAT-ready — India and Gulf. Used by businesses in UAE and Kerala.', features: ['Multi-Branch Support', 'VAT Compliant', 'Offline Fallback', 'Deep CRM Analytics'], link: '/products/hexabill', category: 'business', isComingSoon: false, displayOrder: 1 },
                { name: 'HexaCV', description: 'Your resume is probably getting rejected before a human sees it. Find out your ATS score — free.', features: ['ATS Score', 'Privacy-first', 'No login'], link: 'https://www.hexacv.online/', category: 'free', isComingSoon: false, displayOrder: 2 },
                { name: 'Hexa AI Tool Suite', description: 'ATS checker, JD vs resume comparison, bullet improver, section checker. Part of HexaCV.', features: ['ATS Checker', 'JD vs Resume', 'Bullet Improver'], link: 'https://www.hexacv.online/free-tools', category: 'free', isComingSoon: false, displayOrder: 3 },
                { name: 'Student Tools', description: 'CGPA, attendance deficit, internal marks. Built for Kerala university students.', features: ['CGPA Calculator', 'Attendance', 'Internal Marks'], link: 'https://studentshub-gold.vercel.app/', category: 'free', isComingSoon: false, displayOrder: 4 },
            ]
        });

        console.log('Admin Data Seeded Successfully!');
    } catch (err) {
        console.error('Failed to seed:', err);
    } finally {
        await db.$disconnect();
    }
}
seedAdminData();
