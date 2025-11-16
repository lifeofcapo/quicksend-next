'use client';
import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { Zap, Shield, Snowflake, DollarSign, TrendingUp, Settings } from 'lucide-react';
import HeroLottieAnimation from '@/components/HeroLottieAnimation';

type LangValue = {
  ru: string;
  en: string;
};

export function AdvantagesSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const advantages = [
    { 
      icon: Zap, 
      titleKey: 'advantages.speed',
      descKey: 'advantages.speedDesc'
    },
    { 
      icon: Shield, 
      titleKey: 'advantages.security',
      descKey: 'advantages.securityDesc'
    },
    { 
      icon: Snowflake, 
      titleKey: 'advantages.coldEmails',
      descKey: 'advantages.coldEmailsDesc'
    },
    { 
      icon: DollarSign, 
      titleKey: 'advantages.lowPrice',
      descKey: 'advantages.lowPriceDesc'
    },
    { 
      icon: TrendingUp, 
      titleKey: 'advantages.analytics',
      descKey: 'advantages.analyticsDesc'
    },
    { 
      icon: Settings, 
      titleKey: 'advantages.flexibleSetup',
      descKey: 'advantages.flexibleSetupDesc'
    },
  ];
  return (
    <section id="whyquicksend" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors relative overflow-hidden h-[900px]">
      <HeroLottieAnimation /> 
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12 max-w-7xl mx-auto">
          {/* Левая часть - преимущества */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4 dark:text-white text-center lg:text-left">
              {t('whyTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl text-center lg:text-left">
              {t('whyDesc')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advantages.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
                    <div className="flex justify-center mb-3">
                      <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      {t(a.titleKey)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t(a.descKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        <div className="flex-1 relative flex items-end">
            <div className="relative w-full">
            </div>
        </div>
        </div>
        </div>
    </section>
  );
}