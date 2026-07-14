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
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.emailVerified = user.emailVerified;
      }
      return session;
    },
  },
});