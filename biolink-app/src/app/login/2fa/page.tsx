'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function TwoFactorLoginPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/2fa-verify-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });

        if (res.ok) {
            router.push('/'); // Redirect to home page after successful 2FA
        } else {
            const data = await res.json();
            setError(data.message || 'Verification failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Two-Factor Authentication</h1>
                <p className="text-center text-sm text-gray-600">Enter the code from your authenticator app.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900">Verification Code</label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            maxLength={6}
                            className="w-full p-3 border border-gray-300 rounded-lg text-center"
                            placeholder="123456"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700">
                        Verify
                    </button>
                </form>
                <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full text-sm text-center text-gray-600 hover:underline"
                >
                    Cancel and go back to login
                </button>
            </div>
        </div>
    );
}
