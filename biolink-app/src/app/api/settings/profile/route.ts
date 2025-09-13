import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateProfile, getProfileByUserId } from '@/lib/db';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const { bio, theme_color, background_image_url } = await request.json();

  const dataToUpdate: { bio?: string, theme_color?: string, background_image_url?: string } = {};
  if (typeof bio === 'string') {
    dataToUpdate.bio = bio;
  }

  const profile = await getProfileByUserId(userId);
  if (profile && profile.is_premium) {
      if (typeof theme_color === 'string') {
        dataToUpdate.theme_color = theme_color;
      }
      if (typeof background_image_url === 'string') {
          // Basic URL validation
          try {
              new URL(background_image_url);
              dataToUpdate.background_image_url = background_image_url;
          } catch (_) {
              // Ignore invalid URLs
          }
      }
  }

  if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ message: 'No valid data provided for update' }, { status: 400 });
  }

  const updatedProfile = await updateProfile(userId, dataToUpdate);

  if (updatedProfile) {
    return NextResponse.json({ message: 'Profile updated successfully', profile: updatedProfile }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Could not find profile to update' }, { status: 404 });
  }
}
