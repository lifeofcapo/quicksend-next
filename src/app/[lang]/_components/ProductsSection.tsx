'use client';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { Send, FileSpreadsheet, CheckCircle, Calendar, User, Bell, ExternalLink, Chrome, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ProductsSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  const [isChrome, setIsChrome] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [canInstall, setCanInstall] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isChromeBrowser = /chrome|chromium|crios/i.test(userAgent) && !/edg/i.test(userAgent);
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    setIsChrome(isChromeBrowser);
    setIsMobile(isMobileDevice);
    setCanInstall(isChromeBrowser && !isMobileDevice);
  }, []);

  const products = [
    { 
      icon: Send, 
      titleKey: 'products.massEmails',
      descKey: 'products.massEmailsDesc',
      gradient: 'from-blue-500 to-cyan-400'
    },
    { 
      icon: FileSpreadsheet, 
      titleKey: 'products.mailMerge',
      descKey: 'products.mailMergeDesc',
      gradient: 'from-cyan-400 to-[#AEE5C2]'
    },
    { 
      icon: CheckCircle, 
      titleKey: 'products.emailVerification',
      descKey: 'products.emailVerificationDesc',
      gradient: 'from-[#AEE5C2] to-[#FFD1A6]'
    },
    { 
      icon: Calendar, 
      titleKey: 'products.scheduling',
      descKey: 'products.schedulingDesc',
      gradient: 'from-[#FFD1A6] to-blue-400'
    },
    { 
      icon: User, 
      titleKey: 'products.personalization',
      descKey: 'products.personalizationDesc',
      gradient: 'from-blue-500 to-[#FFB87A]'
    },
    { 
      icon: Bell, 
      titleKey: 'products.followUps',
      descKey: 'products.followUpsDesc',
      gradient: 'from-[#FFB87A] to-[#8ED8A8]'
    },
  ];

  return (
    <section id="products" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-linear-to-br from-blue-500/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl dark:opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-linear-to-tr from-[#AEE5C2]/10 to-[#FFD1A6]/10 rounded-full mix-blend-multiply filter blur-3xl dark:opacity-20"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] dark:from-blue-400 dark:via-cyan-300 dark:to-[#8ED8A8]">
              {t('productsTitle')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('productsSubtitle') || 'Мощные инструменты для эффективной email-рассылки'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <div 
                key={i} 
                className="group relative flex flex-col h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="flex-1">
                  <div className="relative inline-flex mb-4">
                    <div className={`absolute inset-0 bg-linear-to-br ${product.gradient} rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    <div className="relative w-14 h-14 rounded-xl bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                      <Icon className="w-7 h-7" 
                        style={{
                          background: `linear-gradient(135deg, ${product.gradient.replace('from-', '').replace('to-', '').replace(' ', ', ')})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }} 
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-transparent group-hover:bg-linear-to-br group-hover:bg-clip-text transition-all duration-300"
                      style={{backgroundImage: `linear-gradient(135deg, ${product.gradient})`}}>
                    {t(product.titleKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t(product.descKey)}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
                  <Link 
                    href={`/${language}/faq`}
                    className="group/link relative inline-flex items-center justify-between w-full px-4 py-3 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <div className={`absolute inset-0 bg-linear-to-r ${product.gradient} opacity-5 group-hover/link:opacity-10 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 border border-gray-200 dark:border-gray-700 rounded-lg group-hover/link:border-transparent transition-colors duration-300"></div>
                    
                    <span className="relative text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover/link:text-transparent group-hover/link:bg-linear-to-r group-hover/link:bg-clip-text transition-all duration-300"
                          style={{backgroundImage: `linear-gradient(90deg, ${product.gradient})`}}>
                      {t('moreDetails')}
                    </span>
                    
                    <ExternalLink className="relative w-4 h-4 text-gray-400 group-hover/link:text-blue-500 dark:group-hover/link:text-blue-400 transition-colors duration-300" />
                  </Link>
                </div>

                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-linear-to-br from-blue-500/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -left-2 w-12 h-12 bg-linearto-tr from-[#AEE5C2]/10 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 delay-100"></div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${canInstall ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            <span className={`text-sm font-medium ${canInstall ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {canInstall ? 'Сompatible with your browser' : 'Requires Chrome on PC to Add Extension'}
            </span>
          </div>

          {canInstall ? (
            <Link 
              href={`/${language}/profile`}
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] group-hover:from-blue-600 group-hover:via-cyan-500 group-hover:to-[#8ED8A8] transition-all duration-500"></div>
              
              <div className="absolute inset-0 bg-linear-to-r from-blue-400 via-cyan-300 to-[#AEE5C2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <Chrome className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                </div>
                <span className="text-white text-lg font-bold tracking-wide">
                  {t('addToGmail')}
                </span>
                <svg className="w-5 h-5 ml-1 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
            </Link>
          ) : (
            <div className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300 cursor-not-allowed opacity-70">
              <div className="absolute inset-0 bg-linear-to-r from-gray-400 via-gray-300 to-gray-400"></div>

              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <Chrome className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-sm"></div>
                </div>
                <span className="text-white text-lg font-bold tracking-wide">
                  {t('addToGmail')}
                </span>
                <AlertCircle className="w-5 h-5 ml-1 text-white/70" />
              </div>
              
              <div className="absolute -bottom-10 left-0 right-0 text-center">
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
                  <span className="text-xs text-red-600 dark:text-red-300 font-medium">
                    {isMobile ? 'Расширение недоступно на мобильных устройствах' : 'Для установки требуется браузер Chrome'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
            <span className="inline-flex items-center gap-1">
              <Chrome className="w-4 h-4" />
              {t('chromeRequired')}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}