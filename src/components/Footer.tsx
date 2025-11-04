'use client'
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  const t = {
    copyright: language === 'ru' 
      ? `© ${currentYear} QuickSend, inc. Все права защищены.`
      : `© ${currentYear} QuickSend, inc. All rights reserved.`,
    privacy: language === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy',
    terms: language === 'ru' ? 'Правила использования' : 'Terms of Use',
    faq: language === 'ru' ? 'FAQ' : 'FAQ',
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-white py-12 px-4 transition-colors">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">QuickSend</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400 transition" aria-label="Telegram">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </Link>
              <Link href="#" className="hover:text-blue-400 transition" aria-label="Twitter">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="text-center flex items-center justify-center">
            <p className="text-gray-300">{t.copyright}</p>
          </div>
          
          <div className="flex flex-col space-y-2 md:items-end">
            <Link href={`/${language}/privacy`} className="hover:text-blue-400 transition">
              {t.privacy}
            </Link>
            <Link href={`/${language}/terms`} className="hover:text-blue-400 transition">
              {t.terms}
            </Link>
            <Link href={`/${language}/faq`} className="hover:text-blue-400 transition">
              {t.faq}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}