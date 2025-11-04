'use client'
import { useState, useEffect } from 'react';
import { Rocket, Star, Crown, Check, X } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';

interface PlanFeature {
  textRu: string;
  textEn: string;
  included: boolean;
}

interface Plan {
  id: string;
  nameRu: string;
  nameEn: string;
  icon: typeof Rocket;
  monthlyPriceRu: number;
  monthlyPriceEn: number;
  annualPriceRu: number;
  annualPriceEn: number;
  isPopular?: boolean;
  features: PlanFeature[];
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = {
    title: language === 'ru' ? 'Тарифы и цены' : 'Plans & prices',
    subtitle: language === 'ru' ? 'Выберите тариф, который подходит именно вам!' : 'Choose the plan that works best for you!',
    pricingAdjusted: language === 'ru' ? 'Цены рассчитаны на все страны и регионы' : 'Pricing adjusted for all countries',
    monthly: language === 'ru' ? 'Ежемесячно' : 'Monthly',
    annually: language === 'ru' ? 'Ежегодно' : 'Annually',
    save: language === 'ru' ? 'Экономия 20%' : 'Save 20%',
    mostPopular: language === 'ru' ? 'Популярный' : 'Most Popular',
    perMonth: language === 'ru' ? '/мес' : '/mo',
    billedAnnually: language === 'ru' ? 'при годовой оплате' : 'billed annually',
    startFree: language === 'ru' ? 'Начать бесплатно' : 'Start Free',
    choosePlan: language === 'ru' ? 'Выбрать' : 'Choose',
  };

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
      return language === 'ru' 
        ? `₽${plan.annualPriceRu}${t.perMonth}` 
        : `$${plan.annualPriceEn}${t.perMonth}`;
    }
    return language === 'ru' 
      ? plan.monthlyPriceRu === 0 ? 'Бесплатно' : `₽${plan.monthlyPriceRu}${t.perMonth}`
      : plan.monthlyPriceEn === 0 ? 'Free' : `$${plan.monthlyPriceEn}${t.perMonth}`;
  };

  const getPlanName = (plan: Plan) => {
    return language === 'ru' ? plan.nameRu : plan.nameEn;
  };

  const getFeatureText = (feature: PlanFeature) => {
    return language === 'ru' ? feature.textRu : feature.textEn;
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t.title}
              </h1>
              <p className="text-xl text-white/90">
                {t.subtitle}
              </p>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              {t.pricingAdjusted}
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                {t.monthly}
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isAnnual ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    isAnnual ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                {t.annually}
                <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {t.save}
                </span>
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-transform hover:-translate-y-2 ${
                      plan.isPopular ? 'border-2 border-blue-500' : ''
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-4 right-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {t.mostPopular}
                      </div>
                    )}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {getPlanName(plan)}
                        </h2>
                      </div>
                      <div className="text-center py-4">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                          {getPrice(plan)}
                        </div>
                        {isAnnual && plan.id !== 'trial' && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {t.billedAnnually}
                          </div>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-3 ${
                            feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                          }`}
                        >
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          )}
                          <span className="text-sm">{getFeatureText(feature)}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-3 rounded-lg font-semibold transition ${
                        plan.isPopular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600'
                      }`}
                    >
                      {plan.id === 'trial' ? t.startFree : `${t.choosePlan} ${getPlanName(plan)}`}
                    </button>
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