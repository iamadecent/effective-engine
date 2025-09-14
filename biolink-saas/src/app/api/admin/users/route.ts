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

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const search = searchParams.get('search') || '';

        const skip = (page - 1) * limit;

        // const whereClause = search ? {
        //     OR: [
        //         { email: { contains: search, mode: 'insensitive' } },
        //         { name: { contains: search, mode: 'insensitive' } },
        //     ],
        // } : {};

        // const [users, total] = await prisma.$transaction([
        //     prisma.user.findMany({
        //         where: whereClause,
        //         skip: skip,
        //         take: limit,
        //         select: { id: true, email: true, name: true, plan: true, isVerified: true },
        //     }),
        //     prisma.user.count({ where: whereClause }),
        // ]);

        // return NextResponse.json({
        //     data: users,
        //     meta: {
        //         total,
        //         page,
        //         limit,
        //         totalPages: Math.ceil(total / limit),
        //     }
        // });
        return NextResponse.json({ data: [], meta: {} });

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
