'use client';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { Send, FileSpreadsheet, CheckCircle, Calendar, User, Bell } from 'lucide-react';

export function ProductsSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const products = [
    { 
      icon: Send, 
      titleKey: 'products.massEmails',
      descKey: 'products.massEmailsDesc'
    },
    { 
      icon: FileSpreadsheet, 
      titleKey: 'products.mailMerge',
      descKey: 'products.mailMergeDesc'
    },
    { 
      icon: CheckCircle, 
      titleKey: 'products.emailVerification',
      descKey: 'products.emailVerificationDesc'
    },
    { 
      icon: Calendar, 
      titleKey: 'products.scheduling',
      descKey: 'products.schedulingDesc'
    },
    { 
      icon: User, 
      titleKey: 'products.personalization',
      descKey: 'products.personalizationDesc'
    },
    { 
      icon: Bell, 
      titleKey: 'products.followUps',
      descKey: 'products.followUpsDesc'
    },
  ];

  return (
    <section id="products" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          {t('productsTitle')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <div 
                key={i} 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 hover:shadow-xl transition text-center"
              >
                <div className="flex justify-center mb-3">
                  <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">
                  {t(product.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(product.descKey)}
                </p>
                <Link 
                  href={`/${language}/faq`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  {t('moreDetails')}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition text-lg font-semibold">
            {t('addToGmail')}
          </button>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">
            {t('chromeRequired')}
          </p>
        </div>
      </div>
    </section>
  );
}