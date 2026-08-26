import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;