// @/app/[lang]/login/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginClient from "./_components/LoginClient";

interface LoginPageProps {
  params: Promise<{ lang: string }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { lang } = await params;
  const session = await auth();

  if (session) {
    redirect(`/${lang}/profile`);
  }

  return <LoginClient />;
}