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
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
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
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-muted-foreground"
            >
              {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
            </Button>

            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="text-muted-foreground gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'ru' ? 'EN' : 'RU'}
            </Button>

            {!session ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href={`/${language}/login`}>{t('header.signIn')}</Link>
                </Button>
                <Button asChild>
                  <Link href={`/${language}/profile`} className="gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    {t('hero.cta')}
                  </Link>
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground">
                <Link href={`/${language}/profile`} aria-label={t('profileWord')}>
                  <UserCircle className="w-5 h-5" />
                </Link>
              </Button>
            )}
          </div>
          <div className="md:hidden flex items-center gap-1.5">
            <Button variant="secondary" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button variant="secondary" size="icon" onClick={toggleLanguage} className="text-xs font-bold">
              {language === 'ru' ? 'EN' : 'RU'}
            </Button>
            <Button variant="secondary" size="icon" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
      <div
        onClick={() => setMobileOpen(false)}
        className={cn(
          'md:hidden fixed inset-0 z-[60] bg-black/40 transition-opacity duration-200',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />
      <div
        className={cn(
          'md:hidden fixed top-0 left-0 right-0 z-[70] transition-transform duration-200 ease-out',
          mobileOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="bg-card border-b border-border shadow-md rounded-b-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <Link href={`/${language}`} onClick={() => setMobileOpen(false)}>
              <div className="relative w-28 h-7">
                <Image src="/images/logo-no-background.png" alt="QuickSend" fill className="object-contain" />
              </div>
            </Link>
            <Button variant="secondary" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <nav className="px-4 pt-3 pb-2 flex flex-col gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-base font-medium text-foreground rounded-md hover:bg-secondary transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="px-4 pb-5 pt-2 flex flex-col gap-2">
            {!session ? (
              <>
                <Button variant="outline" size="lg" asChild onClick={() => setMobileOpen(false)}>
                  <Link href={`/${language}/login`}>{t('header.signIn')}</Link>
                </Button>
                <Button size="lg" asChild onClick={() => setMobileOpen(false)}>
                  <Link href={`/${language}/profile`} className="gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    {t('hero.cta')}
                  </Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" size="lg" asChild onClick={() => setMobileOpen(false)}>
                <Link href={`/${language}/profile`} className="gap-2">
                  <UserCircle className="w-5 h-5" />
                  {t('profileWord')}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}