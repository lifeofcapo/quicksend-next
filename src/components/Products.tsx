import { Send, FileSpreadsheet, CheckCircle, Calendar, User, Bell } from 'lucide-react';
import Link from 'next/link';

export default function Products() {
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

  return (
    <section id="products" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Наши Продукты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-xl transition">
                <Icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{product.title.ru}</h3>
                <p className="text-gray-600 mb-4">{product.description.ru}</p>
                <Link href="/faq" className="text-blue-600 hover:text-blue-700 font-medium">
                  Больше деталей →
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
            Добавить в Gmail
          </button>
          <p className="text-gray-500 mt-4 text-sm">QuickSend требует Chrome</p>
        </div>
      </div>
    </section>
  );
}