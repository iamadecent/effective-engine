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

    // In a real app, you would use a library to verify the TOTP code
    // against the user's secret.
    // For this simulation, we'll accept a dummy code.
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
