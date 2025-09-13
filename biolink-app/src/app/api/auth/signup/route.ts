import { NextResponse } from 'next/server';
import { createUser, findUserByEmail, getProfileByUsername, hashPassword } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const existingProfile = await getProfileByUsername(username);
    if (existingProfile) {
        return NextResponse.json({ message: 'Username is already taken' }, { status: 409 });
    }

    const hashedPassword = hashPassword(password);

    await createUser(email, hashedPassword, username);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred during sign-up' }, { status: 500 });
  }
}
