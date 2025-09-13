import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { enableUserTwoFactor } from '@/lib/db';

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
        const updatedUser = await enableUserTwoFactor(userId);
        if (updatedUser) {
            return NextResponse.json({ message: '2FA enabled successfully' });
        } else {
            return NextResponse.json({ message: 'Could not enable 2FA' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }
}
