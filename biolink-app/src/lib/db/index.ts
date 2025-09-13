import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return a default structure
    return { users: [], profiles: [] };
  }
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function findUserByEmail(email: string) {
  const db = await readDb();
  return db.users.find((user: any) => user.email === email);
}

export async function findUserById(id: number) {
    const db = await readDb();
    return db.users.find((user: any) => user.id === id);
}

export async function createUser(email: string, password_hash: string, username: string) {
  const db = await readDb();
  const newUserId = db.users.length > 0 ? Math.max(...db.users.map((u: any) => u.id)) + 1 : 1;
  const isOG = db.users.length < 1000;

  const newUser = {
    id: newUserId,
    email,
    password_hash,
    isAdmin: false,
    isVerified: false,
    isOG: isOG,
    isTwoFactorEnabled: false,
    twoFactorSecret: '',
    twoFactorVerifiedAt: null,
  };
  db.users.push(newUser);

  const newProfileId = db.profiles.length > 0 ? Math.max(...db.profiles.map((p: any) => p.id)) + 1 : 1;
  const newProfile = {
      id: newProfileId,
      user_id: newUserId,
      username,
      bio: '',
      is_premium: false,
      theme_color: '#ffffff',
      background_image_url: '',
      isVerified: false,
      isOG: isOG,
  }
  db.profiles.push(newProfile)

  await writeDb(db);
  return newUser;
}

export async function getProfileByUsername(username: string) {
    const db = await readDb();
    return db.profiles.find((profile: any) => profile.username.toLowerCase() === username.toLowerCase());
}

export async function getProfileByUserId(userId: number) {
    const db = await readDb();
    return db.profiles.find((profile: any) => profile.user_id === userId);
}

export async function getAllUsers() {
    const db = await readDb();
    return db.users;
}

export async function updateUserVerificationStatus(userId: number, isVerified: boolean) {
    const db = await readDb();
    const userIndex = db.users.findIndex((user: any) => user.id === userId);
    const profileIndex = db.profiles.findIndex((profile: any) => profile.user_id === userId);

    if (userIndex !== -1) {
        db.users[userIndex].isVerified = isVerified;
    }
    if (profileIndex !== -1) {
        db.profiles[profileIndex].isVerified = isVerified;
    }

    if (userIndex !== -1 || profileIndex !== -1) {
        await writeDb(db);
        return { user: db.users[userIndex], profile: db.profiles[profileIndex] };
    }

    return null;
}

export async function updateUser2FAVerificationTimestamp(userId: number) {
    const db = await readDb();
    const userIndex = db.users.findIndex((user: any) => user.id === userId);
    if (userIndex !== -1) {
        db.users[userIndex].twoFactorVerifiedAt = Date.now();
        await writeDb(db);
        return db.users[userIndex];
    }
    return null;
}

export async function enableUserTwoFactor(userId: number) {
    const db = await readDb();
    const userIndex = db.users.findIndex((user: any) => user.id === userId);
    if (userIndex !== -1) {
        db.users[userIndex].isTwoFactorEnabled = true;
        await writeDb(db);
        return db.users[userIndex];
    }
    return null;
}

export async function updateUserTwoFactorSecret(userId: number, secret: string) {
    const db = await readDb();
    const userIndex = db.users.findIndex((user: any) => user.id === userId);
    if (userIndex !== -1) {
        db.users[userIndex].twoFactorSecret = secret;
        db.users[userIndex].isTwoFactorEnabled = false; // Ensure it's disabled until verified
        await writeDb(db);
        return db.users[userIndex];
    }
    return null;
}

export async function updateProfilePremiumStatus(userId: number, is_premium: boolean) {
    const db = await readDb();
    const profileIndex = db.profiles.findIndex((profile: any) => profile.user_id === userId);
    if (profileIndex !== -1) {
        db.profiles[profileIndex].is_premium = is_premium;
        await writeDb(db);
        return db.profiles[profileIndex];
    }
    return null;
}

export async function updateProfile(userId: number, data: { bio?: string; theme_color?: string; background_image_url?: string }) {
    const db = await readDb();
    const profileIndex = db.profiles.findIndex((profile: any) => profile.user_id === userId);
    if (profileIndex !== -1) {
        // Merge the new data with the existing profile
        db.profiles[profileIndex] = { ...db.profiles[profileIndex], ...data };
        await writeDb(db);
        return db.profiles[profileIndex];
    }
    return null;
}

// Dummy password hashing functions since bcrypt installation failed
export function hashPassword(password: string) {
    console.warn('Warning: Using dummy password hashing. DO NOT USE IN PRODUCTION.');
    return `hashed_${password}`;
}

export function comparePassword(password: string, hash: string) {
    console.warn('Warning: Using dummy password comparison. DO NOT USE IN PRODUCTION.');
    return `hashed_${password}` === hash;
}
