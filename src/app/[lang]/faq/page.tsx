// src/app/[lang]/faq/page.tsx
import FAQContent from './_components/FAQContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const titles = {
    ru: 'FAQ - QuickSend',
    en: 'FAQ - QuickSend'
  };
  
  const descriptions = {
    ru: 'Часто задаваемые вопросы о QuickSend - ответы про удаление треков с DSP-платформ, цены и процесс подачи заявки',
    en: 'Frequently Asked Questions about QuickSend - answers about DSP takedowns, pricing, and how the removal process works'
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