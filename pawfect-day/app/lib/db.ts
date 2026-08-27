import { Pool } from "pg";


const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  ssl: process.env.PGSSLMODE === "true" ? { rejectUnauthorized: false } : undefined,
});

export default pool;
