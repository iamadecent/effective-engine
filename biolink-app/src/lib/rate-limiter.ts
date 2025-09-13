import { NextResponse } from 'next/server';

// A simple in-memory store for rate limiting.
// In a real production app, you would use a more robust solution like Redis.
const ipRequestCounts: Record<string, number[]> = {};

// Periodically clean up old entries to prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const ip in ipRequestCounts) {
        // Keep only recent requests
        ipRequestCounts[ip] = ipRequestCounts[ip].filter(ts => now - ts < 60000 * 5); // 5 minutes
        if (ipRequestCounts[ip].length === 0) {
            delete ipRequestCounts[ip];
        }
    }
}, 60000 * 1); // Clean up every minute

export function checkRateLimit(request: Request) {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';

    const limit = 5; // 5 requests
    const windowMs = 60 * 1000; // 1 minute

    if (!ipRequestCounts[ip]) {
        ipRequestCounts[ip] = [];
    }

    const now = Date.now();
    const requestsInWindow = ipRequestCounts[ip].filter(ts => now - ts < windowMs);

    if (requestsInWindow.length >= limit) {
        return new NextResponse('Too many requests', { status: 429 });
    }

    ipRequestCounts[ip].push(now);
    return null; // No rate limit violation
}
