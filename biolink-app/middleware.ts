import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from './src/lib/rate-limiter';

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/auth/callback/credentials')) {
        const rateLimitError = checkRateLimit(request);
        if (rateLimitError) {
            return rateLimitError;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/auth/callback/credentials',
};
