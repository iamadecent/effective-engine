'use client';

import { useState } from 'react';
import UpgradeButton from './UpgradeButton';

export default function ProfileDisplay({ profile }: { profile: any }) {
    const [currentProfile, setCurrentProfile] = useState(profile);

    const handleUpgrade = () => {
        setCurrentProfile({ ...currentProfile, is_premium: true });
    };

    const premiumClass = currentProfile.is_premium ? 'premium-profile-effect' : '';

    return (
        <div className={`w-full max-w-lg p-8 bg-white rounded-lg shadow-md text-center ${premiumClass}`}>
            <h1 className="text-3xl font-bold mb-2">@{currentProfile.username}</h1>
            <p className="text-gray-700">{currentProfile.bio}</p>

            {!currentProfile.is_premium && (
                <UpgradeButton onUpgrade={handleUpgrade} />
            )}
        </div>
    );
}
