import NextAuth from 'next-auth';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  ...authConfig,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = ('emailVerified' in user)
          ? (user as { emailVerified: Date | null }).emailVerified
          : null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.emailVerified = token.emailVerified as Date | null ?? null;
      }
      return session;
    },
  },
});