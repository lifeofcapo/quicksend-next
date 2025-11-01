'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [language] = useState<'ru' | 'en'>('ru');

  const t = {
    title: 'QuickSend',
    description: language === 'ru' 
      ? 'QuickSend - это современный сервис для массовой отправки электронных писем в Gmail.'
      : 'QuickSend is a modern service for mass sending emails in Gmail.',
    startFree: language === 'ru' ? 'Начать бесплатно' : 'Start for free',
    learnMore: language === 'ru' ? 'Узнать больше' : 'Learn more',
  };

  return (
    <section id="hero-section" className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          {t.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="#"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            {t.startFree}
          </Link>
          <Link
            href="#whyquicksend"
            className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition text-lg font-semibold"
          >
            {t.learnMore}
          </Link>
        </div>
      </div>
    </section>
  );
}
