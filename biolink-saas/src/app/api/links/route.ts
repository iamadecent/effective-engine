import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { url, title } = await request.json();

        if (!url || !title || typeof url !== 'string' || typeof title !== 'string') {
            return new NextResponse('Invalid request body', { status: 422 });
        }

        // const newLink = await prisma.link.create({
        //     data: {
        //         userId: session.user.id,
        //         url: url,
        //         title: title,
        //         orderIndex: 0, // Placeholder
        //     },
        // });

        // return NextResponse.json(newLink, { status: 201 });
        return new NextResponse(null, { status: 201 });

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
