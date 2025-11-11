// @/app/api/auth/[...nextauth]/route.ts
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
      if (account?.provider === "google") {
        return (profile as any)?.email_verified === true;
      }
      return true;
    },

    async session({ session }) {
      if (!session?.user?.email) return session;

      try {
        const { data: existingUser, error } = await supabaseAdmin
          .from("users")
          .select("id, email, name, image")
          .eq("email", session.user.email)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Supabase fetch error:", error);
        }

        if (!existingUser) {
          const { error: insertError } = await supabaseAdmin.from("users").insert([
            {
              email: session.user.email,
              name: session.user.name,
              image: session.user.image,
              active_plan: "Free",
              subscription_end: null,
              created_at: new Date().toISOString(),
            },
          ]);

          if (insertError) {
            console.error("Supabase insert error:", insertError);
          }
        } else {
          const { error: updateError } = await supabaseAdmin
            .from("users")
            .update({
              name: session.user.name,
              image: session.user.image,
            })
            .eq("email", session.user.email);

          if (updateError) {
            console.error("Supabase update error:", updateError);
          }
        }
      } catch (e) {
        console.error("Supabase session error:", e);
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
