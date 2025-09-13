import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { findUserById, updateUserVerificationStatus } from '@/lib/db';

export async function POST(
    request: Request,
    { params }: { params: { userId: string } }
) {
    // --- API Security Layer 1: Authentication ---
    // Ensure the user is logged in before they can proceed.
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // --- API Security Layer 2: Authorization ---
    // Check if the logged-in user has the required permissions (isAdmin).
    const adminId = (session.user as any).id;
    const adminUser = await findUserById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // --- API Security Layer 3: Input Validation ---
    // Sanitize and validate all incoming data.
    const targetUserId = parseInt(params.userId, 10);
    if (isNaN(targetUserId)) {
        return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const { isVerified } = await request.json();
    if (typeof isVerified !== 'boolean') {
        return NextResponse.json({ message: 'Invalid isVerified value' }, { status: 400 });
    }

    const result = await updateUserVerificationStatus(targetUserId, isVerified);

    if (result) {
        return NextResponse.json({ message: 'Verification status updated successfully', user: result.user });
    } else {
        return NextResponse.json({ message: 'Could not find user to update' }, { status: 404 });
    }
}
