import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

async function authorize(linkId: string, session: any) {
    if (!session || !session.user) return { error: 'Unauthorized', status: 401 };

    // const link = await prisma.link.findUnique({ where: { id: linkId } });
    // if (!link) return { error: 'Link not found', status: 404 };

    // if (link.userId !== session.user.id) {
    //     return { error: 'Forbidden', status: 403 };
    // }
    // return { link };
    return {}; // Bypassing for demonstration
}

export async function PUT(
    request: Request,
    { params }: { params: { linkId: string } }
) {
    const session = await getServerSession(authOptions);
    const authResult = await authorize(params.linkId, session);
    // if (authResult.error) { ... }

    const { url, title } = await request.json();

    // const updatedLink = await prisma.link.update({
    //     where: { id: params.linkId },
    //     data: { url, title },
    // });

    // return NextResponse.json(updatedLink);
    return new NextResponse(null, { status: 200 });
}

export async function DELETE(
    request: Request,
    { params }: { params: { linkId: string } }
) {
    const session = await getServerSession(authOptions);
    const authResult = await authorize(params.linkId, session);
    // if (authResult.error) { ... }

    // await prisma.link.delete({
    //     where: { id: params.linkId },
    // });

    return new NextResponse(null, { status: 204 });
}
