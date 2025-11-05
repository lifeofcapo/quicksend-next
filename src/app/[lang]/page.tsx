// app/[lang]/page.tsx
import { HeroSection } from './_components/HeroSection';
import { AdvantagesSection } from './_components/AdvantagesSection';
import { ProductsSection } from './_components/ProductsSection';
import { StatsSection } from './_components/StatsSection';
import { PricingSection } from './_components/PricingSection';
import { ContactSection } from './_components/ContactSection';

export default async function Home({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <div className="relative z-10">
      <main>
        <HeroSection />
        <AdvantagesSection />
        <ProductsSection />
        <StatsSection />
        <PricingSection />
        <ContactSection />
      </main>
    </div>
  );
}