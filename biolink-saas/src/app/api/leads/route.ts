import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, userId } = await request.json();

        if (!email || !userId) {
            return new NextResponse('Missing fields', { status: 422 });
        }

        // await prisma.lead.create({
        //     data: {
        //         email,
        //         userId,
        //     },
        // });

        // In production, you would also add this email to a mailing list
        // via a service like Resend or Mailchimp.

        return new NextResponse(null, { status: 201 });

    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
