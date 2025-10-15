import { config } from 'dotenv';
import { resolve } from 'path';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../src/db/schema';

// Load environment variables from .env
config({ path: resolve(__dirname, '../.env') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function testAdvertisements() {
  try {
    console.log('Testing advertisements functionality...');
    
    // Insert a test advertisement
    const [advertisement] = await db.insert(schema.advertisements).values({
      title: "Test Advertisement",
      imageUrl: "https://example.com/test-image.jpg",
      productUrl: "https://mercadolivre.com.br/test-product",
      category: "suplementos_naturais",
      isFeatured: true,
    }).returning();
    
    console.log('Advertisement created:', advertisement);
    
    // Fetch all advertisements
    const advertisements = await db.select().from(schema.advertisements);
    console.log('All advertisements:', advertisements);
    
    console.log('Advertisements functionality test completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing advertisements:', error);
    process.exit(1);
  }
}

testAdvertisements();