'use client'
import { useState } from 'react';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
import Link from 'next/link';

export default function TermsOfUsePage() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = {
    title: language === 'ru' 
      ? 'Условия использования Quicksend и политика борьбы со спамом' 
      : 'Quicksend Terms of Use and Anti-Spam Policy',
    lastUpdated: language === 'ru' 
      ? 'Последний раз обновлено: Февраль, 2025'
      : 'Last Time Updated: February, 2025',
    intro: language === 'ru'
      ? 'Обратите внимание, что использование и доступ к нашим услугам (определенным ниже) регулируются следующими условиями; если вы не согласны со всеми из перечисленных ниже условий, вы не можете использовать или получащать доступ к услугам каким-либо образом. Настоящие Условия использования («Условия») являются обязательным договором между вами и QuickSend, Inc. («QuickSend», «мы» и «нас»).'
      : 'Please note that your use of and access to our services (defined below) are subject to the following terms; if you do not agree to all of the following, you may not use or access the services in any manner. These Terms of Use (the "Terms") are a binding contract between you and QuickSend, Inc. ("QuickSend", "we" and "us").',
    termsChange: language === 'ru' ? 'Будут ли Условия когда-либо меняться?' : 'Will these Terms ever change?',
    termsChangeText: language === 'ru'
      ? 'Мы постоянно совершенствуем наши Услуги, поэтому эти Условия могут потребовать изменения вместе с Услугами. Мы оставляем за собой право изменять Условия в любое время, но если мы это сделаем, мы доведем это до вашего сведения, разместив уведомление на веб-сайте QuickSend и/или отправив вам электронное письмо, и/или каким-либо другим способом.'
      : 'We are constantly improving our Services, so these Terms may need to change along with the Services. We reserve the right to change the Terms at any time, but if we do, we will bring it to your attention by placing a notice on the QuickSend website, and/or by sending you an email, and/or by some other means.',
    philosophy: language === 'ru' ? 'Общая философия' : 'General Philosophy',
    philosophyText: language === 'ru'
      ? 'Мы стремимся сделать QuickSend максимально простым в использовании и максимально этичным бизнес-операцией. Условия обеспечат вам, нашему пользователю, и нам, создателям QuickSend, хороший опыт. Вы должны согласиться с этими условиями перед использованием QuickSend.'
      : 'We strive to make QuickSend as easy-to-use as possible and as ethical a business operation as possible. The terms will ensure a good experience for you, our user, and us, the creators of QuickSend. You must agree to these terms before using QuickSend.',
    antiSpam: language === 'ru' ? 'Политика борьбы со спамом' : 'Anti-Spam Policy',
    antiSpamText: language === 'ru'
      ? 'Вы не можете использовать QuickSend для рассылки спама. Спам по определению — это нежелательная электронная почта, рассылаемая оптом. Существует несколько линий защиты для защиты QuickSend от спамеров. Во-первых, сотрудники QuickSend отслеживают исходящий поток электронной почты 24 часа в сутки. Кампании, соответствующие очевидной эвристике спама и мошенничества, прекращаются вместе с их связанными учетными записями.'
      : 'You may not use QuickSend to send spam. Spam, by definition, is unsolicited email sent in bulk. There are several lines of defense in place in order to protect QuickSend from spammers. First, QuickSend personnel monitor outbound email flow 24 hours a day. Campaigns matching obvious spam and scam heuristics are terminated along with their associated accounts.',
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t.lastUpdated}
              </p>
            </div>

            {/* Основной контент */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {t.intro}
              </p>

              <div className="space-y-8">
                {/* Изменение условий */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.termsChange}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.termsChangeText}
                  </p>
                </section>

                {/* Философия */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.philosophy}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.philosophyText}
                  </p>
                </section>

                {/* Анти-спам политика */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.antiSpam}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.antiSpamText}
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === 'ru' ? 'Конфиденциальность и обратная связь' : 'Confidentiality and Feedback'}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {language === 'ru' 
                      ? 'Вы признаете, что в ходе ваших отношений с QuickSend, Inc. и при использовании Услуг вы можете получать информацию, касающуюся Услуг и/или QuickSend («Конфиденциальная информация»).'
                      : 'You acknowledge that, in the course of your relationship with QuickSend, Inc. and in using the Services, you may obtain information relating to the Services and/or QuickSend ("Proprietary Information").'
                    }
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === 'ru' ? 'Отказ от гарантии' : 'Warranty Disclaimer'}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {language === 'ru'
                      ? 'Ни QuickSend, ни ее лицензиары или поставщики не делают никаких заявлений или гарантий относительно любого контента, содержащегося в Услугах или доступного через них...'
                      : 'Neither QuickSend nor its licensors or suppliers makes any representations or warranties concerning any content contained in or accessed through the Services...'
                    }
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}