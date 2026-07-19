// src/app/[lang]/privacy/page.tsx
import PrivacyContent from './_components/PrivacyContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const titles = {
    ru: 'Политика конфиденциальности - QuickSend',
    en: 'Privacy Policy - QuickSend'
  };
  
  const descriptions = {
    ru: 'Политика конфиденциальности QuickSend - как мы собираем и защищаем данные при удалении треков с DSP-платформ',
    en: 'QuickSend Privacy Policy - how we collect and protect your data when removing tracks from DSP platforms'
  };
  
  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  return <PrivacyContent lang={lang} />;
}