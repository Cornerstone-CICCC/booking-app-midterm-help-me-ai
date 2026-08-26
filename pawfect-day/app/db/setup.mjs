import { readdirSync, readFileSync } from "fs";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: 5432,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASS,
	ssl: {
		rejectUnauthorized: false,
	},
});

const migrationFiles = readdirSync("app/db/migrations").sort();
for (const file of migrationFiles) {
	await pool.query(readFileSync(`app/db/migrations/${file}`, "utf-8"));
	console.log(`migrated: ${file}`);
}

await pool.query(readFileSync("app/db/seed.sql", "utf-8"));
console.log("seeded: app/db/seed.sql");

await pool.end();
