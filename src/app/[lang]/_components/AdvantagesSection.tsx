// src/app/[lang]/_components/AdvantagesSection.tsx
'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { Zap, Shield, Clock, DollarSign, FileCheck, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ADVANTAGES = [
  { icon: Zap,         titleKey: 'advantages.speed',       descKey: 'advantages.speedDesc' },
  { icon: Shield,      titleKey: 'advantages.security',    descKey: 'advantages.securityDesc' },
  { icon: Clock,       titleKey: 'advantages.fastResult',  descKey: 'advantages.fastResultDesc' },
  { icon: DollarSign,  titleKey: 'advantages.lowPrice',    descKey: 'advantages.lowPriceDesc' },
  { icon: FileCheck,   titleKey: 'advantages.legal',       descKey: 'advantages.legalDesc' },
  { icon: Headphones,  titleKey: 'advantages.support',     descKey: 'advantages.supportDesc' },
];

export function AdvantagesSection() {
  const { t } = useTranslation();

  return (
    <section id="whyquicksend" className="py-16 px-4 bg-secondary/40">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t('whyTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('whyDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADVANTAGES.map(({ icon: Icon, titleKey, descKey }, i) => (
            <Card key={i} className="p-6 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1.5 text-foreground">
                {t(titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(descKey)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}