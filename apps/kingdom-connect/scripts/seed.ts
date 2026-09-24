import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../db/schema'; // Adjust path if needed

// Load .env.local
config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL is missing. Please ensure it is set in your .env.local file.');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Clear existing data (Optional: be careful in production!)
  // await db.delete(schema.events);
  // await db.delete(schema.funds);

  // 2. Insert Events
  await db.insert(schema.events).values([
    {
      title: "Downtown Homeless Breakfast",
      description: "Join us at Centennial Park to serve hot breakfast to our neighbors. We need cooks and servers.",
      date: new Date(Date.now() + 86400000 * 3), // 3 days from now
      location: "Centennial Park Pavilion",
      category: "food",
      maxVolunteers: 12,
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Single Mom's Car Care Clinic",
      description: "Mechanics needed! We are providing free oil changes and basic checks for single mothers in our community.",
      date: new Date(Date.now() + 86400000 * 7),
      location: "AutoZone Parking Lot, Main St.",
      category: "labor",
      maxVolunteers: 8,
      imageUrl: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Back-to-School Backpack Stuffing",
      description: "Help us pack 500 backpacks with supplies for local elementary schools.",
      date: new Date(Date.now() + 86400000 * 14),
      location: "Fellowship Hall",
      category: "supplies",
      maxVolunteers: 20,
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
    }
  ]);

  // 3. Insert Funds
  await db.insert(schema.funds).values([
    {
      title: "New Outreach Van",
      description: "Our current van has broken down. We need to raise $15,000 to purchase a reliable used van.",
      goal: 1500000, // $15,000.00
      raised: 450000, // $4,500.00
    },
    {
      title: "Winter Coat Drive",
      description: "Purchasing 200 high-quality winter coats for the upcoming season.",
      goal: 500000, // $5,000.00
      raised: 125000, // $1,250.00
    }
  ]);

  console.log('✅ Seeding complete!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});