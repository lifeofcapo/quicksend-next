import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/contexts/theme-context';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/components/AuthProvider';
import { montserrat } from "@/lib/font";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider>
          <LanguageProvider>
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