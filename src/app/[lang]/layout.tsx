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

export async function generateMetadata({  // dynamic metadata
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
    keywords: ['email marketing', 'mass email', 'cold emails', 'email campaigns', 'QuickSend'],
    authors: [{ name: 'QuickSend Team' }],
    openGraph: {
      type: 'website',
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      url: `https://quicksend-next.vercel.app/${lang}`,
      siteName: 'QuickSend',
      title: titles[lang as Language],
      description: descriptions[lang as Language],
      images: [
        {
          url: '/logo-color.png',
          width: 1200,
          height: 630,
          alt: 'QuickSend',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang as Language],
      description: descriptions[lang as Language],
      images: ['/logo-color.png'],
    },
    alternates: {
      canonical: `https://quicksend-next.vercel.app/${lang}`,
      languages: {
        'en': 'https://quicksend-next.vercel.app/en',
        'ru': 'https://quicksend-next.vercel.app/ru',
      },
    },
  };
}

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params;
  
  // Checking validity of language
  if (!languages.includes(lang as Language)) {
    notFound();
  }
  
  return (
    <html lang={lang} className={montserrat.variable} suppressHydrationWarning>
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
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