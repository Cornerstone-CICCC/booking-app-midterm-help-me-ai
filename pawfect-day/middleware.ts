import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'pawfect-day-jwt-secret-key-production-301'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('staff_session')?.value;

  // Protege /dashboard y cualquier subruta (/dashboard/bookings/[id], /dashboard/bookings/[id]/edit)
  const isProtectedRoute = pathname.startsWith('/dashboard');
  const isLoginRoute = pathname === '/login';

  let isAuthenticated = false;

  if (sessionToken) {
    try {
      await jwtVerify(sessionToken, JWT_SECRET);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/login'],
};