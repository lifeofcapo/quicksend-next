// src/app/[lang]/pricing/page.tsx
import PricingContent from './_components/PricingContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const titles = {
    ru: 'Тарифы и цены - QuickSend',
    en: 'Plans & Pricing - QuickSend'
  };
  
  const descriptions = {
    ru: 'Выберите подходящий тариф QuickSend для массовых email-рассылок. Гибкие планы от бесплатного до премиум',
    en: 'Choose the right QuickSend plan for mass email campaigns. Flexible plans from free to premium'
  };
  
  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
  };
}

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  return <PricingContent lang={lang} />;
}