import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import ThemeEditor from './ThemeEditor';

export default async function DashboardSettingsPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect('/login');

    // const theme = await prisma.theme.findUnique({
    //     where: { userId: session.user.id },
    // });

    // if (!theme) {
    //     // Handle case where theme doesn't exist, maybe create it?
    //     return <div>Theme not found.</div>
    // }

    // Placeholder data
    const theme = {
        backgroundColor: '#ffffff',
        backgroundImageUrl: '',
        buttonStyle: 'rounded',
        fontFamily: 'Inter',
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Theme & Appearance</h1>
            <ThemeEditor initialTheme={theme} />
        </div>
    );
}
