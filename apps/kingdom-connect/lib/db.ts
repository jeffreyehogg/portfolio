import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/db/schema';

// This relies on the DATABASE_URL in your .env file from Neon
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });