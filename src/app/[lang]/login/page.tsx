// @/app/[lang]/login/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginClient from "./_components/LoginClient";

interface LoginPageProps {
  params: {
    lang: string;
  };
}

export default async function LoginPage({ params }: LoginPageProps) {
  const session = await getServerSession(authOptions);
  
  // Если пользователь уже авторизован, перенаправляем на профиль
  if (session) {
    redirect(`/${params.lang}/profile`);
  }

  return <LoginClient />;
}