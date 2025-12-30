// src/app/[lang]/faq/page.tsx
import { headers } from 'next/headers';
import FAQContent from './_components/FAQContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const titles = {
    ru: 'FAQ - QuickSend',
    en: 'FAQ - QuickSend'
  };
  
  const descriptions = {
    ru: 'Часто задаваемые вопросы о QuickSend - все ответы на ваши вопросы о массовых email-рассылках',
    en: 'Frequently Asked Questions about QuickSend - all answers about mass email campaigns'
  };
  
  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
  };
}

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  return <FAQContent lang={lang} />;
}