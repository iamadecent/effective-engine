'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Head from 'next/head';

export default function ProfilePageClient({ user, profile, theme, links }: any) {

    useEffect(() => {
        if (theme?.fontFamily) {
            const fontLink = document.createElement('link');
            fontLink.href = `https://fonts.googleapis.com/css2?family=${theme.fontFamily.replace(' ', '+')}:wght@400;700&display=swap`;
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
        }
    }, [theme?.fontFamily]);

    const buttonClass = {
        rounded: 'rounded-md',
        pill: 'rounded-full',
        square: 'rounded-none',
    }[theme?.buttonStyle] || 'rounded-md';

    const pageStyle = {
        backgroundColor: theme?.backgroundColor,
        backgroundImage: theme?.backgroundImageUrl ? `url(${theme.backgroundImageUrl})` : 'none',
        fontFamily: `'${theme?.fontFamily}', sans-serif`,
    };

    return (
        <>
            <Head>
                <title>{profile.username}'s Biolink</title>
            </Head>
            <div className="min-h-screen w-full bg-cover bg-center p-4" style={pageStyle}>
                <div className="max-w-md mx-auto">
                    {/* Profile Section */}
                    <div className="text-center mb-8">
                        <img src={user.image || ''} alt={user.name || ''} className="w-24 h-24 rounded-full mx-auto mb-4" />
                        <h1 className="text-2xl font-bold">@{profile.username}</h1>
                        <p className="text-muted-foreground">{profile.bio}</p>
                    </div>

                    {/* Links Section */}
                    <div className="space-y-4">
                        {links.map((link: any) => (
                            <a href={link.url} key={link.id} target="_blank" rel="noopener noreferrer">
                                <Button className={`w-full ${buttonClass}`} variant="secondary">
                                    {link.title}
                                </Button>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
