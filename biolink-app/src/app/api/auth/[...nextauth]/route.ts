import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserById, findUserByEmail, comparePassword } from '@/lib/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" },
        captchaToken: { label: "Captcha Token", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (credentials.captchaToken !== 'dummy-turnstile-token') throw new Error('CAPTCHA verification failed.');

        const user = await findUserByEmail(credentials.email);

        if (user && comparePassword(credentials.password, user.password_hash)) {
          return {
              id: user.id,
              email: user.email,
              isTwoFactorEnabled: user.isTwoFactorEnabled,
              twoFactorVerifiedAt: user.twoFactorVerifiedAt // Pass this to JWT callback
            };
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger }: any) {
        // The user object is only passed on initial sign-in
        if (user) {
            token.id = user.id;
            token.isTwoFactorEnabled = user.isTwoFactorEnabled;
            // If 2FA is enabled, the user is not authenticated yet.
            token.isTwoFactorAuthenticated = !user.isTwoFactorEnabled;
        }

        // This is a custom check to see if we should re-evaluate 2FA status
        // This is not a standard next-auth trigger, so this logic is speculative
        // A better way is to check the db on every jwt callback if 2fa is enabled
        if (token.isTwoFactorEnabled && !token.isTwoFactorAuthenticated) {
            const dbUser = await findUserById(token.id);
            if (dbUser && dbUser.twoFactorVerifiedAt) {
                const now = Date.now();
                // Check if verification happened recently (e.g., within 30 seconds)
                if (now - dbUser.twoFactorVerifiedAt < 30000) {
                    token.isTwoFactorAuthenticated = true;
                }
            }
        }

        return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      session.user.isTwoFactorAuthenticated = token.isTwoFactorAuthenticated;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login/2fa', // Not a standard page, but for clarity
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
