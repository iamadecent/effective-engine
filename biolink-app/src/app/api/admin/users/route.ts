import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { findUserById, getAllUsers } from '@/lib/db';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const user = await findUserById(userId);

    if (!user || !user.isAdmin) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const allUsers = await getAllUsers();

    // It's good practice to not return password hashes, even if they are dummy ones
    const usersWithoutPasswords = allUsers.map((u: any) => {
        const { password_hash, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });

    return NextResponse.json(usersWithoutPasswords);
}
