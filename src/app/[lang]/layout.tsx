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

// Для dynamic metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  
  const titles = {
    ru: 'QuickSend: чтобы отправлять письма',
    en: 'QuickSend: to send emails'
  };
  
  const descriptions = {
    ru: 'QuickSend - это современный почтовый сервис, который помогает рассылать массовые кампании с минимальным процентом попадания писем в спам',
    en: 'QuickSend is a modern email service that helps send mass campaigns with minimal spam rate'
  };
  
  return {
    title: titles[lang as Language],
    description: descriptions[lang as Language],
  };
}

// Генерируем статические пути для языков
export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params;
  
  // Проверяем валидность языка
  if (!languages.includes(lang as Language)) {
    notFound();
  }
  
  return (
    <html lang={lang} className={montserrat.variable} suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider>
          <LanguageProvider initialLanguage={lang as Language}>
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