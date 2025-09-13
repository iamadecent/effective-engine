'use client';

import { useState } from 'react';

export default function AdminUserList({ users: initialUsers }: { users: any[] }) {
    const [users, setUsers] = useState(initialUsers);

    const handleToggleVerified = async (userId: number, currentStatus: boolean) => {
        const res = await fetch(`/api/admin/users/${userId}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isVerified: !currentStatus }),
        });

        if (res.ok) {
            // Update the local state to reflect the change
            setUsers(users.map(user =>
                user.id === userId ? { ...user, isVerified: !currentStatus } : user
            ));
        } else {
            alert('Failed to update verification status.');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Admin
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Verified
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            OG
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.isAdmin ? 'text-green-900' : 'text-red-900'}`}>
                                    <span aria-hidden className={`absolute inset-0 ${user.isAdmin ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                                    <span className="relative">{user.isAdmin ? 'Yes' : 'No'}</span>
                                </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.isVerified ? 'text-green-900' : 'text-red-900'}`}>
                                    <span aria-hidden className={`absolute inset-0 ${user.isVerified ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                                    <span className="relative">{user.isVerified ? 'Yes' : 'No'}</span>
                                </span>
                            </td>
                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.isOG ? 'text-blue-900' : 'text-gray-900'}`}>
                                    <span aria-hidden className={`absolute inset-0 ${user.isOG ? 'bg-blue-200' : 'bg-gray-200'} opacity-50 rounded-full`}></span>
                                    <span className="relative">{user.isOG ? 'Yes' : 'No'}</span>
                                </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <button
                                    onClick={() => handleToggleVerified(user.id, user.isVerified)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Toggle Verified
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
