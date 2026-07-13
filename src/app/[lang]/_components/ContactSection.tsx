'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  return (
    <section id="contact" className="py-12 md:py-20 px-4 bg-background">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-foreground">
          {t('contactUs')}
        </h2>

        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <Mail className="w-6 h-6 md:w-7 md:h-7 text-primary" />
        </div>

        <Button variant="outline" size="lg" asChild className="mb-4">
          <a href="mailto:quicksendcontact@gmail.com" className="text-base sm:text-lg">
            quicksendcontact@gmail.com
          </a>
        </Button>

        <p className="text-muted-foreground text-base md:text-lg mb-8 md:mb-12 px-2">
          {t('feedback')}
        </p>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border shadow-md max-w-3xl mx-auto">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/animations/5.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
}