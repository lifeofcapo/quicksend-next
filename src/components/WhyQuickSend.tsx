import { Zap, Shield, Snowflake, DollarSign, TrendingUp, Settings } from 'lucide-react';

export default function WhyQuickSend() {
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

  return (
    <section id="whyquicksend" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Почему QuickSend?</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Мы гарантируем простое в использовании приложение, которое оптимизирует вашу рассылку, минимизируя число писем в спаме.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <Icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{adv.title.ru}</h3>
                <p className="text-gray-600">{adv.description.ru}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}