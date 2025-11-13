import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("🟢 signIn profile:", profile);
      if (account?.provider === "google" && profile?.email) {
        try {
          const email = profile.email;
          const name = profile.name;
          const avatar = (profile as any).picture;

          const { data: existingUser, error: selectError } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();

          if (selectError) throw selectError;

          if (!existingUser) {
            const { data: newUser, error: insertError } = await supabaseAdmin
              .from("users")
              .insert([{ email, name, avatar_url: avatar }])
              .select("id")
              .single();

            if (insertError && insertError.code !== "23505") {
              console.error("Supabase insert error:", insertError);
              return false;
            }

            console.log("✅ User created:", newUser);
          } else {
            console.log("ℹ️ Existing user:", existingUser);
          }
        } catch (err) {
          console.error("Error syncing user with Supabase:", err);
          return false;
        }
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const { data: dbUser } = await supabaseAdmin
          .from("users")
          .select("id")
          .eq("email", user.email)
          .maybeSingle();

        if (dbUser?.id) token.id = dbUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
