'use client';

import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, UserCircle, Moon, Sun, Menu, X, ExternalLink, Chrome, AlertCircle, CheckCircle } from 'lucide-react';
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

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">

        <Link href={`/${language}`} className="flex items-center z-50">
          <div className="relative w-32 h-8 md:w-40 md:h-10">
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
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link 
            href={`/${language}#products`} 
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
          >
            {t('header.products')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-[#AEE5C2] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link 
            href={`/${language}/pricing`} 
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
          >
            {t('header.pricing')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#AEE5C2] to-[#FFD1A6] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link 
            href={`/${language}#contact`} 
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
          >
            {t('header.contact')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#FFD1A6] to-blue-500 group-hover:w-full transition-all duration-300"></span>
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
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] group-hover:from-blue-600 group-hover:via-cyan-500 group-hover:to-[#8ED8A8] transition-all duration-500"></div>
                
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  <span className="relative flex items-center text-white font-semibold text-sm">
                    {t('startFree')}
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ) : (
                <div className="relative group">
                  <button
                    disabled
                    className="px-5 py-2.5 rounded-xl bg-linear-to-r from-gray-400 via-gray-300 to-gray-400 text-white font-semibold text-sm opacity-70 cursor-not-allowed"
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

        <button
          className="md:hidden p-2 relative z-50 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="container mx-auto px-6 pt-20 pb-8 h-full flex flex-col">
      
          <button
            className="absolute top-5 right-4 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          <nav className="flex-1 space-y-6 font-medium">
            <Link 
              href={`/${language}#whyquicksend`} 
              className="block text-2xl font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t('header.aboutUs')}
            </Link>

            <Link 
              href={`/${language}#products`} 
              className="block text-2xl font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t('header.products')}
            </Link>

            <Link 
              href={`/${language}/pricing`} 
              className="block text-2xl font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t('header.pricing')}
            </Link>

            <Link 
              href={`/${language}#contact`} 
              className="block text-2xl font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t('header.contact')}
            </Link>
          </nav>
          {!canInstall && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                    {isMobile ? t('isMobile.title') : t('isChrome.title')}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {isMobile ? t('isMobile.desc') : t('isChrome.desc')}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light'
                    ? <Moon className="w-6 h-6 text-gray-700" />
                    : <Sun className="w-6 h-6 text-yellow-400" />}
                </button>

                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="font-medium">{language === 'ru' ? 'EN' : 'RU'}</span>
                </button>
              </div>
            </div>

            {!session ? (
              <div className="space-y-4">
                <Link
                  href={`/${language}/login`}
                  className="block px-6 py-4 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-xl transition-colors text-lg font-medium border border-blue-200 dark:border-blue-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('header.signIn')}
                </Link>

                {canInstall ? (
                  <Link
                    href={`/${language}/auth/register`}
                    className="group relative block px-6 py-4 text-center rounded-xl overflow-hidden transition-all duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] group-hover:from-blue-600 group-hover:via-cyan-500 group-hover:to-[#8ED8A8] transition-all duration-500"></div>
                    
                    <span className="relative flex items-center justify-center text-white font-semibold text-lg">
                      {t('startFree')}
                      <ExternalLink className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-4 rounded-xl bg-linear-to-r from-gray-400 via-gray-300 to-gray-400 text-white font-semibold text-lg opacity-70 cursor-not-allowed"
                  >
                    {t('startFree')}
                  </button>
                )}
              </div>
            ) : (
              <Link
                href={`/${language}/profile`}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <UserCircle className="w-7 h-7 text-gray-700 dark:text-gray-300" />
                <span className="text-lg font-medium text-gray-800 dark:text-white">Профиль</span>
              </Link>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-4">
              <div className={`w-2 h-2 rounded-full ${canInstall ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span>
                {canInstall 
                  ? 'Compatible with your Browser'
                  : `${isMobile ? 'Мобильное устройство' : 'Требуется Chrome'}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}