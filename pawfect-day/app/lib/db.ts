import { Pool } from "pg";

// Check if SSL should be enabled based on your environment variables
const hasSSL = 
  process.env.DB_SSL === "true" || 
  process.env.PGSSLMODE === "require" || 
  process.env.PGSSLMODE === "true";

const pool = new Pool({
  ...(process.env.DATABASE_URL
    ? { 
        connectionString: process.env.DATABASE_URL,
        // Append SSL configuration directly to the pool when using a connection string
        ssl: hasSSL ? { rejectUnauthorized: false } : undefined 
      }
    : {
        host: process.env.DB_HOST || process.env.PGHOST,
        user: process.env.DB_USER || process.env.PGUSER,
        port: Number(process.env.DB_PORT || process.env.PGPORT) || 5432,
        database: process.env.DB_DATABASE || process.env.PGDATABASE,
        password: process.env.DB_PASS || process.env.PGPASSWORD,
        ssl: hasSSL ? { rejectUnauthorized: false } : undefined,
      }),
});

export default pool;
