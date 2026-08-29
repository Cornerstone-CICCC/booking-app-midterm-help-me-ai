import pool from "@/app/lib/db";
import { User } from "@/app/types/user";

export async function getUserByEmail(email: string): Promise<User | null> {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  } 

  return result.rows[0] as User;
}

export async function getUserById(id: string): Promise<User | null> {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [id];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0] as User;
}
