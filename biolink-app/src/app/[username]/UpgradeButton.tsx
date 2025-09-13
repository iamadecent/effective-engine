'use client';

import { useState } from 'react';

export default function UpgradeButton({ onUpgrade }: { onUpgrade: () => void }) {
    const [isUpgrading, setIsUpgrading] = useState(false);

    const handleUpgrade = async () => {
        setIsUpgrading(true);
        const res = await fetch('/api/premium/upgrade', { method: 'POST' });
        if (res.ok) {
            // The parent component will handle the state update.
            onUpgrade();
        }
        setIsUpgrading(false);
    };

    return (
        <button
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className="mt-6 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors disabled:bg-gray-400"
        >
            {isUpgrading ? 'Upgrading...' : 'Upgrade to Premium'}
        </button>
    );
}
