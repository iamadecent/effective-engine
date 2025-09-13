import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        // if (!session || !session.user || !session.user.isAdmin) {
        //     return new NextResponse('Unauthorized', { status: 403 });
        // }
        // Note: The session object needs to be configured to include the `isAdmin` role.

        // const users = await prisma.user.findMany({
        //     select: {
        //         id: true,
        //         email: true,
        //         name: true,
        //         plan: true,
        //         isVerified: true,
        //     },
        // });

        // return NextResponse.json(users);
        return NextResponse.json([]); // Placeholder

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
