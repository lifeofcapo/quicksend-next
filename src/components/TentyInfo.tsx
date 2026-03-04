'use client'
import { AlertCircle, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

export default function TentyInfo() {
    const { t } = useTranslation();
    
    return (
        <>
        <section className="p-5 my-8 border rounded-2xl shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
            <div className="flex items-center gap-4 mb-3">
                <div className="shrink-0">
                    <Image
                        src="/images/Jordan.png"
                        width={72}
                        height={72}
                        alt="Manager"
                        className="rounded-xl object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h4 className="text-lg font-semibold truncate">Jordan Tennant</h4>
                        <a 
                            href="https://instagram.com/freshprincej_astro" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200 shrink-0"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Jordan Tennant is a Music Entrepreneur who is the Co Founder of Tenty. 
                He helps producers and songwriters with DSP takedowns. 3 years experience in Music Industry
            </p>
        </section>
            
            <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                            {t('tenty.importantNotice')}
                        </h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                            {t('tenty.legalWarning')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}