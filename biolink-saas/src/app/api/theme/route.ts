import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// Example validation schema using Zod (if it were installed)
// import { z } from 'zod';
// const themeSchema = z.object({
//     backgroundColor: z.string().regex(/^#[0-9a-f]{6}$/i).optional(),
//     backgroundImageUrl: z.string().url().optional().or(z.literal('')),
//     buttonStyle: z.enum(['rounded', 'pill', 'square']).optional(),
//     fontFamily: z.string().min(1).optional(),
// });

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await request.json();

        // Manual validation as a fallback
        const { backgroundColor, backgroundImageUrl, buttonStyle, fontFamily } = body;
        if (backgroundColor && !/^#[0-9a-f]{6}$/i.test(backgroundColor)) {
            return new NextResponse('Invalid color format', { status: 422 });
        }
        if (buttonStyle && !['rounded', 'pill', 'square'].includes(buttonStyle)) {
            return new NextResponse('Invalid button style', { status: 422 });
        }

        // const updatedTheme = await prisma.theme.update({
        //     where: { userId: session.user.id },
        //     data: {
        //         backgroundColor,
        //         backgroundImageUrl,
        //         buttonStyle,
        //         fontFamily,
        //     },
        // });

        // return NextResponse.json(updatedTheme);
        return new NextResponse(null, { status: 200 });

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
