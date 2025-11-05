// app/[lang]/page.tsx
import { HeroSection } from './_components/HeroSection';
import { AdvantagesSection } from './_components/AdvantagesSection';
import { ProductsSection } from './_components/ProductsSection';
import { StatsSection } from './_components/StatsSection';
import { PricingSection } from './_components/PricingSection';
import { ContactSection } from './_components/ContactSection';

const languages = ['en', 'ru'] as const;
type Language = typeof languages[number];

export default function Home({
  params
}: {
  params: { lang: Language };
}) {
  const { lang } = params;

  return (
    <div className="relative z-10">
      <main>
        <HeroSection/>
        <AdvantagesSection/>
        <ProductsSection/>
        <StatsSection/>
        <PricingSection/>
        <ContactSection/>
      </main>
    </div>
  );
}
