'use client'
import { useState } from 'react';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Переводы
  const t = {
    title: language === 'ru' 
      ? 'Информация о конфиденциальности QuickSend: Какие данные хранит наш сервер?' 
      : 'QuickSend Privacy Information: What data does our server store?',
    lastUpdated: language === 'ru' 
      ? 'Последний раз обновлено: Февраль, 2025'
      : 'Last Time Updated: February, 2025',
    intro: language === 'ru'
      ? 'Многие пользователи обеспокоены конфиденциальностью своих списков email-рассылок и тем, хранит ли QuickSend их email-адреса и содержимое сообщений, а также передаются ли эти данные третьим лицам. Информация ниже призвана ответить на эти вопросы.'
      : 'Many users are concerned about the privacy of their email marketing lists and whether QuickSend stores their email addresses and the contents of email messages, and whether any of this data is shared with third parties. The information below is meant to address these concerns.',
    overview: language === 'ru' ? 'Обзор работы QuickSend' : 'Overview of how QuickSend works',
    overviewText: language === 'ru'
      ? 'QuickSend работает путем передачи данных в ваш почтовый аккаунт и из него. Большая часть передачи данных происходит через числовые идентификаторы, специфичные для email и API. В некоторых случаях email-адреса передаются с сервера QuickSend обратно в интерфейс, но это происходит безопасно через SSL. Почтовые провайдеры не позволяют сторонним интеграциям, таким как QuickSend, подключаться к данным аккаунта без использования SSL.'
      : 'QuickSend works by transferring data to and from your email account. Most of this data transfer occurs via numeric identifiers specific to email and the API. In some cases, email addresses are transferred from the QuickSend server back to the interface, but in a secure manner over SSL. Email providers do not allow third-party integrations like QuickSend to connect to account data without the use of SSL.',
    emailLists: language === 'ru' ? 'Как используются ваши списки рассылки?' : 'How are your email lists used?',
    emailListsText: language === 'ru'
      ? 'Для отслеживания открытий, кликов и обеспечения функции отписки через ссылку QuickSend, наша база данных хранит email-адреса получателей ваших рассылок. Эти данные хранятся в базе данных, защищенной двумя уровнями файерволов, и никогда не передаются третьим лицам. QuickSend похож в этом отношении на известные системы email-маркетинга, такие как MailChimp, где хранение email-адресов необходимо для обеспечения стандартных функций email-маркетинга.'
      : 'In order to track opens, clicks, and provide unsubscribe functionality via the QuickSend unsubscribe link, our database does store the email addresses to which you are sending email. This data is stored in a database, secured by two layers of firewalls, and is never shared with any third parties. QuickSend is similar in this regard to well-known email marketing systems like MailChimp, where storage of email addresses is required to provide standard email marketing features.',
    contentStorage: language === 'ru' ? 'Хранит ли QuickSend содержимое ваших писем?' : 'Does QuickSend store the content of your email message?',
    contentStorageText1: language === 'ru'
      ? 'Нет. В отличие от традиционных сервисов email-маркетинга, таких как MailChimp, база данных QuickSend не хранит содержимое ваших маркетинговых кампаний, за исключением адреса отправителя, используемого для каждой кампании.'
      : 'No. Unlike a traditional email marketing service like MailChimp, the QuickSend database does not store the contents of your email marketing campaigns, except for the From Address used for each campaign.',
    contentStorageText2: language === 'ru'
      ? 'Мы храним адрес отправителя, поскольку для одного почтового аккаунта может быть авторизовано несколько адресов отправителя. Хранение адреса отправителя позволяет нам лучше поддерживать пользователей, когда они сообщают нам, что отправили кампанию с определенного адреса.'
      : 'We store the From Address because multiple From Addresses can be authorized for use in a single email account, and by storing the From Address, we are better able to support users by being able to look up their QuickSend account when they tell us they sent a campaign from a certain address.',
    contentStorageText3: language === 'ru'
      ? 'Мы не храним содержимое (тему/сообщение) email-кампаний, но контент кратковременно проходит через наш сервер. Это необходимо для добавления механизмов в email-сообщение, которые позволяют QuickSend отслеживать открытия и клики по отдельным письмам. Этот процесс занимает микросекунды, и содержимое письма не задерживается на нашем сервере дольше этого времени.'
      : 'We do not store the content (Subject / Message) of email campaigns, but the content does pass through our server ephemerally. This is required in order to add the mechanisms to an email message that allows QuickSend to track opens and clicks on individual email messages. This process happens in microseconds and the content of an email message does not live on our server beyond that.',
    thirdParty: language === 'ru' ? 'Передает ли QuickSend информацию о ваших списках рассылки третьим лицам?' : 'Does QuickSend share any of your email list information with third parties?',
    thirdPartyText: language === 'ru'
      ? 'Мы можем передавать информацию о ваших списках рассылки сторонним поставщикам услуг, включая рекламные платформы, для помощи в доставке таргетированных рекламных кампаний. Эти третьи лица обязаны использовать информацию только для этих целей и в соответствии с применимыми законами о защите данных. Мы не продаем и не обмениваем вашу email-информацию для каких-либо других целей.'
      : 'We may share your email list information with third-party service providers, including advertising platforms, to assist in delivering targeted advertising campaigns. These third parties are required to use the information only for these purposes and in accordance with applicable data protection laws. We do not sell or trade your email information for any other purposes.',
    dataDeletion: language === 'ru' ? 'Запросы на удаление данных' : 'Data Deletion Requests',
    dataDeletionText: language === 'ru'
      ? 'В соответствии с GDPR, любой пользователь может запросить удаление своих данных с наших серверов. Чтобы сделать такой запрос, пожалуйста, отправьте email на'
      : 'In compliance with GDPR, any user may request that their data be deleted from our servers. To make such a request, please send an email to',
    emailWarmup: language === 'ru' ? 'Прогрев почты' : 'Email Warmup',
    emailWarmupText: language === 'ru'
      ? 'QuickSend не предоставляет услуги прогрева для почтовых аккаунтов.'
      : 'QuickSend does not provide email warming services for email accounts.',
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Заголовок */}
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
                {/* Обзор работы */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.overview}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.overviewText}
                  </p>
                </section>

                {/* Списки рассылки */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.emailLists}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.emailListsText}
                  </p>
                </section>

                {/* Хранение содержимого */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.contentStorage}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {t.contentStorageText1}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {t.contentStorageText2}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.contentStorageText3}
                  </p>
                </section>

                {/* Третьи лица */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.thirdParty}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.thirdPartyText}
                  </p>
                </section>

                {/* Удаление данных */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.dataDeletion}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.dataDeletionText}{' '}
                    <a 
                      href="mailto:privacy@quicksend.com" 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      privacy@quicksend.com
                    </a>
                    {language === 'ru' ? ' с аккаунта QuickSend, данные которого вы хотите удалить.' : ' from the QuickSend account you wish to have deleted.'}
                  </p>
                </section>

                {/* Прогрев почты */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.emailWarmup}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.emailWarmupText}
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