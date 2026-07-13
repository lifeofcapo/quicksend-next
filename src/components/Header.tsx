// src/components/Header.tsx
'use client';

import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, UserCircle, Moon, Sun, Menu, X, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useEffect } from 'react';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const NAV_LINKS = [
    { href: `/${language}#whyquicksend`, label: t('header.aboutUs') },
    { href: `/${language}#dsptakedown`,  label: 'DSP Takedown' },
    { href: `/${language}/pricing`,      label: t('header.pricing') },
    { href: `/${language}#contact`,      label: t('header.contact') },
  ];

  return (
    <>
      <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href={`/${language}`} className="flex items-center shrink-0">
            <div className="relative w-28 h-7 sm:w-32 sm:h-8 md:w-40 md:h-10">
              <Image
                src="/images/logo-no-background.png"
                alt="QuickSend Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light'
                ? <Moon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                : <Sun className="w-5 h-5 text-yellow-400" />
              }
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 group"
            >
              <Globe className="w-4 h-4 text-gray-700 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {language === 'ru' ? 'EN' : 'RU'}
              </span>
            </button>

            {!session ? (
              <div className="flex items-center space-x-3">
                <Link
                  href={`/${language}/login`}
                  className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 font-medium"
                >
                  {t('header.signIn')}
                </Link>
                <Link
                  href={`/${language}/profile`}
                  className="group relative px-5 py-2.5 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] group-hover:from-blue-600 group-hover:via-cyan-500 group-hover:to-[#8ED8A8] transition-all duration-500" />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2 text-white font-semibold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    {t('hero.cta')}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                href={`/${language}/profile`}
                className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full transition-all duration-300"
              >
                <UserCircle className="w-6 h-6 text-gray-700 dark:text-gray-400" />
              </Link>
            )}
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light'
                ? <Moon className="w-4 h-4 text-gray-700" />
                : <Sun className="w-4 h-4 text-yellow-400" />
              }
            </button>
            <button
              onClick={toggleLanguage}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {language === 'ru' ? 'EN' : 'RU'}
              </span>
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`md:hidden fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-[70] transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-2xl rounded-b-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <Link href={`/${language}`} onClick={() => setMobileOpen(false)}>
              <div className="relative w-28 h-7">
                <Image src="/images/logo-no-background.png" alt="QuickSend" fill className="object-contain" />
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <nav className="px-4 pt-3 pb-2 flex flex-col gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-base font-semibold text-gray-800 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="px-4 pb-5 pt-2 flex flex-col gap-2">
            {!session ? (
              <>
                <Link
                  href={`/${language}/login`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-center text-base font-semibold text-blue-600 dark:text-blue-400 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  {t('header.signIn')}
                </Link>
                <Link
                  href={`/${language}/profile`}
                  onClick={() => setMobileOpen(false)}
                  className="relative block py-3 text-center rounded-xl overflow-hidden active:scale-[0.98] transition-transform"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2]" />
                  <span className="relative flex items-center justify-center text-white font-semibold text-base gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    {t('hero.cta')}
                  </span>
                </Link>
              </>
            ) : (
              <Link
                href={`/${language}/profile`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <UserCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                <span className="text-base font-medium text-gray-800 dark:text-white">{t('profileWord')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}