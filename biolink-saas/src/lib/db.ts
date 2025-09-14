import { PrismaClient } from '@prisma/client';

// This setup prevents multiple instances of Prisma Client in development
// due to Next.js's hot reloading.

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
