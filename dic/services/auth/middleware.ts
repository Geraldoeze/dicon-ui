// src/lib/auth/authMiddleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TokenService } from './tokenService';

export function authMiddleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/unauthorized'];
  if (publicRoutes.includes(path) || path === '/') {
    return NextResponse.next();
  }
  
  // For client-side rendering, we need to check token in cookies or localStorage
  const token = request.cookies.get('access_token')?.value;
  
  // Check if token exists
  if (!token) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  // For API routes, we'll let the endpoints handle their own auth
  if (path.startsWith('/api/')) {
    return NextResponse.next();
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
    try {
      // Get user type from token
      const userType = TokenService.getUserAccountTypeFromToken(token);
      const [, requiredType] = matchingRoute;
      
      if (userType !== requiredType) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch {
      // If token is invalid or can't be decoded
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
    '/logout',
    '/unauthorized'
  ]
};