'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function FAQPage() {
  const { language, toggleLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [index]
    );
  };

  const faqData = [
    {
      topic: { ru: 'База', en: 'Basics' },
      questions: [
        {
          q: {
            ru: 'Что мне нужно для использования QuickSend?',
            en: 'What do I need in order to use QuickSend?'
          },
          a: {
            ru: 'Вам нужен аккаунт Gmail или G Suite и браузер Chrome.',
            en: 'You need a Gmail or G Suite account and the Chrome browser.'
          }
        },
        {
          q: {
            ru: 'Какие изменения внесет установка QuickSend в мой почтовый аккаунт?',
            en: 'What changes will installing QuickSend make to my email account?'
          },
          a: {
            ru: 'QuickSend легкий и ненавязчивый. После установки QuickSend вы заметите четыре дополнительные кнопки в интерфейсе Gmail. Три из них - это маленькие квадратные кнопки справа от поля поиска: кнопка \'Создать список рассылки\', кнопка \'Подключить Google Таблицы\' и кнопка \'Кампании с последующими письмами\'. При составлении письма вы увидите основную кнопку QuickSend вместе с окном настроек рядом с обычной кнопкой отправки Gmail.',
            en: 'QuickSend is lightweight and unobtrusive. After you install QuickSend, you will notice four extra buttons within your Gmail interface. Three of these buttons are small square buttons to the right of the search field: the \'Build Email List\' button, the \'Google Sheets Connect\' button and the \'Follow-up Campaigns\' button.'
          }
        },
        {
          q: {
            ru: 'В чем особенность функции \'Отправить как ответы\'?',
            en: 'What\'s the big deal about the \'Send as replies\' feature?'
          },
          a: {
            ru: 'Большинство массовых email-кампаний отправляются как новые сообщения и, следовательно, новые беседы с каждым получателем. Возможность отправлять массовую рассылку так, чтобы каждое письмо отправлялось как ответ на последнюю беседу с каждым получателем, создает более знакомый опыт для получателя.',
            en: 'Most mass email campaigns are sent as new messages, and therefore new conversations, with each recipient. The ability to send a mass email and have each individual email sent as a reply to the last conversation with each recipient, creates a more familiar experience for the recipient.'
          }
        },
        {
          q: {
            ru: 'Я заметил опцию \'Только создать черновики\' вместо отправки кампании. Зачем это нужно?',
            en: 'I noticed an option to \'Just create Drafts\' instead of send a campaign. Why would I want to do this?'
          },
          a: {
            ru: 'Эта опция полезна, если вы хотите протестировать функциональность QuickSend, но не хотите фактически отправлять письма. Например, если вы хотите убедиться, что персонализация работает правильно, эта опция очень удобна.',
            en: 'This option is useful if you want to test QuickSend\'s functionality but don\'t want to actually send anyone emails. For example, if you want to ensure personalization is working, this option comes in handy.'
          }
        },
        {
          q: {
            ru: 'Что такое автоматические последующие письма?',
            en: 'What are auto follow-ups?'
          },
          a: {
            ru: 'Автоматические последующие письма - это лучшее, что случилось с email-маркетологами со времен... самого email-маркетинга. Они позволяют автоматически отправлять письма получателям вашей email-кампании, которые не ответили.',
            en: 'Auto follow-ups are the best thing to happen to email marketers since well...email marketing. Auto follow-ups allow you to send follow-up emails automatically to recipients of your email campaign that have not replied.'
          }
        },
        {
          q: {
            ru: 'Предназначен ли QuickSend для замены моей существующей системы email-маркетинга?',
            en: 'Is QuickSend meant to replace my existing email marketing system like Constant Contact or MailChimp?'
          },
          a: {
            ru: 'Возможно. Это зависит от вас. Некоторые пользователи используют QuickSend параллельно с основной системой email-маркетинга, используя QuickSend для кампаний с меньшим объемом.',
            en: 'Maybe. It\'s up to you. Some users use QuickSend alongside their primary email marketing system, using QuickSend for lower-volume campaigns.'
          }
        }
      ]
    },
    {
      topic: { ru: 'Отправка', en: 'Sending' },
      questions: [
        {
          q: {
            ru: 'Как отправить простое тестовое письмо с помощью QuickSend?',
            en: 'How do I send a simple test email with QuickSend?'
          },
          a: {
            ru: 'Нажмите \'Написать\' в Gmail. Введите несколько email-адресов в поле \'Кому\'. Добавьте тему и сообщение, затем нажмите кнопку QuickSend.',
            en: 'Click Compose in Gmail. Enter a few email addresses in the To field. Put in a Subject and Message, and hit the QuickSend button.'
          }
        },
        {
          q: {
            ru: 'Можно ли отправлять вложения? А как насчет встроенных изображений?',
            en: 'Can I send attachments? What about inline images?'
          },
          a: {
            ru: 'Да. Вы составляете письмо точно так же, как любое другое письмо в Gmail. Любую функцию, которую поддерживает Gmail, поддерживает и QuickSend.',
            en: 'Yes. You compose your email just as you would any other email message in Gmail. Any feature of an email that Gmail supports you can assume that QuickSend also supports.'
          }
        },
        {
          q: {
            ru: 'С какого сервера отправляются мои письма?',
            en: 'From what server are my emails sent?'
          },
          a: {
            ru: 'При стандартной настройке ваши письма отправляются с серверов Gmail через ваш аккаунт Gmail или G Suite. Вы увидите все отправленные сообщения в папке \'Отправленные\'.',
            en: 'With the standard setup, your emails are sent from Gmail\'s servers from your Gmail or G Suite account. You\'ll see all sent messages in your \'Sent Mail\' folder.'
          }
        },
        {
          q: {
            ru: 'Сколько писем я могу отправить за один раз?',
            en: 'How many emails can I send at a time?'
          },
          a: {
            ru: 'При стандартной настройке Google устанавливает лимит в 2000 писем в день для доверенных пользователей G Suite и 500 писем в день для обычных пользователей Gmail.',
            en: 'Under the standard setup, Google imposes a limit of 2,000 sent emails/day for trusted G Suite users, and 500 emails/day for regular Gmail users.'
          }
        }
      ]
    },
    {
      topic: { ru: 'Отчёты', en: 'Reports' },
      questions: [
        {
          q: {
            ru: 'Как получить доступ к моим отчетам?',
            en: 'How do I access my reports?'
          },
          a: {
            ru: 'Вы можете получить доступ к отчетам об открытиях, кликах и отписках, нажав на метку QuickSend Reports слева в интерфейсе Gmail.',
            en: 'You can access your open-tracking, click-tracking, and unsubscribe reports by clicking on the QuickSend Reports Label on the left of the Gmail interface.'
          }
        }
      ]
    },
    {
      topic: { ru: 'Цены', en: 'Pricing' },
      questions: [
        {
          q: {
            ru: 'Подписка QuickSend бесплатна?',
            en: 'Is QuickSend subscription for free?'
          },
          a: {
            ru: 'QuickSend предлагает бесплатную пробную версию на 7 дней, в течение которой вы можете отправлять 50 писем в день. По истечении 7 дней, пожалуйста, подпишитесь на платный план.',
            en: 'QuickSend offers a free trial for 7 days, during which you can send 50 emails per day. After the 7 days, please subscribe to a paid plan.'
          }
        }
      ]
    },
    {
      topic: { ru: 'Поддержка', en: 'Support' },
      questions: [
        {
          q: {
            ru: 'Я заметил, что QuickSend - не единственный продукт, который вы предлагаете. Какие еще есть продукты?',
            en: 'I noticed that QuickSend isn\'t the only product you offer. What are the other products?'
          },
          a: {
            ru: 'QuickSend Chrome расширение - наш основной продукт, который добавляет кнопки в ваш аккаунт Gmail для отправки массовых email-кампаний.',
            en: 'The QuickSend Chrome extension is our main product, and is what adds the buttons to your Gmail account so you can send mass email campaigns.'
          }
        },
        {
          q: {
            ru: 'Как получить поддержку?',
            en: 'How do I get support?'
          },
          a: {
            ru: 'Свяжитесь с поддержкой через quicksendcontact@gmail.com',
            en: 'Contact the support team: quicksendcontact@gmail.com'
          }
        }
      ]
    }
  ];

  const filteredData = faqData.map((topic, topicIdx) => ({
    ...topic,
    questions: topic.questions.filter((item, qIdx) => {
      const q = item.q[language].toLowerCase();
      const a = item.a[language].toLowerCase();
      return q.includes(searchTerm.toLowerCase()) || a.includes(searchTerm.toLowerCase());
    })
  })).filter(topic => topic.questions.length > 0);

  const hasResults = filteredData.length > 0;

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
        <div className="container mx-auto max-w-4xl">
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ru' ? 'Часто задаваемые вопросы' : 'FAQ'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ru' ? 'Последний раз обновлено: Февраль, 2025' : 'Last Time Updated: February, 2025'}
            </p>
          </section>

          <div className="relative mb-12 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 
                         transition-colors text-lg"
              />
            </div>
          </div>

          {!hasResults ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {language === 'ru' ? 'Не найдено информации по запросу' : 'No matching questions found'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredData.map((topic, topicIdx) => (
                <div
                  key={topicIdx}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden 
                           border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleTopic(topicIdx)}
                    className="w-full px-6 py-5 flex justify-between items-center 
                             hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {topic.topic[language]}
                    </h2>
                    <span
                      className={`w-3 h-3 border-r-2 border-b-2 border-gray-400 dark:border-gray-500 
                                transform transition-transform ${
                                  openTopics.includes(topicIdx) ? 'rotate-[-135deg]' : 'rotate-45'
                                }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openTopics.includes(topicIdx) ? 'max-h-[5000px]' : 'max-h-0'
                    }`}
                  >
                    {topic.questions.map((item, qIdx) => {
                      const globalIdx = topicIdx * 100 + qIdx;
                      return (
                        <div
                          key={qIdx}
                          className="border-t border-gray-200 dark:border-gray-700"
                        >
                          <button
                            onClick={() => toggleQuestion(globalIdx)}
                            className="w-full px-6 py-4 flex justify-between items-center 
                                     hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors text-left"
                          >
                            <span className="font-medium text-gray-700 dark:text-gray-300 pr-4">
                              {item.q[language]}
                            </span>
                            <span
                              className={`w-3 h-3 border-r-2 border-b-2 border-gray-400 dark:border-gray-500 
                                        transform transition-transform flex-shrink-0 ${
                                          openQuestions.includes(globalIdx) ? 'rotate-[-135deg]' : 'rotate-45'
                                        }`}
                            />
                          </button>

                          <div
                            className={`transition-all duration-300 overflow-hidden ${
                              openQuestions.includes(globalIdx)
                                ? 'max-h-[1000px] opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 text-gray-600 dark:text-gray-300 leading-relaxed">
                              {item.a[language]}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}