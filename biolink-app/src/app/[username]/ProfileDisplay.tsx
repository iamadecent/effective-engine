'use client';

import { useState } from 'react';
import UpgradeButton from './UpgradeButton';

// SVG Icon Components
const VerifiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const OGIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M12 3v4m-2 2h4m5 4v4m-2-2h4" />
    </svg>
);


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
            className={`w-full max-w-lg p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl ${premiumClass}`}
            style={profileStyle}
        >
            {/* Inner container for text content to ensure readability over background */}
            <div className="bg-white bg-opacity-75 p-6 rounded-lg">
                <div className="flex justify-center items-center space-x-2">
                    <h1 className="text-3xl font-bold text-gray-900">@{currentProfile.username}</h1>
                    {currentProfile.isVerified && <VerifiedIcon />}
                    {currentProfile.isOG && <OGIcon />}
                </div>
                {/*
                  XSS Protection Note:
                  User-generated content (currentProfile.bio) is rendered as text content by React.
                  This automatically escapes any HTML, preventing Cross-Site Scripting (XSS) attacks.
                  We are not using `dangerouslySetInnerHTML`.
                */}
                <p className="text-gray-700 mt-2">{currentProfile.bio}</p>

                {!currentProfile.is_premium && (
                    <UpgradeButton onUpgrade={handleUpgrade} />
                )}
            </div>
        </div>
    );
}
