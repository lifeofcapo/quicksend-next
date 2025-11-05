'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function StatsSection() {
  const { t } = useTranslation();
  const [emailCount, setEmailCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    const emailTarget = 100000;
    const campaignTarget = 12000;
    const duration = 2000;
    const steps = 60;
    const emailIncrement = emailTarget / steps;
    const campaignIncrement = campaignTarget / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setEmailCount(Math.floor(emailIncrement * currentStep));
      setCampaignCount(Math.floor(campaignIncrement * currentStep));

      if (currentStep >= steps) {
        clearInterval(timer);
        setEmailCount(emailTarget);
        setCampaignCount(campaignTarget);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative py-2 md:py-2 flex items-center"
      style={{
        background: "linear-gradient(to top, #f8fafc, #bfdbfe)"
      }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          <div className="relative w-full h-[280px]">
            <Image 
              src="/images/Team goals-rafiki.png" 
              alt="Team Goals" 
              fill
              className="object-contain"
            />
          </div>
          
          <div className="text-center space-y-3">
            <div>
              <p className="text-base mb-1 text-gray-700">{t('statsEmails')}</p>
              <span className="text-3xl md:text-4xl font-bold text-gray-900">
                {emailCount.toLocaleString()}
              </span>
            </div>
            <div>
              <p className="text-base mb-1 text-gray-700">{t('statsCampaigns')}</p>
              <span className="text-3xl md:text-4xl font-bold text-gray-900">
                {campaignCount.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="relative w-full h-[280px]">
            <Image 
              src="/images/Investment data-rafiki.png" 
              alt="Investment Data" 
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}