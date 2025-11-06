// @/app/api/auth/[...nextauth]/route.ts
export const runtime = "nodejs";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { data: existingUser } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();
        if (!existingUser) {
          await supabaseAdmin.from("users").insert({
            email: user.email,
            name: user.name,
            avatar: user.image,
          });
        }
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/profile`;
    },
  },
  pages: { 
    signIn: "/auth/login", 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };