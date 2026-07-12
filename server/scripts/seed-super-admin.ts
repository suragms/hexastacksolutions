/**
 * One-time bootstrap: create first SUPER_ADMIN when the User collection is empty.
 * Usage: npx tsx server/scripts/seed-super-admin.ts
 * Env: SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME, DATABASE_URL
 */
import 'dotenv/config';
import { createUser } from '../utils/auth';
import { db } from '../db';

async function main() {
    const count = await db.user.count();
    if (count > 0) {
        console.log(`Users already exist (${count}). Skipping seed.`);
        process.exit(0);
    }
    const email = (process.env.SEED_ADMIN_EMAIL || 'hexastacksolutions@gmail.com').trim().toLowerCase();
    const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMeNow!2026';
    const name = process.env.SEED_ADMIN_NAME || 'Anandu Krishna';
    const user = await createUser(email, password, name, 'SUPER_ADMIN', { mustChangePassword: true });
    console.log('Created SUPER_ADMIN:', user.email);
    console.log('Temp password (change on first login):', password);
    process.exit(0);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
