import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../db/schema';

// Load .env.local
config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL is missing. Please ensure it is set in your .env.local file.');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function main() {
  console.log('🌱 Seeding fresh kingdom impact narratives into database...');

  // Update existing events dates to future
  await db.delete(schema.signups);
  await db.delete(schema.events);
  await db.delete(schema.funds);

  // 1. Insert Fresh, Inspiring Events
  await db.insert(schema.events).values([
    {
      title: "Breakfast & Fellowship with Dignity at Centennial Park",
      description: "Step into Saturday morning sharing more than just a meal. We prepare and serve hot, made-from-scratch breakfast for unhoused neighbors, sitting down together at tables for conversation and prayer. Whether you love flipping pancakes or sitting and listening to someone's story, there is a seat for you.",
      date: new Date(Date.now() + 86400000 * 3), // 3 days from now
      location: "Centennial Park Pavilion",
      category: "food",
      maxVolunteers: 16,
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Hands of Grace: Community Car Care for Single Mothers",
      description: "Transportation shouldn't be a barrier to working and caring for a family. We provide free oil changes, brake inspections, and safety checks for single mothers in our city. We need certified mechanics, handy assistants, and hospitality team members to host a welcoming coffee tent and play with kids while cars are serviced.",
      date: new Date(Date.now() + 86400000 * 8), // 8 days from now
      location: "Eastside Ministry Parking Lot, Main St.",
      category: "labor",
      maxVolunteers: 12,
      imageUrl: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Backpacks of Hope: Equipping 500 Elementary Students",
      description: "Every child deserves to start the school year confident and equipped. Join an all-ages family assembly line as we pack 500 durable backpacks with notebooks, calculators, and handwritten notes of blessing and encouragement for teachers and children in Title I schools.",
      date: new Date(Date.now() + 86400000 * 15), // 15 days from now
      location: "Grace Community Fellowship Hall",
      category: "supplies",
      maxVolunteers: 25,
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Neighborhood Home Restoration & Ramp Build",
      description: "Come alongside an elderly widow and wheelchair user in our community to build an ADA-accessible front porch ramp and complete essential exterior safety repairs. Carpentry mentors on-site—all skill levels, apprentices, and willing hearts welcome.",
      date: new Date(Date.now() + 86400000 * 22), // 22 days from now
      location: "Oakridge Community Outreach Site",
      category: "labor",
      maxVolunteers: 10,
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
    }
  ]);

  // 2. Insert Inspiring Funds
  await db.insert(schema.funds).values([
    {
      title: "The Hope Mobile: 15-Passenger Outreach & Food Delivery Van",
      description: "Every week, our outreach team uses our 15-passenger van to transport elderly shut-ins to church and deliver 300 hot meals to families without vehicles. Our 14-year-old van suffered terminal transmission failure. Help us purchase a reliable, low-mileage replacement to ensure not a single elder or family is left stranded.",
      goal: 1500000, // $15,000.00
      raised: 945000, // $9,450.00
    },
    {
      title: "Warmth & Dignity: 200 Heavy Winter Coats for Neighbors in Need",
      description: "No child or neighbor should endure freezing winter nights without protection. A gift of $25 provides a brand-new, waterproof, fleece-lined heavy winter jacket with thermal gloves and a knit cap, distributed directly through our local elementary school partnerships and homeless ministries.",
      goal: 500000, // $5,000.00
      raised: 375000, // $3,750.00
    },
    {
      title: "Emergency Neighborhood Food Pantry & Fresh Produce Walk-In",
      description: "Funding high-efficiency commercial refrigeration to allow our local food pantry to accept fresh organic produce, dairy, and eggs from regional farmers, nourishing over 180 low-income families every Thursday evening.",
      goal: 800000, // $8,000.00
      raised: 520000, // $5,200.00
    }
  ]);

  console.log('✅ Seeding complete with fresh gospel-aligned narratives and future event dates!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});