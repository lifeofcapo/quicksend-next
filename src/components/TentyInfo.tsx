'use client'
import { AlertCircle, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

export default function TentyInfo() {
    const { t } = useTranslation();
    
    return (
        <>
            <section className="space-y-4">
                <h3 className="text-2xl font-bold">Track Blocking / Tenty Service</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    We help producers, musicians and rights holders protect their work from
                    unauthorized use. Our team processes DSP complaints and manages
                    takedowns on all major platforms, ensuring your music stays under your control.
                </p>
            </section>
            
            <section className="flex items-start gap-6 p-6 border rounded-2xl shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
                <div className="flex-shrink-0">
                    <Image
                        src="/images/Jordan.png"
                        width={120}
                        height={120}
                        alt="Manager"
                        className="rounded-xl object-cover"
                    />
                    <div className="flex gap-3 mt-3 text-gray-600 dark:text-gray-300">
                        <a href="https://instagram.com/freshprincej_astro" target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-5 h-5 hover:text-pink-500 transition" />
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="text-xl font-semibold">Jordan Tennant</h4>
                    <p className="text-gray-600 dark:text-gray-400">
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