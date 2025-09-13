import { NextResponse } from 'next/server';
import { createUser, findUserByEmail, getProfileByUsername, hashPassword } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limiter';
import { validatePassword } from '@/lib/validation';

export async function POST(request: Request) {
  const rateLimitError = checkRateLimit(request);
  if (rateLimitError) return rateLimitError;

  try {
    const { email, password, username, captchaToken } = await request.json();

    // In a real app, you'd verify the captchaToken with the provider's API
    if (captchaToken !== 'dummy-turnstile-token') {
        return NextResponse.json({ message: 'CAPTCHA verification failed.' }, { status: 400 });
    }

    if (!email || !password || !username) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        return NextResponse.json({ message: passwordValidation.errors.join(' ') }, { status: 400 });
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        return NextResponse.json({ message: 'Username can only contain letters, numbers, and underscores' }, { status: 400 });
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
