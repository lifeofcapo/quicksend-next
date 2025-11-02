'use client';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, UserCircle, Moon, Sun } from 'lucide-react';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();

  const t = {
    aboutUs: language === 'ru' ? 'О нас' : 'About us',
    products: language === 'ru' ? 'Продукты' : 'Products',
    pricing: language === 'ru' ? 'Цены' : 'Pricing',
    contact: language === 'ru' ? 'Контакты' : 'Contact us',
    signIn: language === 'ru' ? 'Войти' : 'Sign In',
    startFree: language === 'ru' ? 'Начать бесплатно' : 'Start for free',
    logout: language === 'ru' ? 'Выйти' : 'Logout',
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-40 h-10">
            <Image 
              src="/images/logo-no-background.png" 
              alt="QuickSend Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link href="/#whyquicksend" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {t.aboutUs}
          </Link>
          <Link href="/#products" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {t.products}
          </Link>
          <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {t.pricing}
          </Link>
          <Link href="/#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {t.contact}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5 text-gray-700" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{language === 'ru' ? 'EN' : 'RU'}</span>
          </button>

          {!session ? (
            <div className="flex space-x-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
              >
                {t.signIn}
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t.startFree}
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                <UserCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                {t.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}