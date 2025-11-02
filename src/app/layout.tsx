import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/contexts/theme-context';
import { LanguageProvider } from '@/contexts/language-context';

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'QuickSend: чтобы отправлять письма',
  description: 'QuickSend - это современный почтовый сервис, которые помогает рассылать массовые кампании с минимальным процентом попадания писем в спам',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>          
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}