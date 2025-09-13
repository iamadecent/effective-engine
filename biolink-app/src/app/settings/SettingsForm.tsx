'use client';

import { useState } from 'react';

export default function SettingsForm({ profile }: { profile: any }) {
    const [bio, setBio] = useState(profile.bio);
    const [themeColor, setThemeColor] = useState(profile.theme_color || '#ffffff');
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(profile.background_image_url || '');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        const payload: any = { bio };
        if (profile.is_premium) {
            payload.theme_color = themeColor;
            payload.background_image_url = backgroundImageUrl;
        }

        const res = await fetch('/api/settings/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage('Profile updated successfully!');
        } else {
            setMessage(data.message || 'An error occurred.');
        }
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={profile.username}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                />
            </div>
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                </label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            {profile.is_premium && (
                <>
                    <div>
                        <label htmlFor="themeColor" className="block text-sm font-medium text-gray-700">
                            Profile Theme Color (Premium)
                        </label>
                        <input
                            type="color"
                            id="themeColor"
                            value={themeColor}
                            onChange={(e) => setThemeColor(e.target.value)}
                            className="mt-1 h-10 w-full block rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="backgroundImageUrl" className="block text-sm font-medium text-gray-700">
                            Background Image URL (Premium)
                        </label>
                        <input
                            type="url"
                            id="backgroundImageUrl"
                            value={backgroundImageUrl}
                            onChange={(e) => setBackgroundImageUrl(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="https://example.com/image.png"
                        />
                    </div>
                </>
            )}

            {message && <p className={message.includes('success') ? 'text-green-600' : 'text-red-600'}>{message}</p>}

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
