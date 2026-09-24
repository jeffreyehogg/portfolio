import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function seed() {
  // 1. Create the Migrations Table (Projects)
  // This tracks specific migration jobs (e.g. "HQ Upgrade - DNA Fusion Export")
  const createMigrationsTable = await sql`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      status VARCHAR(50) DEFAULT 'draft',
      source_system VARCHAR(100),
      target_system VARCHAR(100) DEFAULT 'Genetec',
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `

  console.log(`Created "migrations" table`)

  // 2. Create the Data Records Table
  // We use JSONB for "raw_data" to store the messy CSV rows exactly as they come in.
  const createRecordsTable = await sql`
    CREATE TABLE IF NOT EXISTS data_records (
      id SERIAL PRIMARY KEY,
      migration_id INTEGER REFERENCES migrations(id) ON DELETE CASCADE,
      raw_data JSONB NOT NULL,
      mapped_data JSONB,
      validation_errors JSONB,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `

  console.log(`Created "data_records" table`)

  return {
    createMigrationsTable,
    createRecordsTable,
  }
}