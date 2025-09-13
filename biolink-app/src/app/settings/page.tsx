import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getProfileByUserId } from '@/lib/db';
import SettingsForm from './SettingsForm';

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/login');
    }

    const userId = (session.user as any).id;
    const profile = await getProfileByUserId(userId);

    if (!profile) {
        // This should not happen for a logged-in user, but it's good practice
        return <div>Profile not found.</div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <SettingsForm profile={profile} />
            </div>
        </div>
    );
}
