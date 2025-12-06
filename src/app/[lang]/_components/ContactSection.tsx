'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

export function ContactSection() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  return (
    <section 
      id="contact" 
      className="py-20 px-4 bg-gradient-to-b from-[#f8fafc] to-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 transition-colors"
    >
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-4xl font-bold mb-8 dark:text-white">
          {t('contactUs')}
        </h2>
        <Mail className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
        <a 
          href="mailto:quicksendcontact@gmail.com" 
          className="text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition block mb-4"
        >
          quicksendcontact@gmail.com
        </a>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
          {t('feedback')}
        </p>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/animations/5.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}