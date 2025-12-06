'use client';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <section id="hero-section" className="relative pt-24 pb-20 px-4 bg-white dark:bg-gray-900 transition-colors h-[600px] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500 via-cyan-400 to-[#AEE5C2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400 via-blue-400 to-[#AEE5C2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500 to-[#AEE5C2] rounded-full mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto h-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-7xl mx-auto h-full">
          <div className="text-center max-w-xl flex-1 order-2 lg:order-2 mb-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] dark:from-blue-400 dark:via-cyan-300 dark:to-[#8ED8A8]">
                QuickSend
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                    href={`/${language}/login`}
                    className="group relative px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/10"
                  >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] group-hover:from-blue-400 group-hover:via-cyan-300 group-hover:to-[#AEE5C2]/90 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-[#8ED8A8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center text-white text-lg font-semibold tracking-wide">
                  {t('startFree')}
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 rounded-xl transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
              
              <Link 
                href={`/${language}#whyquicksend`}
                className="group relative px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-[#AEE5C2]/20 dark:from-blue-400/10 dark:via-cyan-300/10 dark:to-[#8ED8A8]/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 border-2 border-blue-400/50 dark:border-blue-300/40 rounded-xl group-hover:border-cyan-400 dark:group-hover:border-cyan-300 transition-all duration-300"></div>
                <span className="relative flex items-center justify-center text-blue-600 dark:text-cyan-300 text-lg font-semibold tracking-wide">
                  {t('learnMore')}
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
            </Link>
            </div>
            
            {/* Декоративные элементы в персиково-мятной палитре */}
            <div className="mt-12 flex justify-center space-x-4">
              <div className="w-3 h-3 rounded-full bg-[#FFD1A6] animate-pulse shadow-lg shadow-[#FFD1A6]/40"></div>
              <div className="w-3 h-3 rounded-full bg-[#AEE5C2] animate-pulse delay-75 shadow-lg shadow-[#AEE5C2]/40"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FFD1A6] to-[#AEE5C2] animate-pulse delay-150 shadow-lg shadow-[#FFD1A6]/40"></div>
            </div>
          </div>
          
          {/* Левое изображение с мятным свечением */}
<div className="relative w-[320px] h-[320px] lg:w-[370px] lg:h-[590px] flex-shrink-0 order-1 lg:order-1 mt-auto">
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#AEE5C2]/20 to-transparent rounded-full blur-lg"></div>
            <Image 
              src="/images/image.png" 
              alt="Hero Left" 
              fill
              className="object-contain relative z-10 drop-shadow-lg animate-fade-in-up"
              priority
            />
          </div>
          
          <div className="relative w-[380px] h-[420px] lg:w-[490px] lg:h-[600px] flex-shrink-0 order-3 lg:order-3 mt-auto lg:mr-[-120px]">
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute -inset-4 bg-gradient-to-l from-[#FFD1A6]/20 to-transparent rounded-full blur-lg"></div>
            <Image 
              src="/images/image-1.png" 
              alt="Hero Right" 
              fill
              className="object-contain relative z-10 drop-shadow-lg animate-fade-in-up"
            />
          </div>
        </div>
      </div>
    </section>
  );
}