// app/[lang]/page.tsx
import { HeroSection } from './_components/HeroSection';
import { AdvantagesSection } from './_components/AdvantagesSection';
import { ProductsSection } from './_components/ProductsSection';
import { StatsSection } from './_components/StatsSection';
import { ContactSection } from './_components/ContactSection';
import DspTakedownSection from './_components/DspTakedownSection';


export default async function Home({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <div className="relative z-10">
      <main className="flex-grow">
        <HeroSection />
        <AdvantagesSection />
        <ProductsSection />
        <DspTakedownSection />
        <StatsSection />
        <ContactSection />
      </main>
    </div>
  );
}