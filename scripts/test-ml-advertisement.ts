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

async function testMLAdvertisement() {
  try {
    console.log('Testing Mercado Livre advertisement...');
    
    // Insert a test advertisement with a real Mercado Livre image
    const [advertisement] = await db.insert(schema.advertisements).values({
      title: "Barra de Proteína Test",
      imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_858141-MLB46074798009_052021-F.webp",
      productUrl: "https://produto.mercadolivre.com.br/test-ml-product",
      category: "alimentacao_saudavel" as const,
      isFeatured: true,
    }).returning();
    
    console.log('Mercado Livre Advertisement created:', advertisement);
    
    console.log('Mercado Livre advertisement test completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing Mercado Livre advertisement:', error);
    process.exit(1);
  }
}

testMLAdvertisement();