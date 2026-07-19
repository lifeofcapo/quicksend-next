// src/app/[lang]/faq/_components/FAQContent.tsx
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface FAQContentProps {
  lang: string;
}

export default function FAQContent({ lang }: FAQContentProps) {
  const { t } = useTranslation();
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
      topic: 'faq.topics.basics',
      questions: [
        {
          q: 'faq.questions.basics.whatIsQuickSend',
          a: 'faq.answers.basics.whatIsQuickSend'
        },
        {
          q: 'faq.questions.basics.whatCanBeRemoved',
          a: 'faq.answers.basics.whatCanBeRemoved'
        },
        {
          q: 'faq.questions.basics.whichPlatforms',
          a: 'faq.answers.basics.whichPlatforms'
        }
      ]
    },
    {
      topic: 'faq.topics.process',
      questions: [
        {
          q: 'faq.questions.process.howItWorks',
          a: 'faq.answers.process.howItWorks'
        },
        {
          q: 'faq.questions.process.documentsNeeded',
          a: 'faq.answers.process.documentsNeeded'
        },
        {
          q: 'faq.questions.process.howLong',
          a: 'faq.answers.process.howLong'
        },
        {
          q: 'faq.questions.process.trackStatus',
          a: 'faq.answers.process.trackStatus'
        }
      ]
    },
    {
      topic: 'faq.topics.payment',
      questions: [
        {
          q: 'faq.questions.payment.howMuch',
          a: 'faq.answers.payment.howMuch'
        },
        {
          q: 'faq.questions.payment.bundles',
          a: 'faq.answers.payment.bundles'
        },
        {
          q: 'faq.questions.payment.paymentMethods',
          a: 'faq.answers.payment.paymentMethods'
        },
        {
          q: 'faq.questions.payment.refund',
          a: 'faq.answers.payment.refund'
        }
      ]
    },
    {
      topic: 'faq.topics.legal',
      questions: [
        {
          q: 'faq.questions.legal.mustOwnRights',
          a: 'faq.answers.legal.mustOwnRights'
        },
        {
          q: 'faq.questions.legal.falseClaim',
          a: 'faq.answers.legal.falseClaim'
        },
        {
          q: 'faq.questions.legal.counterNotice',
          a: 'faq.answers.legal.counterNotice'
        },
        {
          q: 'faq.questions.legal.noGuarantee',
          a: 'faq.answers.legal.noGuarantee'
        }
      ]
    },
    {
      topic: 'faq.topics.support',
      questions: [
        {
          q: 'faq.questions.support.getSupport',
          a: 'faq.answers.support.getSupport'
        }
      ]
    }
  ];

  const filteredData = faqData.map((topic, topicIdx) => ({
    ...topic,
    questions: topic.questions.filter((item) => {
      const q = t(item.q).toLowerCase();
      const a = t(item.a).toLowerCase();
      return q.includes(searchTerm.toLowerCase()) || a.includes(searchTerm.toLowerCase());
    })
  })).filter(topic => topic.questions.length > 0);

  const hasResults = filteredData.length > 0;

  return (
    <main className="pt-32 pb-20 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="container mx-auto max-w-4xl">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('faq.lastUpdated')}
          </p>
        </section>

        <div className="relative mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder')}
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
              {t('faq.noResults')}
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
                    {t(topic.topic)}
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
                            {t(item.q)}
                          </span>
                          <span
                            className={`w-3 h-3 border-r-2 border-b-2 border-gray-400 dark:border-gray-500 
                                      transform transition-transform shrink-0 ${
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
                            {t(item.a)}
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
  );
}