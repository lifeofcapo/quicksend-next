'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslation } from '@/hooks/useTranslation';
import { Suspense } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function NotFound() {
  const { t } = useTranslation();
  const animationData = require('@/../public/animations/error404.json'); //JSON только на клиенте

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mb-8">
        <Suspense fallback={<div className="w-64 h-64 bg-gray-200 animate-pulse rounded-lg" />}>
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            rendererSettings={{
                preserveAspectRatio: 'xMidYMid slice'
            }}
            className="w-full h-auto"
          />
        </Suspense>
      </div>

      <div className="text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('notFound.title')}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {t('notFound.description')}
        </p>

        <Link
          href="/"
          className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium"
        >
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
}
