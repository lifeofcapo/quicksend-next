'use client';

import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, UserCircle, Moon, Sun, Menu, X, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useEffect } from 'react';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [canInstall, setCanInstall] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isChromeBrowser = /chrome|chromium|crios/i.test(userAgent) && !/edg/i.test(userAgent);
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    setIsMobile(isMobileDevice);
    setCanInstall(isChromeBrowser && !isMobileDevice);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">

        <Link href={`/${language}`} className="flex items-center z-50 flex-shrink-0">
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

        <nav className="hidden md:flex space-x-6 lg:space-x-8 font-medium">
          <Link
            href={`/${language}#whyquicksend`}
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
          >
            {t('header.aboutUs')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            href={`/${language}#products`}
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
          >
            {t('header.products')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-[#AEE5C2] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            href={`/${language}/pricing`}
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
          >
            {t('header.pricing')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#AEE5C2] to-[#FFD1A6] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            href={`/${language}#contact`}
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
          >
            {t('header.contact')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD1A6] to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'light'
              ? <Moon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
              : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 group"
          >
            <Globe className="w-4 h-4 text-gray-700 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {language === 'ru' ? 'EN' : 'RU'}
            </span>
          </button>

          {!session ? (
            <div className="flex items-center space-x-3">
              <Link
                href={`/${language}/login`}
                className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 font-medium"
              >
                {t('header.signIn')}
              </Link>

              {canInstall ? (
                <Link
                  href={`/${language}/auth/register`}
                  className="group relative px-5 py-2.5 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] group-hover:from-blue-600 group-hover:via-cyan-500 group-hover:to-[#8ED8A8] transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center text-white font-semibold text-sm">
                    {t('startFree')}
                  </span>
                </Link>
              ) : (
                <div className="relative group">
                  <button
                    disabled
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 text-white font-semibold text-sm opacity-70 cursor-not-allowed"
                  >
                    {t('startFree')}
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                          {isMobile ? t('isMobile.title') : t('isChrome.title')}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {isMobile ? t('isMobile.desc') : t('isChrome.desc')}
                        </p>
                      </div>
                    </div>
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 border-l border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                </div>
              )}
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

        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === 'light'
              ? <Moon className="w-5 h-5 text-gray-700" />
              : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>

          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {language === 'ru' ? 'EN' : 'RU'}
            </span>
          </button>

          <button
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen
              ? <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              : <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-all duration-300 ease-in-out ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full px-5 pt-20 pb-8 overflow-y-auto">
          <button
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          <nav className="flex-1 flex flex-col gap-2 mb-8">
            {[
              { href: `/${language}#whyquicksend`, label: t('header.aboutUs') },
              { href: `/${language}#products`, label: t('header.products') },
              { href: `/${language}/pricing`, label: t('header.pricing') },
              { href: `/${language}#contact`, label: t('header.contact') },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center px-4 py-3.5 text-lg font-semibold text-gray-800 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          {!canInstall && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                    {isMobile ? t('isMobile.title') : t('isChrome.title')}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                    {isMobile ? t('isMobile.desc') : t('isChrome.desc')}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {!session ? (
              <>
                <Link
                  href={`/${language}/login`}
                  className="block px-6 py-4 text-center text-blue-600 dark:text-blue-400 font-semibold text-base rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('header.signIn')}
                </Link>

                {canInstall ? (
                  <Link
                    href={`/${language}/auth/register`}
                    className="group relative block px-6 py-4 text-center rounded-xl overflow-hidden transition-all duration-300 active:scale-[0.98]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-[#AEE5C2]"></div>
                    <span className="relative flex items-center justify-center text-white font-semibold text-base">
                      {t('startFree')}
                    </span>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 text-white font-semibold text-base opacity-60 cursor-not-allowed"
                  >
                    {t('startFree')}
                  </button>
                )}
              </>
            ) : (
              <Link
                href={`/${language}/profile`}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                <UserCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                <span className="text-base font-medium text-gray-800 dark:text-white">Профиль</span>
              </Link>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 pt-2">
              <div className={`w-2 h-2 rounded-full ${canInstall ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span>
                {canInstall
                  ? 'Compatible with your browser'
                  : isMobile ? 'Mobile device' : 'Chrome required'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}