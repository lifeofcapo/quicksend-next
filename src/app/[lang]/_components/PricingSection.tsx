'use client';
import { useLanguage } from '@/contexts/language-context';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rocket, Star, Crown } from 'lucide-react';

type LangValue = {
  ru: string;
  en: string;
};

export function PricingSection() {
  const { language } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(false);

  const t = {
    pricing: language === 'ru' ? 'Тарифы и Цены' : 'Pricing & Plans',
    pricingSub: language === 'ru'
      ? 'Начните с отправки 50 писем в день бесплатно!'
      : 'Start by sending 50 emails per day for free!',
    monthly: language === 'ru' ? 'Ежемесячно' : 'Monthly',
    annually: language === 'ru' ? 'Ежегодно' : 'Annually',
    discount: language === 'ru' ? '(Скидка 20%)' : '(20% discount)',
    popular: language === 'ru' ? 'Популярный' : 'Popular',
    free: language === 'ru' ? 'Бесплатно' : 'Free',
    perMonth: language === 'ru' ? '/месяц' : '/month',
    payYear: language === 'ru' ? 'при оплате' : 'when paying',
    perYear: language === 'ru' ? 'за год' : 'per year',
  };

  const pl = (p: LangValue) => language === 'ru' ? p.ru : p.en;

  const plans = [
    {
      icon: Rocket, name:{ru:'Пробный период',en:'Trial'},
      price:{ru:0,en:0},
      features:[{ru:'50 писем/день',en:'50 emails/day'},{ru:'Базовые функции',en:'Basic features'},{ru:'Email поддержка',en:'Email support'}],
      button:{ru:'Начать',en:'Start'},
      popular:false
    },
    {
      icon: Star, name:{ru:'Стандарт',en:'Standard'},
      price:{ru:990,en:11.50},
      features:[{ru:'500 писем/день',en:'500 emails/day'},{ru:'Расширенные функции',en:'Advanced features'},{ru:'Приоритетная поддержка',en:'Priority support'}],
      button:{ru:'Выбрать стандарт',en:'Choose Standard'},
      popular:true
    },
    {
      icon: Crown, name:{ru:'Премиум',en:'Premium'},
      price:{ru:1990,en:19.99},
      features:[{ru:'Безлимитные письма',en:'Unlimited emails'},{ru:'Все функции',en:'All features'},{ru:'Приоритетная поддержка',en:'Priority support'}],
      button:{ru:'Выбрать премиум',en:'Choose Premium'},
      popular:false
    },
  ];

  return ( 
          <section id="pricing" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-[-25px] flex justify-center pointer-events-none">
              <div className="relative w-full max-w-3xl opacity-80 dark:opacity-60 mix-blend-multiply dark:mix-blend-screen translate-x-[-300px]">
                <Image
                  src="/images/businesswoman.png"
                  alt="Background"
                  width={900}
                  height={900}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            
            <div className="container mx-auto relative z-10">
              <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">{t.pricing}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-6">{t.pricingSub}</p>

              <div className="flex justify-center items-center mb-8 space-x-4">
                <span className={`${!isAnnual ? 'font-semibold dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{t.monthly}</span>
                <button onClick={() => setIsAnnual(!isAnnual)} className={`relative w-14 h-7 rounded-full transition ${isAnnual ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${isAnnual ? 'translate-x-7' : ''}`} />
                </button>
                <span className={isAnnual ? 'font-semibold dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                  {t.annually} <span className="text-green-600 dark:text-green-400 text-sm">{t.discount}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {plans.map((plan, idx) => {
                  const Icon = plan.icon;
                  const price = isAnnual && plan.price[language] > 0
                    ? (plan.price[language] * 12 * 0.8).toFixed(0)
                    : plan.price[language];

                  return (
                      <div key={idx} className={`rounded-xl p-6 transition-all border ${
                        plan.popular 
                          ? 'ring-2 ring-blue-600 dark:ring-blue-400 shadow-xl scale-105 bg-white/70 dark:bg-gray-800/60 border-blue-200 dark:border-blue-800' 
                          : 'border-gray-300/40 dark:border-gray-600/40 shadow-lg bg-white/60 dark:bg-gray-800/50'
                      }`}>
                      {plan.popular && <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">{t.popular}</span>}

                      <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3" />
                      <h3 className="text-xl font-bold mb-3 dark:text-white">{pl(plan.name)}</h3>

                      <div className="mb-4">
                        {plan.price[language] === 0 ? (
                          <span className="text-3xl font-bold dark:text-white">{t.free}</span>
                        ) : (
                          <>
                            <span className="text-3xl font-bold dark:text-white">{language === 'ru' ? '₽' : '$'}{price}</span>
                            <span className="text-gray-600 dark:text-gray-400">{t.perMonth}</span>

                            {isAnnual && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {t.payYear} {language === 'ru' ? '₽' : '$'}{price} {t.perYear}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {pl(feature)}
                          </li>
                        ))}
                      </ul>

                      <Link href="/pricing" className="block w-full py-2 px-4 rounded-lg text-center font-semibold transition bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600">
                        {pl(plan.button)}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
            );
}