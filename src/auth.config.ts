// src/auth.config.ts - edge-safe for middleware
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export default {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
} satisfies NextAuthConfig;