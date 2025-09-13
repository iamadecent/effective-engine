import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateUser2FAVerificationTimestamp } from '@/lib/db';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { code } = await request.json();

    // --- Production 2FA Implementation Guide ---
    // 1. Fetch the user's `twoFactorSecret` from the database.
    // 2. Use otplib to verify the code:
    //    `const isValid = authenticator.verify({ token: code, secret: user.twoFactorSecret });`
    // 3. If `isValid` is true, proceed.
    if (code === '123456') {
        await updateUser2FAVerificationTimestamp(userId);
        // The session will be updated on the next request by the middleware/jwt callback
        return NextResponse.json({ message: '2FA verification successful.' });
    } else {
        return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }
}
