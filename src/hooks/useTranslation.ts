import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

type Lang = 'ru' | 'en';
type Translations = typeof ru;

const messages: Record<Lang, Translations> = { ru, en };

export function useTranslation(lang: Lang) {
  return (key: keyof Translations) => messages[lang][key];
}