import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import pool from '@/app/lib/db';
import { JWTPayload, SafeUser, User } from '@/app/types/user';

/**
 * @constant {Uint8Array} JWT_SECRET - The secret key used for signing and verifying JWTs.
 */
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'pawfect-day-jwt-secret-key-production-301'
);

/**
 * @function createSession
 * @desc Creates a new session for the authenticated user by generating a JWT and setting it as a cookie
 * @param user  - The authenticated user's information, including userId, email, name, and role
 * @param {boolean} rememberMe - A boolean indicating whether the session should be remembered for longer
 */
export async function createSession(
  user: { userId: string; email: string; name: string; role: 'admin' | 'staff' },
  rememberMe: boolean
) {
  const duration = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day in seconds
  const expiresAt = new Date(Date.now() + duration * 1000);

  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${duration}s`)
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set('staff_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * @function verifySession
 * @desc Verifies the current session by checking the JWT stored in the cookies
 * @returns {Promise<JWTPayload | null>} - Returns the decoded JWT payload if the session is valid, or null if invalid
 */
export async function verifySession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('staff_session')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const session = await verifySession();
  if (!session) return null;

  try {
    const result = await pool.query<User>(
      'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1',
      [session.userId]
    );
    const user = result.rows[0];
    if (!user) return null;

    const { password, ...safeUser } = user;
    return safeUser;
  } catch {
    return null;
  }
}

/**
 * @function destroySession
 * @desc Destroys the current session by deleting the JWT cookie
 */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('staff_session');
}