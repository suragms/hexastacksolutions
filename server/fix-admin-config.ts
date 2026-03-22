import { db } from './db';
import { hashPassword } from './utils/auth';

async function fixAdminConfiguration() {
    try {
        console.log('Starting Admin Configuration Fix...');

        // 1. Ensure Admin User Exists and is Correct
        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin123';
        const hashedPassword = await hashPassword(adminPassword);

        const existingAdmin = await db.user.findUnique({
            where: { email: adminEmail },
        });

        if (existingAdmin) {
            console.log('Updating existing admin user...');
            await db.user.update({
                where: { email: adminEmail },
                data: {
                    password: hashedPassword,
                    role: 'SUPER_ADMIN',
                    name: 'Admin User',
                },
            });
            console.log('Admin user updated successfully.');
        } else {
            console.log('Creating new admin user...');
            await db.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    name: 'Admin User',
                    role: 'SUPER_ADMIN',
                },
            });
            console.log('Admin user created successfully.');
        }

        // 2. Ensure Company Settings Exist
        const settings = await db.companySettings.findFirst();
        if (!settings) {
            console.log('Creating default company settings...');
            await db.companySettings.create({
                data: {
                    companyName: 'HexaStack Solutions',
                    primaryEmail: 'hexastacksolutions@gmail.com',
                    supportEmail: 'supporthexastack@hexastacksolutions.com',
                    primaryWhatsApp: '+917591999365',
                    leadName1: 'Anandu Krishna',
                    leadEmail1: 'hexastacksolutions@gmail.com',
                    leadWhatsApp1: '+917591999365',
                    leadName2: 'Surag',
                    leadEmail2: 'officialsurag@gmail.com',
                    leadWhatsApp2: '+917012714150',
                    address: 'Vadanappally, Thrissur, Kerala 680614, India',
                    tagline: 'Building Digital Excellence',
                    description: 'We create innovative web applications.',
                },
            });
            console.log('Company settings created.');
        } else {
            await db.companySettings.update({
                where: { id: settings.id },
                data: {
                    primaryEmail: 'hexastacksolutions@gmail.com',
                    supportEmail: 'supporthexastack@hexastacksolutions.com',
                    leadEmail1: 'hexastacksolutions@gmail.com',
                },
            });
            console.log('Company settings updated (primaryEmail -> hexastacksolutions@gmail.com, supportEmail -> supporthexastack@hexastacksolutions.com, leadEmail1 -> hexastacksolutions@gmail.com).');
        }

        console.log('\n=== Configuration Summary ===');
        console.log('Admin Email:', adminEmail);
        console.log('Admin Password:', adminPassword);
        console.log('Role:', 'SUPER_ADMIN');
        console.log('=============================');
    } catch (error) {
        console.error('Error fixing admin configuration:', error);
    } finally {
        await db.$disconnect();
    }
}

fixAdminConfiguration();
