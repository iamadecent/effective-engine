import { notFound } from 'next/navigation';
import { getProfileByUsername } from '@/lib/db';
import ProfileDisplay from './ProfileDisplay';

// This is a server component that fetches data for a specific user profile.
export default async function ProfilePage({ params }: { params: { username:string } }) {
  const profile = await getProfileByUsername(params.username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <ProfileDisplay profile={profile} />
    </div>
  );
}
