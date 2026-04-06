import { NextRequest, NextResponse } from 'next/server';
import { storageKeys } from './config/constants';

export function middleware(request: NextRequest) {
  const isLoggedIn = Boolean(request.cookies.get(storageKeys.cookies.jwtToken)?.value);
  const isOnboard = Boolean(request.cookies.get(storageKeys.cookies.onBoardToken)?.value);
  const isUser = request.cookies.get(storageKeys.cookies.userRole)?.value === 'user';

  // Get the pathname from the request
  const { pathname } = request.nextUrl;

  // console.log(isLoggedIn, isOnboard, isUser, '***u');

  // Check if user is trying to access protected routes
  const isProtectedRoute = pathname.startsWith('/interpreter') || pathname.startsWith('/user');

  if (isLoggedIn || isOnboard) {
    if (isUser) {
      if (pathname.startsWith('/auth') || pathname.startsWith('/interpreter')) {
        return NextResponse.redirect(new URL('/user/dashboard', request.url));
      }
      if (isLoggedIn && pathname.includes('/onboard/')) {
        return NextResponse.redirect(new URL('/user/dashboard', request.url));
      }
      if (isOnboard && pathname.includes('/dashboard')) {
        return NextResponse.redirect(new URL('/logout', request.url));
      }
    } else {
      if (pathname.startsWith('/auth') || pathname.startsWith('/user')) {
        return NextResponse.redirect(new URL('/interpreter/dashboard', request.url));
      }
      if (isLoggedIn && pathname.includes('/onboard/')) {
        return NextResponse.redirect(new URL('/interpreter/dashboard', request.url));
      }
      if (isOnboard && pathname.includes('/dashboard')) {
        return NextResponse.redirect(new URL('/logout', request.url));
      }
    }
  } else if (isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/interpreter/:path*', '/user/:path*'],
};
