import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: { linkId: string } }
) {
    try {
        // const link = await prisma.link.findUnique({
        //     where: { id: params.linkId },
        // });

        // if (!link) {
        //     return new NextResponse('Link not found', { status: 404 });
        // }

        // // Record the click in the background
        // await prisma.click.create({
        //     data: {
        //         linkId: params.linkId,
        //         // geo-location data would be extracted from request headers
        //     },
        // });

        // return NextResponse.redirect(link.url);
        return NextResponse.redirect("https://example.com"); // Placeholder redirect

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
