// src/app/[lang]/pricing/_components/PricingContent.tsx
'use client';

import { useState } from 'react';
import { Rocket, Star, Crown, Check, X} from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';
import { PlanFeature, Plan, PricingContentProps } from '../../../../types/interface';

export default function PricingContent({ lang }: PricingContentProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const plans: Plan[] = [
    {
      id: 'trial',
      nameRu: 'Пробный',
      nameEn: 'Trial',
      icon: Rocket,
      monthlyPriceRu: 0,
      monthlyPriceEn: 0,
      annualPriceRu: 0,
      annualPriceEn: 0,
      features: [
        { textRu: 'Работает внутри Gmail', textEn: 'Works inside Gmail', included: true },
        { textRu: '50 получателей/день', textEn: '50 emails/day', included: true },
        { textRu: '10 Писем', textEn: '10 Campaigns', included: true },
        { textRu: 'Базовая персонализация', textEn: 'Basic personalization', included: true },
        { textRu: 'Подключение таблиц', textEn: 'Spreadsheet integration', included: false },
        { textRu: 'Верификация почты', textEn: 'Email verification', included: false },
        { textRu: 'Последовательности', textEn: 'Sequences', included: false },
        { textRu: 'Email поддержка', textEn: 'Email support', included: true },
        { textRu: 'Приоритетная поддержка', textEn: 'Priority support', included: false },
      ]
    },
    {
      id: 'standard',
      nameRu: 'Стандартный',
      nameEn: 'Standard',
      icon: Star,
      monthlyPriceRu: 990,
      monthlyPriceEn: 11.5,
      annualPriceRu: 792,
      annualPriceEn: 9.2,
      isPopular: true,
      features: [
        { textRu: 'Работает внутри Gmail', textEn: 'Works inside Gmail', included: true },
        { textRu: '500 получателей/день', textEn: '500 emails/day', included: true },
        { textRu: '500 Писем', textEn: '500 Campaigns', included: true },
        { textRu: 'Расширенная персонализация', textEn: 'Advanced personalization', included: true },
        { textRu: 'Подключение таблиц', textEn: 'Spreadsheet integration', included: true },
        { textRu: 'Верификация почты', textEn: 'Email verification', included: true },
        { textRu: 'Базовые последовательности', textEn: 'Basic sequences', included: true },
        { textRu: 'Email поддержка', textEn: 'Email support', included: true },
        { textRu: 'Приоритетная поддержка', textEn: 'Priority support', included: true },
      ]
    },
    {
      id: 'premium',
      nameRu: 'Премиум',
      nameEn: 'Premium',
      icon: Crown,
      monthlyPriceRu: 1990,
      monthlyPriceEn: 21,
      annualPriceRu: 1592,
      annualPriceEn: 16.8,
      features: [
        { textRu: 'Работает внутри Gmail', textEn: 'Works inside Gmail', included: true },
        { textRu: 'Безлимитные письма', textEn: 'Unlimited emails', included: true },
        { textRu: 'Безлимитные кампании', textEn: 'Unlimited campaigns', included: true },
        { textRu: 'Продвинутая персонализация', textEn: 'Advanced personalization', included: true },
        { textRu: 'Подключение таблиц', textEn: 'Advanced spreadsheet integration', included: true },
        { textRu: 'Продвинутая верификация', textEn: 'Advanced verification', included: true },
        { textRu: 'Продвинутые последовательности', textEn: 'Advanced sequences', included: true },
        { textRu: 'Email поддержка', textEn: 'Email support', included: true },
        { textRu: 'Приоритетная поддержка', textEn: 'Priority support', included: true },
      ]
    }
  ];

  const getPrice = (plan: Plan) => {
    if (isAnnual) {
      return lang === 'ru' 
        ? `₽${plan.annualPriceRu}${t('perMonth')}` 
        : `$${plan.annualPriceEn}${t('perMonth')}`;
    }
    return lang === 'ru' 
      ? plan.monthlyPriceRu === 0 ? 'Бесплатно' : `₽${plan.monthlyPriceRu}${t('perMonth')}`
      : plan.monthlyPriceEn === 0 ? 'Free' : `$${plan.monthlyPriceEn}${t('perMonth')}`;
  };

  const getPlanName = (plan: Plan) => {
    return lang === 'ru' ? plan.nameRu : plan.nameEn;
  };

  const getFeatureText = (feature: PlanFeature) => {
    return lang === 'ru' ? feature.textRu : feature.textEn;
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <main className="pt-24 pb-32 px-4 relative">
          <div className="absolute inset-x-0 bottom-0 h-[600px] pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-gray-50 via-transparent to-transparent dark:from-gray-900 dark:via-transparent z-10 opacity-70"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-40 dark:opacity-30">
              <Image
                src="/images/businesswoman.png"
                alt="Background"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>

          <div className="container mx-auto max-w-7xl relative z-20">
            <div className="relative bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] dark:from-blue-600 dark:via-cyan-500 dark:to-[#8ED8A8] rounded-2xl p-8 md:p-12 mb-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 via-cyan-300/20 to-[#AEE5C2]/20"></div>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">
                {t('pricing')}
              </h1>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              {t('pricingSub')}
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                {t('monthly')}
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="group relative w-14 h-7 rounded-full bg-linear-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-400 transition-opacity duration-300 ${isAnnual ? 'opacity-100' : 'opacity-0'}`}></div>
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-md ${
                    isAnnual ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                  {t('annually')}
                </span>
                <span className="px-2 py-1 bg-linear-to-r from-blue-500 to-cyan-400 text-white text-xs rounded-full font-semibold">
                  -20%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl ${
                      plan.isPopular 
                        ? 'border-2 border-blue-400/50' 
                        : 'border border-gray-200/30 dark:border-gray-700/30'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl"></div>
                    
                    {plan.isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                        <div className="bg-linear-to-r from-blue-500 to-cyan-400 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap">
                          {t('popular')}
                        </div>
                      </div>
                    )}

                    {plan.isPopular && (
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-cyan-400/10 to-[#AEE5C2]/10 rounded-2xl"></div>
                    )}

                    <div className="relative z-10">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-cyan-400 blur-md opacity-30"></div>
                            <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 relative" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {getPlanName(plan)}
                          </h2>
                        </div>
                        
                        <div className="text-center py-4">
                          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {getPrice(plan)}
                          </div>
                          {isAnnual && plan.id !== 'trial' && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {t('annually')}
                            </div>
                          )}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-3 ${
                              feature.included ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-500'
                            }`}
                          >
                            {feature.included ? (
                              <div className="relative shrink-0 mt-0.5">
                                <Check className="w-5 h-5 text-green-500 relative z-10" />
                                <div className="absolute inset-0 bg-green-500 blur-sm opacity-20"></div>
                              </div>
                            ) : (
                              <div className="relative shrink-0 mt-0.5">
                                <X className="w-5 h-5 text-red-500 relative z-10" />
                                <div className="absolute inset-0 bg-red-500 blur-sm opacity-20"></div>
                              </div>
                            )}
                            <span className="text-sm">{getFeatureText(feature)}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        className={`group relative w-full py-3 rounded-lg font-semibold transition-all duration-300 overflow-hidden ${
                          plan.isPopular
                            ? 'bg-linear-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500'
                            : 'bg-linear-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600 text-white hover:from-gray-900 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-500'
                        }`}
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        <span className="relative">
                          {plan.id === 'trial' ? t('startFree') : `${t('choose')} ${getPlanName(plan)}`}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}