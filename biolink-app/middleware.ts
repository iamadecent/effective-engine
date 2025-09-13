import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { checkRateLimit } from './src/lib/rate-limiter';

export async function middleware(request: NextRequest) {
    // Rate limit login attempts
    if (request.nextUrl.pathname.startsWith('/api/auth/callback/credentials')) {
        const rateLimitError = checkRateLimit(request);
        if (rateLimitError) {
            return rateLimitError;
        }
    }

    // Handle 2FA redirection
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    if (session) {
        const is2FAEnabled = session.isTwoFactorEnabled as boolean;
        const is2FAAuthenticated = session.isTwoFactorAuthenticated as boolean;

        // If 2FA is enabled but not yet authenticated for this session
        if (is2FAEnabled && !is2FAAuthenticated) {
            // Allow access to the 2FA page and its API, and logout
            if (
                pathname.startsWith('/login/2fa') ||
                pathname.startsWith('/api/auth/2fa-verify-login') ||
                pathname.startsWith('/api/auth/signout')
            ) {
                return NextResponse.next();
            }
            // Otherwise, redirect to the 2FA page
            return NextResponse.redirect(new URL('/login/2fa', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // Apply middleware to all routes except static assets
    matcher: [
        '/((?!api/auth/error|_next/static|_next/image|favicon.ico).*)',
    ],
};
