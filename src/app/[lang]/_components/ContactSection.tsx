'use client';
import { useLanguage } from '@/contexts/language-context';
import { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

export function ContactSection() {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const t = {
    contactUs: language === 'ru' ? 'Свяжитесь с нами!' : 'Contact Us!',
    feedback: language === 'ru'
      ? 'Отправляйте нам предложения по улучшению, отзывы о работе и сообщения об ошибках!'
      : 'Send us improvement suggestions, job reviews, and bug reports!',
  };

  return (
<section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors">
  <div className="container mx-auto text-center max-w-4xl">
    <h2 className="text-4xl font-bold mb-8 dark:text-white">{t.contactUs}</h2>
    <Mail className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
    <a href="mailto:quicksendcontact@gmail.com" className="text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition block mb-4">
      quicksendcontact@gmail.com
    </a>
    <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">{t.feedback}</p>
    
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/images/5.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</section>
  );
}