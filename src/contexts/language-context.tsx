// contexts/language-context.tsx
'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = initialLanguage === 'ru' ? 'en' : 'ru';
    const newPathname = pathname?.replace(`/${initialLanguage}`, `/${newLang}`) || `/${newLang}`;
    router.push(newPathname);
  };

  const setLanguage = (lang: Language) => {
    if (lang !== initialLanguage) {
      const newPathname = pathname?.replace(`/${initialLanguage}`, `/${lang}`) || `/${lang}`;
      router.push(newPathname);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language: initialLanguage, 
      toggleLanguage, 
      setLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Возвращаем значения по умолчанию, если контекст недоступен
    return {
      language: 'en' as Language,
      toggleLanguage: () => {},
      setLanguage: () => {}
    };
  }
  return context;
}