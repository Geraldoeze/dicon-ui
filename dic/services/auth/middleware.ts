// src/lib/auth/authMiddleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TokenService } from './tokenService';

export function authMiddleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = TokenService.getAccessToken();
  const userType = TokenService.getUserAccountType();

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Check if token exists and is valid
  if (!token || !TokenService.isTokenValid(token)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Route-specific access control
  const routeAccessMap = {
    '/portal/student': 'student',
    '/portal/staff': 'staff',
    '/portal/admin': 'admin'
  };

  // Check if route matches user's account type
  const matchingRoute = Object.entries(routeAccessMap).find(([route]) => 
    path.startsWith(route)
  );

  if (matchingRoute) {
    const [, requiredType] = matchingRoute;
    if (userType !== requiredType) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

// Export config for Next.js middleware
export const config = {
  matcher: [
    '/portal/:path*',
    '/login',
    '/logout'
  ]
};