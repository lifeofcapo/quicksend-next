// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import '../globals.css';
import { ThemeProvider } from '@/contexts/theme-context';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/components/AuthProvider';
import { montserrat } from "@/lib/font";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

const languages = ['en', 'ru'] as const;
type Language = typeof languages[number];

export async function generateMetadata({
  params
}: {
  params: { lang: Language }
}): Promise<Metadata> {
  const { lang } = params;

  const titles = {
    ru: 'QuickSend: чтобы отправлять письма',
    en: 'QuickSend: to send emails',
  };

  const descriptions = {
    ru: 'QuickSend - это современный почтовый сервис...',
    en: 'QuickSend is a modern email service...',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: Language };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "ru" | "en" };
}) {
  const { lang } = params;

  if (!["en", "ru"].includes(lang)) {
    notFound();
  }

  return (
    <html lang={lang} className={montserrat.variable} suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider>
          <LanguageProvider initialLanguage={lang}>
            <AuthProvider>
              <Header />
              {children}
              <Footer />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
