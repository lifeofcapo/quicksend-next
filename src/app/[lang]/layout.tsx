// src/app/[lang]/layout.tsx
import type { Metadata } from 'next';
import '../globals.css';
import { ThemeProvider, ThemeScript } from '@/contexts/theme-context';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/components/AuthProvider';
import { montserrat } from '@/lib/font';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';

const languages = ['en', 'ru'] as const;
type Language = (typeof languages)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    ru: 'QuickSend: DSP Takedowns & защита авторских прав',
    en: 'QuickSend: DSP Takedowns & Copyright Protection',
  };

  const descriptions = {
    ru: 'QuickSend — профессиональный сервис для удаления треков, обложек и видео с DSP-платформ по жалобам на авторское право. Быстро, надёжно, с гарантией.',
    en: 'QuickSend is a professional DSP takedown service for beats, covers and videos. We remove stolen music from streaming platforms quickly and reliably.',
  };

  const keywords = [
    'dsp takedown',
    'copyright complaint',
    'dmca takedown',
    'music copyright',
    'beat takedown',
    'spotify takedown',
    'apple music takedown',
    'QuickSend',
  ];

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quicksend.vercel.app'),
    title: titles[lang as Language] ?? titles.en,
    description: descriptions[lang as Language] ?? descriptions.en,
    keywords,
    authors: [{ name: 'QuickSend Team' }],
    openGraph: {
      type: 'website',
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      url: `https://quicksend.vercel.app/${lang}`,
      siteName: 'QuickSend',
      title: titles[lang as Language] ?? titles.en,
      description: descriptions[lang as Language] ?? descriptions.en,
      images: [{ url: '/logo-color.png', width: 1200, height: 630, alt: 'QuickSend' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang as Language] ?? titles.en,
      description: descriptions[lang as Language] ?? descriptions.en,
      images: ['/logo-color.png'],
    },
    alternates: {
      canonical: `https://quicksend.vercel.app/${lang}`,
      languages: {
        en: 'https://quicksend.vercel.app/en',
        ru: 'https://quicksend.vercel.app/ru',
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

  if (!languages.includes(lang as Language)) {
    notFound();
  }

  const session = await auth();

  return (
    <html lang={lang} className={montserrat.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
        <ThemeProvider>
          <LanguageProvider initialLanguage={lang as Language}>
            <AuthProvider session={session}>
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