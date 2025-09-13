'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TwoFactorSetupPage() {
    const [secret, setSecret] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSecret = async () => {
            setIsLoading(true);
            const res = await fetch('/api/settings/2fa/setup', { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                setSecret(data.secret);
                setQrCodeUrl(data.qrCodeUrl);
            } else {
                setError('Could not start 2FA setup. Please try again.');
            }
            setIsLoading(false);
        };
        fetchSecret();
    }, []);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // The verification API doesn't exist yet, I will create it next.
        const res = await fetch('/api/settings/2fa/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: verificationCode }),
        });

        if (res.ok) {
            alert('2FA enabled successfully!');
            router.push('/settings');
        } else {
            const data = await res.json();
            setError(data.message || 'Verification failed. Please try again.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl font-bold mb-4">Set Up Two-Factor Authentication</h1>
            <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
                <p className="text-center">Scan the QR code with your authenticator app.</p>
                {qrCodeUrl && <Image src={qrCodeUrl} alt="QR Code" width={200} height={200} className="mx-auto my-4" />}
                <p className="text-center text-sm text-gray-600">Or enter this secret key manually:</p>
                <p className="text-center font-mono bg-gray-100 p-2 rounded my-2 break-all">{secret}</p>

                <hr className="my-6" />

                <form onSubmit={handleVerify} className="space-y-4">
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                        Verification Code
                    </label>
                    <input
                        type="text"
                        id="verificationCode"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                        maxLength={6}
                        className="w-full p-3 border border-gray-300 rounded-lg text-center"
                        placeholder="123456"
                    />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700">
                        Verify & Enable
                    </button>
                </form>
            </div>
        </div>
    );
}
