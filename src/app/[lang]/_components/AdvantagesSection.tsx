// src/app/[lang]/_components/AdvantagesSection.tsx
'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { Zap, Shield, Clock, DollarSign, FileCheck, Headphones } from 'lucide-react';

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
    <section
      id="whyquicksend"
      className="py-16 px-4 bg-gray-50 dark:bg-gray-800 transition-colors relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-linear-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl dark:opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-linear-to-tr from-cyan-400/10 to-[#AEE5C2]/10 rounded-full blur-3xl dark:opacity-20" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {t('whyTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('whyDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map(({ icon: Icon, titleKey, descKey }, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-700 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-500/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">
                {t(titleKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}