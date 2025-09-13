import { config } from 'dotenv';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from '../src/db/schema';

// Load environment variables from .env
config({ path: resolve(__dirname, '../.env') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function createAdminUser() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Admin';

  if (!email || !password) {
    console.error('Usage: npm run create-admin <email> <password> [name]');
    process.exit(1);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = nanoid();

    const [user] = await db
      .insert(users)
      .values({
        id: userId,
        email,
        name,
        hashedPassword,
        isAdmin: true,
      })
      .returning();

    console.log('Admin user created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();