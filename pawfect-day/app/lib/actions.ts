"use server";

import { redirect } from "next/navigation";
import pool from "@/app/lib/db";
import { createSession } from "@/app/lib/auth";
import { User, LoginCredentials } from "@/app/types/user";
import bcrypt from "bcryptjs";

/**
 * @type {LoginState}
 * @desc Represents the state of the login action, including any error messages.
 */
export type LoginState = {
  error?: string;
};

/**
 * @function loginAction
 * @desc Handles the login process for staff users
 * @param {LoginState | null} prevState - The previous state of the login action
 * @param {FormData} formData - The form data containing the user's login credentials
 * @returns {Promise<LoginState>} - The new state of the login action, including any error messages
 * @throws {Error} - Throws an error if the database connection fails or if the login credentials are invalid
 */
export async function loginAction(
  prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const credentials: LoginCredentials = {
    email: formData.get("email")?.toString().trim() || "",
    password: formData.get("password")?.toString().trim() || "",
    rememberMe: formData.get("rememberMe") === "on",
  };

  if (!credentials.email || !credentials.password) {
    return { error: "Please enter both email and password." };
  }

  try {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE email = $1",
      [credentials.email],
    );
    const user = result.rows[0];

    console.log("--- DEBUG AUTH ---");
    console.log("User found:", user?.email);
    console.log("Password Hash in DB:", user?.password);
    console.log("Password Provided:", credentials.password);

    if (!user || !user.password) {
      return { error: "Invalid email or password." };
    }

    const isValidPassword = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isValidPassword) {
      return { error: "Invalid email or password." };
    }

    await createSession(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      Boolean(credentials.rememberMe),
    );
  } catch (err) {
    console.error("[Login Action Error]:", err);
    return { error: "Database connection failed. Please try again later." };
  }

  redirect("/dashboard");
}
