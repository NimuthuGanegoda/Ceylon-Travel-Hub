import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from './lib/rate-limit';

export function middleware(request: NextRequest) {
  // Exclude static files, Next.js internals, and common assets
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.startsWith('/assets') ||
    request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|css|js|woff|woff2)$/)
  ) {
    return NextResponse.next();
  }

  // Identify user by IP
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';

  const { success, remaining, reset } = rateLimit(ip);

  if (!success) {
    return new NextResponse(JSON.stringify({ error: 'Too Many Requests', message: 'Please try again later.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': process.env.RATE_LIMIT_MAX || '20',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': reset.toString(),
        'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', process.env.RATE_LIMIT_MAX || '20');
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', reset.toString());

  return response;
}

export const config = {
  matcher: '/:path*',
};
