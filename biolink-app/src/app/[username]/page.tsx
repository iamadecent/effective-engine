import { notFound } from 'next/navigation';
import { getProfileByUsername } from '@/lib/db';
import UpgradeButton from './UpgradeButton'; // This will not work as the component is a client component
import ProfileDisplay from './ProfileDisplay';

// This is a server component that fetches data for a specific user profile.
export default async function ProfilePage({ params }: { params: { username:string } }) {
  const profile = await getProfileByUsername(params.username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ProfileDisplay profile={profile} />
    </div>
  );
}
