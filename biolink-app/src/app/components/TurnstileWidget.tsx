'use client';

import { useState, useEffect } from 'react';

export default function TurnstileWidget({ onSuccess }: { onSuccess: (token: string) => void }) {
    const [isVerifying, setIsVerifying] = useState(true);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        // Simulate the verification process
        const timer = setTimeout(() => {
            setIsVerifying(false);
            setIsVerified(true);
            onSuccess('dummy-turnstile-token');
        }, 1500); // Simulate a 1.5 second verification delay

        return () => clearTimeout(timer);
    }, [onSuccess]);

    return (
        <div className="flex items-center justify-center p-3 border border-gray-300 rounded-md bg-gray-50">
            {isVerifying && (
                <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Verifying...</span>
                </div>
            )}
            {isVerified && (
                <div className="flex items-center space-x-2 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Verification successful</span>
                </div>
            )}
        </div>
    );
}
