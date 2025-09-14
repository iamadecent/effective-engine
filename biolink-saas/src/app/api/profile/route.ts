import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await request.json();

        // const updatedProfile = await prisma.profile.update({
        //     where: { userId: session.user.id },
        //     data: {
        //         bio: body.bio,
        //         // etc.
        //     },
        // });

        // return NextResponse.json(updatedProfile);
        return new NextResponse(null, { status: 200 });

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
