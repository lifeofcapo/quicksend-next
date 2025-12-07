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
  
  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
    }
    
    let result = typeof value === 'string' ? value : JSON.stringify(value);
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
      
        if (paramKey === 'count' && typeof paramValue === 'number') {
          if (paramValue === 1 && `${key}_singular` in translations[language]) {
          } else if (paramValue !== 1 && `${key}_plural` in translations[language]) {
          }
        }
      });
    }
    
    return result;
  };

  return { t };
}