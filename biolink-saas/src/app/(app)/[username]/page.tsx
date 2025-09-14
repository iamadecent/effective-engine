import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import ProfilePageClient from './ProfilePageClient';

async function getProfileData(username: string) {
    // const user = await prisma.user.findUnique({
    //     where: { username: username }, // Assumes username is on User model, but it's on Profile
    //     include: {
    //         profile: true,
    //         theme: true,
    //         links: { orderBy: { orderIndex: 'asc' } },
    //     },
    // });
    // return user;

    // Correct query would be on the Profile model
    // const profile = await prisma.profile.findUnique({
    //     where: { username: username },
    //     include: {
    //         user: true,
    //         theme: true, // This relation needs to be on the Profile model
    //         links: { where: { userId: profile.userId } } // This is getting complex
    //     }
    // })

    // Placeholder data for demonstration
    return {
        name: 'Jane Doe',
        image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        profile: {
            username: 'janedoe',
            bio: 'Welcome to my page!',
        },
        theme: {
            backgroundColor: '#f3e8ff',
            backgroundImageUrl: null,
            buttonStyle: 'pill',
            fontFamily: 'Montserrat',
        },
        links: [
            { id: '1', title: 'My Website', url: '#' },
            { id: '2', title: 'Twitter', url: '#' },
        ],
    };
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
    const data = await getProfileData(params.username);

    if (!data) {
        notFound();
    }

    // The data object would be structured differently with real Prisma queries
    // but this works for passing props to the client component.
    const { profile, theme, links, ...user } = data;

    return <ProfilePageClient user={user} profile={profile} theme={theme} links={links} />;
}
