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
      if (account?.provider === "google" && (profile as any)?.email_verified) {
        const email = (profile as any).email;
        const name = (profile as any).name;
        const avatar = (profile as any).picture;

        // Проверяем — есть ли такой пользователь
        const { data: existingUser, error: fetchError } = await supabaseAdmin
          .from("users")
          .select("id")
          .eq("email", email)
          .single();

        // Если его нет — создаем
        if (!existingUser && !fetchError) {
          const { error: insertError } = await supabaseAdmin.from("users").insert([
            {
              email,
              name,
              avatar_url: avatar,
              provider: "google",
            },
          ]);

          if (insertError) {
            console.error("Supabase insert error:", insertError);
            return false;
          }
        }

        return true;
      }
      return false;
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
