import { readdirSync, readFileSync } from "fs";
import pg from "pg";

const { Pool } = pg;


const pool = new Pool({
	...(process.env.DATABASE_URL
		? { connectionString: process.env.DATABASE_URL }
		: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		port: 5432,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASS,
		ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
		}),
});

const migrationFiles = readdirSync("app/db/migrations").sort();
for (const file of migrationFiles) {
	await pool.query(readFileSync(`app/db/migrations/${file}`, "utf-8"));
	console.log(`migrated: ${file}`);
}

await pool.query(readFileSync("app/db/seed.sql", "utf-8"));
console.log("seeded: app/db/seed.sql");

await pool.end();
