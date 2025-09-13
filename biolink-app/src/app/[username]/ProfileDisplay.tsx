'use client';

import { useState } from 'react';
import UpgradeButton from './UpgradeButton';

export default function ProfileDisplay({ profile }: { profile: any }) {
    const [currentProfile, setCurrentProfile] = useState(profile);

    const handleUpgrade = () => {
        setCurrentProfile({ ...currentProfile, is_premium: true });
    };

    const premiumClass = currentProfile.is_premium ? 'premium-profile-effect' : '';

    const profileStyle: React.CSSProperties = {
        backgroundColor: currentProfile.theme_color || '#ffffff',
    };

    if (currentProfile.background_image_url) {
        profileStyle.backgroundImage = `url(${currentProfile.background_image_url})`;
        profileStyle.backgroundSize = 'cover';
        profileStyle.backgroundPosition = 'center';
    }

    return (
        <div
            className={`w-full max-w-lg p-8 rounded-lg shadow-md text-center ${premiumClass}`}
            style={profileStyle}
        >
            {/* Inner container for text content to ensure readability over background */}
            <div className="bg-white bg-opacity-75 p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">@{currentProfile.username}</h1>
                <p className="text-gray-700">{currentProfile.bio}</p>

                {!currentProfile.is_premium && (
                    <UpgradeButton onUpgrade={handleUpgrade} />
                )}
            </div>
        </div>
    );
}
