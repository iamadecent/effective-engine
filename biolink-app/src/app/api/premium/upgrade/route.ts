import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateProfilePremiumStatus } from '@/lib/db';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // The user ID comes from the session object we configured.
  const userId = (session.user as any).id;

  if (!userId) {
      return NextResponse.json({ message: 'User ID not found in session' }, { status: 500 });
  }

  const updatedProfile = await updateProfilePremiumStatus(userId, true);

  if (updatedProfile) {
    return NextResponse.json({ message: 'Successfully upgraded to premium', profile: updatedProfile }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Could not find profile to upgrade' }, { status: 404 });
  }
}
