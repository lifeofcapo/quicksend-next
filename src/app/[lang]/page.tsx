// src/app/[lang]/page.tsx
import { HeroSection } from './_components/HeroSection';
import { AdvantagesSection } from './_components/AdvantagesSection';
import DspTakedownSection from './_components/DspTakedownSection';
import { PricingSection } from './_components/PricingSection';
import { StatsSection } from './_components/StatsSection';
import { ContactSection } from './_components/ContactSection';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  await params;

  return (
    <div className="relative z-10">
      <main className="grow">
        <HeroSection />
        <AdvantagesSection />
        <DspTakedownSection />
        <PricingSection />
        <StatsSection />
        <ContactSection />
      </main>
    </div>
  );
}