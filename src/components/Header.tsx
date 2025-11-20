'use client';

import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, UserCircle, Moon, Sun, Menu, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href={`/${language}`} className="flex items-center">
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

        {/* NAV — Desktop */}
        <nav className="hidden md:flex space-x-8 font-semibold">
          <Link href={`/${language}#whyquicksend`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {t('header.aboutUs')}
          </Link>

          <Link href={`/${language}#products`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {t('header.products')}
          </Link>

          <Link href={`/${language}/pricing`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {t('header.pricing')}
          </Link>

          <Link href={`/${language}#contact`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {t('header.contact')}
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center space-x-4 font-semibold">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light'
              ? <Moon className="w-5 h-5 text-gray-700" />
              : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span>{language === 'ru' ? 'EN' : 'RU'}</span>
          </button>

          {/* Auth */}
          {!session ? (
            <>
              <Link
                href={`/${language}/login`}
                className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
              >
                {t('header.signIn')}
              </Link>

              <Link
                href={`/${language}/auth/register`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t('startFree')}
              </Link>
            </>
          ) : (
            <Link
              href={`/${language}/profile`}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
            >
              <UserCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </Link>
          )}
        </div>

        {/* MOBILE BURGER */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-800 font-semibold space-y-4">

          <Link href={`/${language}#whyquicksend`} className="block">
            {t('header.aboutUs')}
          </Link>

          <Link href={`/${language}#products`} className="block">
            {t('header.products')}
          </Link>

          <Link href={`/${language}/pricing`} className="block">
            {t('header.pricing')}
          </Link>

          <Link href={`/${language}#contact`} className="block">
            {t('header.contact')}
          </Link>

          <div className="flex items-center space-x-4 pt-4">

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ru' ? 'EN' : 'RU'}</span>
            </button>
          </div>

          {!session ? (
            <div className="pt-6 space-y-3">
              <Link href={`/${language}/login`} className="block text-blue-600 dark:text-blue-400">
                {t('header.signIn')}
              </Link>

              <Link
                href={`/${language}/auth/register`}
                className="block bg-blue-600 text-white text-center py-2 rounded-lg"
              >
                {t('startFree')}
              </Link>
            </div>
          ) : (
            <Link
              href={`/${language}/profile`}
              className="flex items-center space-x-2 pt-4"
            >
              <UserCircle className="w-6 h-6" /> <span>Profile</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
