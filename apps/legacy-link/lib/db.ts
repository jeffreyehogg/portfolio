import postgres from 'postgres'

declare global {
  // eslint-disable-next-line no-var
  var _postgresSql: ReturnType<typeof postgres> | undefined
}

const connectionString = process.env.POSTGRES_URL

if (!connectionString && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ POSTGRES_URL is not set. Database queries will fail gracefully or use fallback.')
}

// Resilient connection pool singleton across serverless invocations
export const sql =
  globalThis._postgresSql ||
  postgres(connectionString || 'postgres://localhost:5432/postgres', {
    ssl: connectionString && !connectionString.includes('localhost') ? 'require' : false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis._postgresSql = sql
}
