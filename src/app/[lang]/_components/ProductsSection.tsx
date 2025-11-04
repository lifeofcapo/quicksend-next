'use client';
import { useLanguage } from '@/contexts/language-context';
import Link from 'next/link';
import { Send, FileSpreadsheet, CheckCircle, Calendar, User, Bell } from 'lucide-react';

type LangValue = {
  ru: string;
  en: string;
};

export function ProductsSection() {
  const { language } = useLanguage();

  const t = {
    productsTitle: language === 'ru' ? 'Наши Продукты' : 'Our Products',
    moreDetails: language === 'ru' ? 'Больше деталей →' : 'More details →',
    addToGmail: language === 'ru' ? 'Добавить в Gmail' : 'Add to Gmail',
    chromeRequired: language === 'ru' ? 'QuickSend требует Chrome' : 'QuickSend requires Chrome',
  };

  const pl = (p: LangValue) => language === 'ru' ? p.ru : p.en;

  const products = [
    { icon: Send, title:{ru:'Массовая Рассылка в Gmail',en:'Mass Emails in Gmail'}, desc:{ru:'Наш сервис массовой рассылки писем позволяет обойти ограничения Gmail по отправке сообщений с помощью нашей технологии распространения.',en:'Our mass email service can break Gmail sending limits using our distribution technology.'} },
    { icon: FileSpreadsheet, title:{ru:'Отправка писем с Google Таблиц',en:'Mail Merge with Google Sheets'}, desc:{ru:'Quicksend будет считывать данные в реальном времени из любой таблицы Google и даже отслеживать наличие новых строк, а затем автоматически отправлять электронные письма.',en:'Quicksend will read data live from any Google Sheet and even monitor for new rows and then send emails automatically.'} },
    { icon: CheckCircle, title:{ru:'Валидация почт',en:'Email Verification'}, desc:{ru:'Проверьте свой список, протестируйте ссылки и устраните спам-триггеры и недействительные электронные почты перед отправкой',en:'Verify your list, test links, & fix spam triggers and invalid emails before you send'} },
    { icon: Calendar, title:{ru:'Планирование массовых рассылок и писем',en:'Schedule Mass emails and Mail Merges'}, desc:{ru:'Запланируйте отправку писем на любое время в будущем или установите ее повторение ежедневно или ежечасно.',en:'Schedule a mail merge for any time in the future, or set it to repeat daily or hourly.'} },
    { icon: User, title:{ru:'Персонализация',en:'Personalization'}, desc:{ru:'Подключитесь к Google Sheet и персонализируйте с помощью любого столбца или используйте базовую персонализацию имени и фамилии без электронной таблицы. Используйте резервные значения. Не знаете чье-то имя? Мы автоматически его определим.',en:'Connect to a Google Sheet and personalize with any column, or use basic first and last name personalization without a spreadsheet. Use fallback values. Do not know someones first name? We will auto-detect it.'} },
    { icon: Bell, title:{ru:'Автоматические последующие письма',en:'Automatic Follow-up Emails'}, desc:{ru:'Установите автоматическую отправку последующих писем в последовательности, пока получатель не ответит. Лучший способ повысить показатели ответов.',en:'Sending cold email? Set automatic follow-up emails to send in a sequence until your recipient replies. The best way to boost response rates.'} },
  ];


  return (
<section id="products" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">{t.productsTitle}</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p, i) => {
        const Icon = p.icon;
        return (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 hover:shadow-xl transition text-center">
            <div className="flex justify-center mb-3">
              <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
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
  );
}