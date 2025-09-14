import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect('/login');

    // const links = await prisma.link.findMany({ where: { userId: session.user.id } });
    // const leads = await prisma.lead.findMany({ where: { userId: session.user.id } });
    // const totalClicks = await prisma.click.count({ where: { link: { userId: session.user.id } } });

    // Placeholder data
    const links = [];
    const leads = [];
    const totalClicks = 0;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{links.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{totalClicks}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{leads.length}</p>
                    </CardContent>
                </Card>
            </div>
            {/* Further components for analytics would go here */}
        </div>
    );
}
