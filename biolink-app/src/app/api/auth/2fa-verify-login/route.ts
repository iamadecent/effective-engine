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

    // In a real app, you would verify the TOTP code.
    // For this simulation, we'll accept a dummy code.
    if (code === '123456') {
        await updateUser2FAVerificationTimestamp(userId);
        // The session will be updated on the next request by the middleware/jwt callback
        return NextResponse.json({ message: '2FA verification successful.' });
    } else {
        return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }
}
