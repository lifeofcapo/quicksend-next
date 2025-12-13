'use client'
import { AlertCircle, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

export default function TentyInfo() {
    const { t } = useTranslation();
    
    return (
        <>
            <section className="space-y-4">
                <h3 className="text-3xl font-bold bg-linear-to-r from-blue-500 via-cyan-400 to-[#AEE5C2] dark:from-blue-400 dark:via-cyan-300 dark:to-[#8ED8A8] bg-clip-text text-transparent">
                    Content Protection & Takedown Service
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium">
                    We help producers, musicians, and rights holders protect their creative work from
                    unauthorized use. Our team processes DSP complaints and manages
                    takedowns across all major platforms for <span className="font-semibold text-blue-500 dark:text-cyan-300">tracks, cover art, podcasts, videos, and written content</span> — 
                    ensuring your intellectual property stays under your control.
                </p>
            </section>
            
            <section className="relative flex items-start gap-6 p-6 my-8 border rounded-2xl shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
                <a 
                    href="https://instagram.com/freshprincej_astro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
                >
                    <Instagram className="w-6 h-6" />
                </a>
                
                <div className="shrink-0">
                    <Image
                        src="/images/Jordan.png"
                        width={120}
                        height={120}
                        alt="Manager"
                        className="rounded-xl object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-xl font-semibold mb-2">Jordan Tennant</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Jordan Tennant is a Music Entrepreneur who is the Co Founder of Tenty. 
                        He helps producers and songwriters with DSP takedowns. 3 years experience in Music Industry
                    </p>
                </div>
            </section>
            
            <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
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