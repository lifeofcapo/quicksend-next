'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Send, Mail, FileSpreadsheet, CheckCircle, Calendar, User, Bell, Zap, Shield, Snowflake, DollarSign, TrendingUp, Settings, Rocket, Star, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

type LangValue = {
  ru: string;
  en: string;
};

export default function Home() {
  const { language } = useLanguage();
  const [emailCount, setEmailCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);
  const [isAnnual, setIsAnnual] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const emailTarget = 1234567;
    const campaignTarget = 45678;
    const duration = 2000;
    const steps = 60;
    const emailIncrement = emailTarget / steps;
    const campaignIncrement = campaignTarget / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setEmailCount(Math.floor(emailIncrement * currentStep));
      setCampaignCount(Math.floor(campaignIncrement * currentStep));

      if (currentStep >= steps) {
        clearInterval(timer);
        setEmailCount(emailTarget);
        setCampaignCount(campaignTarget);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Перезапуск видео при монтировании компонента
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const t = {
    title: 'QuickSend',
    description: language === 'ru'
      ? 'QuickSend - это современный сервис для массовой отправки электронных писем в Gmail.'
      : 'QuickSend is a modern service for mass sending emails in Gmail.',
    startFree: language === 'ru' ? 'Начать бесплатно' : 'Start for free',
    learnMore: language === 'ru' ? 'Узнать больше' : 'Learn more',

    whyTitle: language === 'ru' ? 'Почему QuickSend?' : 'Why QuickSend?',
    whyDesc: language === 'ru'
      ? 'Мы гарантируем простое в использовании приложение, которое оптимизирует вашу рассылку, минимизируя число писем в спаме.'
      : 'We guarantee an easy-to-use platform that optimizes your outreach and minimizes spam issues.',

    productsTitle: language === 'ru' ? 'Наши Продукты' : 'Our Products',
    moreDetails: language === 'ru' ? 'Больше деталей →' : 'More details →',
    addToGmail: language === 'ru' ? 'Добавить в Gmail' : 'Add to Gmail',
    chromeRequired: language === 'ru' ? 'QuickSend требует Chrome' : 'QuickSend requires Chrome',

    statsEmails: language === 'ru' ? 'Отправлено писем за всё время:' : 'Emails sent all-time:',
    statsCampaigns: language === 'ru' ? 'Совершённые рассылки:' : 'Completed campaigns:',

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

    contactUs: language === 'ru' ? 'Свяжитесь с нами!' : 'Contact Us!',
    feedback: language === 'ru'
      ? 'Отправляйте нам предложения по улучшению, предложения о работе и сообщения об ошибках!'
      : 'Send us improvement suggestions, job inquiries, and bug reports!',
  };

  const adv = (a: LangValue) => language === 'ru' ? a.ru : a.en;
  const pl = (p: LangValue) => language === 'ru' ? p.ru : p.en;

  const advantages = [
    { icon: Zap, title: {ru:'Скорость',en:'Speed'}, desc:{ru:'Отправка тысяч писем...',en:'Send thousands...'} },
    { icon: Shield, title:{ru:'Безопасность',en:'Security'}, desc:{ru:'Защита данных...',en:'Top-level protection...'} },
    { icon: Snowflake, title:{ru:'Холодные письма',en:'Cold Emails'}, desc:{ru:'Инструменты холодной...',en:'Cold emailing tools...'} },
    { icon: DollarSign, title:{ru:'Низкая цена',en:'Low Price'}, desc:{ru:'Доступные тарифы...',en:'Affordable plans...'} },
    { icon: TrendingUp, title:{ru:'Аналитика',en:'Analytics'}, desc:{ru:'Подробная статистика...',en:'Detailed stats...'} },
    { icon: Settings, title:{ru:'Гибкая настройка',en:'Flexible Setup'}, desc:{ru:'Настройте под себя...',en:'Customize sending...'} },
  ];

  const products = [
    { icon: Send, title:{ru:'Массовая Рассылка',en:'Mass Emails'}, desc:{ru:'Обход лимитов Gmail...',en:'Break Gmail limits...'} },
    { icon: FileSpreadsheet, title:{ru:'Google Таблицы',en:'Google Sheets'}, desc:{ru:'Чтение данных...',en:'Reads Sheets data...'} },
    { icon: CheckCircle, title:{ru:'Проверка почт',en:'Email Verification'}, desc:{ru:'Проверка списка...',en:'Verify list...'} },
    { icon: Calendar, title:{ru:'Планирование',en:'Scheduling'}, desc:{ru:'Планируйте отправку...',en:'Schedule campaigns...'} },
    { icon: User, title:{ru:'Персонализация',en:'Personalization'}, desc:{ru:'Персонализация писем...',en:'Personalized emails...'} },
    { icon: Bell, title:{ru:'Автодоводы',en:'Follow-ups'}, desc:{ru:'Автоматические follow-up...',en:'Automatic follow-ups...'} },
  ];

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
    <>
      <div className="relative z-10">
        <Header />
        <main>
          {/* Hero Section - исправленная */}
          <section id="hero-section" className="pt-32 pb-20 px-4 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
                <div className="relative w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] flex-shrink-0 order-1 lg:order-1">
                  <Image 
                    src="/images/image.png" 
                    alt="Hero Left" 
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                <div className="text-center max-w-xl flex-1 order-2 lg:order-2">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">{t.title}</h1>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">{t.description}</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="#" className="px-8 py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition text-lg font-semibold">{t.startFree}</Link>
                    <Link href="#whyquicksend" className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-lg font-semibold">{t.learnMore}</Link>
                  </div>
                </div>
                
                <div className="relative w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] flex-shrink-0 order-3 lg:order-3">
                  <Image 
                    src="/images/image (1) (1).png" 
                    alt="Hero Right" 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Why QuickSend Section - исправленная */}
          <section id="whyquicksend" className="py-16 px-4 bg-gray-50 dark:bg-gray-800 transition-colors relative overflow-hidden">
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20 dark:opacity-10 w-64 h-64">
              <Image 
                src="/images/Group 1.png" 
                alt="Background" 
                fill
                className="object-contain"
                quality={75}
              />
            </div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">{t.whyTitle}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">{t.whyDesc}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advantages.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                      <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3" />
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{adv(a.title)}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{adv(a.desc)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section id="products" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">{t.productsTitle}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 hover:shadow-xl transition">
                      <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3" />
                      <h3 className="text-xl font-semibold mb-3 dark:text-white">{pl(p.title)}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{pl(p.desc)}</p>
                      <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">{t.moreDetails}</Link>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-8">
                <button className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition text-lg font-semibold">{t.addToGmail}</button>
                <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">{t.chromeRequired}</p>
              </div>
            </div>
          </section>

          {/* Stats Section - уменьшенная высота */}
          <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white transition-colors">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="relative w-full h-[180px]">
                  <Image 
                    src="/images/Team goals-rafiki.png" 
                    alt="Team Goals" 
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-base mb-1 opacity-90">{t.statsEmails}</p>
                    <span className="text-3xl md:text-4xl font-bold">{emailCount.toLocaleString()}</span>
                  </div>
                  <div>
                    <p className="text-base mb-1 opacity-90">{t.statsCampaigns}</p>
                    <span className="text-3xl md:text-4xl font-bold">{campaignCount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="relative w-full h-[180px]">
                  <Image 
                    src="/images/Investment data-rafiki.png" 
                    alt="Investment Data" 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section - исправленная */}
          <section id="pricing" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-3">
              <div className="relative w-full h-full max-w-2xl max-h-2xl">
                <Image 
                  src="/images/businesswoman.svg" 
                  alt="Background" 
                  fill
                  className="object-contain"
                  quality={90}
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
                    <div key={idx} className={`backdrop-blur-md rounded-xl p-6 transition-all border ${
                      plan.popular 
                        ? 'ring-2 ring-blue-600 dark:ring-blue-400 shadow-xl scale-105 bg-white/10 dark:bg-gray-800/10 border-blue-200 dark:border-blue-800' 
                        : 'border-gray-300/50 dark:border-gray-600/50 shadow-lg bg-white/5 dark:bg-gray-800/5'
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

<section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors">
  <div className="container mx-auto text-center max-w-4xl">
    <h2 className="text-4xl font-bold mb-8 dark:text-white">{t.contactUs}</h2>
    <Mail className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
    <a href="mailto:quicksendcontact@gmail.com" className="text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition block mb-4">
      quicksendcontact@gmail.com
    </a>
    <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">{t.feedback}</p>
    
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/images/5.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</section>

        </main>
        <Footer />
      </div>
    </>
  );
}