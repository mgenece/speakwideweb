import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { storageKeys } from './config/constants';

const jwtSecret = new TextEncoder().encode(process.env.NEXT_APP_JWT ?? '');

async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, jwtSecret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const rawJwt = request.cookies.get(storageKeys.cookies.jwtToken)?.value;
  const rawOnboard = request.cookies.get(storageKeys.cookies.onBoardToken)?.value;
  const userRole = request.cookies.get(storageKeys.cookies.userRole)?.value;

  const isLoggedIn = await isValidToken(rawJwt);
  const isOnboard = await isValidToken(rawOnboard);
  const isUser = userRole === 'user';

  const { pathname } = request.nextUrl;

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
