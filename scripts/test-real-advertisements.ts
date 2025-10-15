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

async function testRealAdvertisements() {
  try {
    console.log('Testing advertisements functionality with real images...');
    
    // Insert test advertisements with real images from Mercado Livre
    const advertisements = [
      {
        title: "Whey Protein Premium",
        imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_612352-MLB46402310034_062021-F.webp",
        productUrl: "https://produto.mercadolivre.com.br/test-product-1",
        category: "suplementos_naturais" as const,
        isFeatured: true,
      },
      {
        title: "Creatina Monohidratada",
        imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_982831-MLB45074860073_032021-F.webp",
        productUrl: "https://produto.mercadolivre.com.br/test-product-2",
        category: "suplementos_naturais" as const,
        isFeatured: false,
      },
      {
        title: "Barra de Proteína",
        imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_858141-MLB46074798009_052021-F.webp",
        productUrl: "https://produto.mercadolivre.com.br/test-product-3",
        category: "alimentacao_saudavel" as const,
        isFeatured: true,
      }
    ];
    
    for (const ad of advertisements) {
      const [advertisement] = await db.insert(schema.advertisements).values(ad).returning();
      console.log('Advertisement created:', advertisement);
    }
    
    // Fetch all advertisements
    const allAdvertisements = await db.select().from(schema.advertisements);
    console.log('Total advertisements:', allAdvertisements.length);
    
    console.log('Real advertisements functionality test completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing real advertisements:', error);
    process.exit(1);
  }
}

testRealAdvertisements();