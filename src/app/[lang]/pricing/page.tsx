// src/app/[lang]/pricing/page.tsx
import PricingContent from './_components/PricingContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const titles = {
    ru: 'Цены на DSP Takedown — QuickSend',
    en: 'DSP Takedown Pricing — QuickSend',
  };
  const descriptions = {
    ru: 'Первый снос бесплатно. Затем от $25 за takedown. Скидки при покупке пакетов.',
    en: 'First takedown is free. Then from $25 per takedown. Volume discounts available.',
  };
  return {
    title: titles[lang as keyof typeof titles] ?? titles.en,
    description: descriptions[lang as keyof typeof descriptions] ?? descriptions.en,
  };
}

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <PricingContent lang={lang} />;
}