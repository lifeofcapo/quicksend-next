'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Send, Mail, FileSpreadsheet, CheckCircle, Calendar, User, Bell, Zap, Shield, Snowflake, DollarSign, TrendingUp, Settings, Rocket, Star, Crown } from 'lucide-react';

export default function Home() {
  const [language] = useState<'ru' | 'en'>('ru');

    const [emailCount, setEmailCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

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

  const t = {
    title: 'QuickSend',
    description: language === 'ru' 
      ? 'QuickSend - это современный сервис для массовой отправки электронных писем в Gmail.'
      : 'QuickSend is a modern service for mass sending emails in Gmail.',
    startFree: language === 'ru' ? 'Начать бесплатно' : 'Start for free',
    learnMore: language === 'ru' ? 'Узнать больше' : 'Learn more',
  };

    const advantages = [
    {
      icon: Zap,
      title: { ru: 'Скорость', en: 'Speed' },
      description: { ru: 'Отправка тысяч писем с молниеносной скоростью', en: 'Send thousands of emails at lightning speed' },
    },
    {
      icon: Shield,
      title: { ru: 'Безопасность', en: 'Security' },
      description: { ru: 'Защита ваших данных на высшем уровне', en: 'Top-level protection of your data' },
    },
    {
      icon: Snowflake,
      title: { ru: 'Холодные письма', en: 'Cold Emails' },
      description: { ru: 'Эффективные инструменты для холодной рассылки', en: 'Effective tools for cold emailing' },
    },
    {
      icon: DollarSign,
      title: { ru: 'Низкая цена', en: 'Low Price' },
      description: { ru: 'Доступные тарифы для любого бюджета', en: 'Affordable rates for any budget' },
    },
    {
      icon: TrendingUp,
      title: { ru: 'Аналитика', en: 'Analytics' },
      description: { ru: 'Подробная статистика по всем рассылкам', en: 'Detailed statistics for all mailings' },
    },
    {
      icon: Settings,
      title: { ru: 'Гибкая настройка', en: 'Flexible Setup' },
      description: { ru: 'Настройте отправку писем под ваши потребности', en: 'Configure email sending to your needs' },
    },
  ];

    const products = [
    {
      icon: Send,
      title: { ru: 'Массовая Рассылка в Gmail', en: 'Mass Emails in Gmail' },
      description: { 
        ru: 'Наш сервис массовой рассылки писем позволяет обойти ограничения Gmail по отправке сообщений с помощью нашей технологии распространения.',
        en: 'Our mass email service can break Gmail\'s sending limits using our distribution technology.'
      },
    },
    {
      icon: FileSpreadsheet,
      title: { ru: 'Отправка писем с Google Таблиц', en: 'Mail Merge with Google Sheets' },
      description: { 
        ru: 'Quicksend будет считывать данные в реальном времени из любой таблицы Google и даже отслеживать наличие новых строк, а затем автоматически отправлять электронные письма.',
        en: 'Quicksend will read data live from any Google Sheet and even monitor for new rows and then send emails automatically.'
      },
    },
    {
      icon: CheckCircle,
      title: { ru: 'Проверка почт', en: 'Email Verification' },
      description: { 
        ru: 'Проверьте свой список, протестируйте ссылки и устраните спам-триггеры и недействительные электронные почты перед отправкой',
        en: 'Verify your list, test links, & fix spam triggers and invalid emails before you send'
      },
    },
    {
      icon: Calendar,
      title: { ru: 'Планирование массовых рассылок и писем', en: 'Schedule Mass emails and Mail Merges' },
      description: { 
        ru: 'Запланируйте отправку писем на любое время в будущем или установите ее повторение ежедневно или ежечасно.',
        en: 'Schedule a mail merge for any time in the future, or set it to repeat daily or hourly.'
      },
    },
    {
      icon: User,
      title: { ru: 'Персонализация', en: 'Personalization' },
      description: { 
        ru: 'Подключитесь к Google Sheet и персонализируйте с помощью любого столбца или используйте базовую персонализацию имени и фамилии без электронной таблицы.',
        en: 'Connect to a Google Sheet and personalize with any column, or use basic first and last name personalization without a spreadsheet.'
      },
    },
    {
      icon: Bell,
      title: { ru: 'Автоматические последующие письма', en: 'Automatic Follow-up Emails' },
      description: { 
        ru: 'Установите автоматическую отправку последующих писем в последовательности, пока получатель не ответит. Лучший способ повысить показатели ответов.',
        en: 'Set automatic follow-up emails to send in a sequence until your recipient replies. The best way to boost response rates.'
      },
    },
  ];

    const [isAnnual, setIsAnnual] = useState(false);

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
    <>
      <div className="relative z-10">
        <Header />
        <main>
              <section id="hero-section" className="pt-32 pb-20 px-4 bg-white dark:bg-gray-900 transition-colors">
                <div className="container mx-auto text-center">
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                    {t.title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                    {t.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                      href="#"
                      className="px-8 py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition text-lg font-semibold"
                    >
                      {t.startFree}
                    </Link>
                    <Link
                      href="#whyquicksend"
                      className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-lg font-semibold"
                    >
                      {t.learnMore}
                    </Link>
                  </div>
                </div>
              </section>
              <section id="whyquicksend" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">Почему QuickSend?</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Мы гарантируем простое в использовании приложение, которое оптимизирует вашу рассылку, минимизируя число писем в спаме.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div key={idx} className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{adv.title.ru}</h3>
                <p className="text-gray-600 dark:text-gray-300">{adv.description.ru}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <section id="products" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Наши Продукты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 hover:shadow-xl transition">
                <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{product.title.ru}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description.ru}</p>
                <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  Больше деталей →
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition text-lg font-semibold">
            Добавить в Gmail
          </button>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">QuickSend требует Chrome</p>
        </div>
      </div>
    </section>
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white transition-colors">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <div>
            <p className="text-lg mb-2 opacity-90">Отправлено писем за всё время:</p>
            <span className="text-5xl md:text-6xl font-bold">{emailCount.toLocaleString()}</span>
          </div>
          <div>
            <p className="text-lg mb-2 opacity-90">Совершённые рассылки:</p>
            <span className="text-5xl md:text-6xl font-bold">{campaignCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
        <section id="pricing" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">Тарифы и Цены</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-8">
          Начните с отправки 50 писем в день бесплатно!
        </p>
        
        <div className="flex justify-center items-center mb-12 space-x-4">
          <span className={`${!isAnnual ? 'font-semibold dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Ежемесячно</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-14 h-7 rounded-full transition ${isAnnual ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${isAnnual ? 'translate-x-7' : ''}`} />
          </button>
          <span className={isAnnual ? 'font-semibold dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
            Ежегодно <span className="text-green-600 dark:text-green-400 text-sm">(Скидка 20%)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const price = isAnnual && plan.price[language] > 0 
              ? (plan.price[language] * 12 * 0.8).toFixed(0)
              : plan.price[language];
            
            return (
              <div key={idx} className={`bg-white dark:bg-gray-800 rounded-xl p-8 transition-colors ${
                plan.popular 
                  ? 'ring-2 ring-blue-600 dark:ring-blue-400 shadow-xl scale-105' 
                  : 'border border-gray-200 dark:border-gray-700'
              }`}>
                {plan.popular && (
                  <span className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    Популярный
                  </span>
                )}
                <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4 dark:text-white">{plan.name.ru}</h3>
                <div className="mb-6">
                  {plan.price[language] === 0 ? (
                    <span className="text-4xl font-bold dark:text-white">Бесплатно</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold dark:text-white">{language === 'ru' ? '₽' : '$'}{price}</span>
                      <span className="text-gray-600 dark:text-gray-400">/месяц</span>
                      {isAnnual && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          при оплате {language === 'ru' ? '₽' : '$'}{price} за год
                        </p>
                      )}
                    </>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature.ru}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/pricing" 
                  className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition ${
                    plan.buttonStyle.includes('border') 
                      ? 'border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                      : 'bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                  }`}
                >
                  {plan.buttonText.ru}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
        <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-4xl font-bold mb-8 dark:text-white">Свяжитесь с нами!</h2>
        <Mail className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
        <a href="mailto:quicksendcontact@gmail.com" className="text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition block mb-4">
          quicksendcontact@gmail.com
        </a>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Отправляйте нам предложения по улучшению, предложения о работе и сообщения об ошибках!
        </p>
      </div>
    </section>
        </main>
        <Footer />
      </div>
    </>
  );
}