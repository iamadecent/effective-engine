import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateUserTwoFactorSecret } from '@/lib/db';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // In a real app, you would use a library like `speakeasy` or `otplib`
    // to generate a real TOTP secret.
    const dummySecret = `DUMMYSECRET${userId}${Date.now()}`.slice(0, 20);

    const updatedUser = await updateUserTwoFactorSecret(userId, dummySecret);

    if (updatedUser) {
        // In a real app, you would also generate a QR code URL (otpauth:// URI)
        const dummyQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Biolink:${session.user.email}?secret=${dummySecret}&issuer=Biolink`;
        return NextResponse.json({ secret: dummySecret, qrCodeUrl: dummyQrCodeUrl });
    } else {
        return NextResponse.json({ message: 'Could not set up 2FA' }, { status: 500 });
    }
}
