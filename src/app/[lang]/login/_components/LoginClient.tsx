// @/app/[lang]/login/_components/LoginClient.tsx
'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/useTranslation';
import BirdAnimation from "./BirdAnimation";
import TermsAgreement from "@/components/TermsAgreement";

export default function LoginClient () {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();
  const { t } = useTranslation();
  const subscribeButtonText = t('login.continueWithGoogle');
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-8 bg-linear-to-br from-sky-50 to-indigo-100 dark:from-slate-900 dark:to-sky-800 relative overflow-hidden transition-colors duration-300 pt-45 pb-16">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-sky-200 rounded-full opacity-20 animate-float dark:bg-sky-700"></div>
        <div className="absolute top-1/4 -right-10 w-20 h-20 bg-indigo-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-indigo-300 rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <BirdAnimation />

      <div className="text-center z-10 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in dark:bg-slate-800/70 dark:border-slate-700 max-w-lg w-full mx-4">
        
        <h1 className="text-4xl font-bold bg-linear-to-r from-sky-700 to-indigo-600 bg-clip-text text-transparent mb-2 dark:from-sky-300 dark:to-indigo-300">
          {t('login.welcome')}
        </h1>

        <p className="text-gray-500 mb-8 max-w-md mx-auto dark:text-gray-400 px-4">
          {t('login.joinCommunity')}
        </p>

        <div className="px-4">
          <button
            onClick={() => signIn("google", { 
              callbackUrl: `/${language}/profile`
            })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:bg-slate-900 dark:text-gray-100 dark:border-slate-700 w-full max-w-xs mx-auto"
          >
            <div className={`absolute inset-0 bg-linear-to-r from-sky-500 to-indigo-500 rounded-xl transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="relative z-10 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className={isHovered ? 'text-white' : 'text-gray-700 dark:text-gray-100'}>
                {t('login.continueWithGoogle')}
              </span>
            </div>
          </button>
        </div>

        <TermsAgreement 
          buttonName={subscribeButtonText} 
          variant="login" 
        />
      </div>

      <div className="absolute bottom-10 left-10 w-10 h-10 bg-teal-400 rounded-full opacity-20 animate-pulse dark:bg-teal-600"></div>
      <div className="absolute top-10 right-10 w-8 h-8 bg-pink-400 rounded-full opacity-30 animate-bounce dark:bg-pink-600"></div>
    </div>
  );
}