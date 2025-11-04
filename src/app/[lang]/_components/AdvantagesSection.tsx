'use client';
import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import { Zap, Shield, Snowflake, DollarSign, TrendingUp, Settings } from 'lucide-react';

type LangValue = {
  ru: string;
  en: string;
};

export function AdvantagesSection() {
  const { language } = useLanguage();

  const t = {
    whyTitle: language === 'ru' ? 'Почему QuickSend?' : 'Why QuickSend?',
    whyDesc: language === 'ru'
      ? 'Мы гарантируем простое в использовании приложение, которое оптимизирует вашу рассылку, минимизируя число писем в спаме.'
      : 'We guarantee an easy-to-use platform that optimizes your outreach and minimizes spam issues.',
  };

  const adv = (a: LangValue) => language === 'ru' ? a.ru : a.en;

  const advantages = [
    { icon: Zap, title: {ru:'Скорость',en:'Speed'}, desc:{ru:'Отправка тысяч писем с молниеносной скоростью',en:'Send thousands of emails at lightning speed'} },
    { icon: Shield, title:{ru:'Безопасность',en:'Security'}, desc:{ru:'Защита ваших данных на высшем уровне',en:'Top-level protection of your data'} },
    { icon: Snowflake, title:{ru:'Холодные письма',en:'Cold Emails'}, desc:{ru:'Эффективные инструменты для холодной рассылки',en:'Effective tools for cold emailing'} },
    { icon: DollarSign, title:{ru:'Низкая цена',en:'Low Price'}, desc:{ru:'Доступные тарифы для любого бюджета',en:'Affordable rates for any budget'} },
    { icon: TrendingUp, title:{ru:'Аналитика',en:'Analytics'}, desc:{ru:'Подробная статистика по всем рассылкам',en:'Detailed statistics for all mailings'} },
    { icon: Settings, title:{ru:'Гибкая настройка',en:'Flexible Setup'}, desc:{ru:'Настройте отправку писем под ваши потребности',en:'Configure email sending to your needs'} },
  ];
  return (
    <section id="whyquicksend" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors relative overflow-hidden h-[900px]">
    <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12 max-w-7xl mx-auto">
        {/* Левая часть - преимущества */}
        <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4 dark:text-white text-center lg:text-left">{t.whyTitle}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl text-center lg:text-left">{t.whyDesc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((a, i) => {
                const Icon = a.icon;
                return (
                <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
                    <div className="flex justify-center mb-3">
                    <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{adv(a.title)}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{adv(a.desc)}</p>
                </div>
                );
            })}
            </div>
        </div>
        <div className="flex-1 relative flex items-end">
            <div className="relative w-full h-[600px] lg:h-[1050px] lg:mr-[-290px]">
            <Image 
                src="/images/Group 1.png" 
                alt="Why QuickSend" 
                fill
                className="object-contain"
                quality={90}
            />
            </div>
        </div>
        </div>
        </div>
    </section>
  );
}