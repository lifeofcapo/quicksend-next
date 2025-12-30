// src/app/[lang]/terms/page.tsx
import TermsContent from './_components/TermsContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const titles = {
    ru: 'Условия использования - QuickSend',
    en: 'Terms of Use - QuickSend'
  };
  
  const descriptions = {
    ru: 'Условия использования сервиса QuickSend - правила и положения для пользователей',
    en: 'QuickSend Terms of Use - rules and regulations for users'
  };
  
  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
  };
}

export default async function TermsOfUsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  return <TermsContent lang={lang} />;
}