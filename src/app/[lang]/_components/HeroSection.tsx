'use client';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  return (
    <section
      id="hero-section"
      className="
        pt-20 pb-20 px-4 
        bg-white dark:bg-gray-900 
        transition-colors
      "
    >
      <div className="container mx-auto">
        <div
          className="
            flex flex-col lg:flex-row
            items-center justify-between
            gap-10 lg:gap-4
            max-w-7xl mx-auto
          "
        >
          <div className="text-center lg:text-left max-w-xl flex-1 order-3 lg:order-1">
            <h1
              className="
                text-4xl md:text-6xl 
                font-bold text-gray-900 dark:text-white 
                mb-6
              "
            >
              {t('title')}
            </h1>
            <p
              className="
                text-lg md:text-xl 
                text-gray-600 dark:text-gray-300 
                mb-8
              "
            >
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href={`/${language}/login`}
                className="
                  px-8 py-4 
                  bg-blue-600 dark:bg-blue-700 
                  text-white rounded-lg 
                  hover:bg-blue-700 dark:hover:bg-blue-600 
                  transition text-lg font-semibold
                "
              >
                {t('startFree')}
              </Link>
              <Link
                href={`/${language}#whyquicksend`}
                className="
                  px-8 py-4 
                  bg-white dark:bg-gray-800 
                  text-blue-600 dark:text-blue-400 
                  border-2 border-blue-600 dark:border-blue-400 
                  rounded-lg 
                  hover:bg-blue-50 dark:hover:bg-blue-900/20 
                  transition text-lg font-semibold
                "
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>
          
          <div className="relative w-[320px] h-[320px] lg:w-[370px] lg:h-[590px] flex-shrink-0 order-1 lg:order-1 mt-auto">
            <Image 
              src="/images/image.png" 
              alt="Hero Left" 
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <div className="relative w-[380px] h-[420px] lg:w-[490px] lg:h-[600px] flex-shrink-0 order-3 lg:order-3 mt-auto lg:mr-[-120px]">
            <Image 
              src="/images/image (1) (1).png" 
              alt="Hero Right" 
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
    );
  }