'use client';

import { useState } from 'react';
import { Rocket, Star, Crown } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [language] = useState<'ru' | 'en'>('ru');

  const plans = [
    {
      icon: Rocket,
      name: { ru: 'Пробный период', en: 'Trial Period' },
      price: { ru: 0, en: 0 },
      features: [
        { ru: '50 писем/день', en: '50 emails/day' },
        { ru: 'Базовые функции', en: 'Basic features' },
        { ru: 'Email поддержка', en: 'Email support' },
      ],
      buttonText: { ru: 'Начать', en: 'Start trial' },
      buttonStyle: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    },
    {
      icon: Star,
      name: { ru: 'Стандартный режим', en: 'Standard Plan' },
      price: { ru: 990, en: 11.50 },
      features: [
        { ru: '500 писем/день', en: '500 emails/day' },
        { ru: 'Расширенные функции', en: 'Advanced features' },
        { ru: 'Приоритетная поддержка', en: 'Priority support' },
      ],
      buttonText: { ru: 'Выбрать стандартный', en: 'Choose standard' },
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      popular: true,
    },
    {
      icon: Crown,
      name: { ru: 'Премиум режим', en: 'Premium Plan' },
      price: { ru: 1990, en: 19.99 },
      features: [
        { ru: 'Безлимитные письма', en: 'Unlimited emails' },
        { ru: 'Все функции', en: 'All features' },
        { ru: 'Приоритетная поддержка', en: 'Priority support' },
      ],
      buttonText: { ru: 'Выбрать премиум', en: 'Choose premium' },
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Тарифы и Цены</h2>
        <p className="text-xl text-gray-600 text-center mb-8">
          Начните с отправки 50 писем в день бесплатно!
        </p>
        
        <div className="flex justify-center items-center mb-12 space-x-4">
          <span className={!isAnnual ? 'font-semibold' : 'text-gray-500'}>Ежемесячно</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-14 h-7 rounded-full transition ${isAnnual ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${isAnnual ? 'translate-x-7' : ''}`} />
          </button>
          <span className={isAnnual ? 'font-semibold' : 'text-gray-500'}>
            Ежегодно <span className="text-green-600 text-sm">(Скидка 20%)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const price = isAnnual && plan.price[language] > 0 
              ? (plan.price[language] * 12 * 0.8).toFixed(0)
              : plan.price[language];
            
            return (
              <div key={idx} className={`bg-white rounded-xl p-8 ${plan.popular ? 'ring-2 ring-blue-600 shadow-xl scale-105' : 'border border-gray-200'}`}>
                {plan.popular && (
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    Популярный
                  </span>
                )}
                <Icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">{plan.name.ru}</h3>
                <div className="mb-6">
                  {plan.price[language] === 0 ? (
                    <span className="text-4xl font-bold">Бесплатно</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">{language === 'ru' ? '₽' : '$'}{price}</span>
                      <span className="text-gray-600">/месяц</span>
                      {isAnnual && (
                        <p className="text-sm text-gray-500 mt-2">
                          при оплате {language === 'ru' ? '₽' : '$'}{price} за год
                        </p>
                      )}
                    </>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature.ru}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition ${plan.buttonStyle}`}>
                  {plan.buttonText.ru}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}