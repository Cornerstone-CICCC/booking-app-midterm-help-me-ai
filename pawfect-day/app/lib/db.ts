import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 5432,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

export default pool;
