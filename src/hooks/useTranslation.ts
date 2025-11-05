// hooks/useTranslation.ts
import { useLanguage } from '@/contexts/language-context';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

type TranslationKey = keyof typeof en;

const translations = {
  en,
  ru,
};

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t };
}