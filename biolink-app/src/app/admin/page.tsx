import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { findUserById, getAllUsers } from '@/lib/db'; // Can call DB directly from server component
import AdminUserList from './AdminUserList';

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/login');
    }

    const userId = (session.user as any).id;
    const user = await findUserById(userId);

    if (!user || !user.isAdmin) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    // Fetch all users directly since this is a server component
    const allUsers = await getAllUsers();
    const usersWithoutPasswords = allUsers.map((u: any) => {
        const { password_hash, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <AdminUserList users={usersWithoutPasswords} />
        </div>
    );
}
