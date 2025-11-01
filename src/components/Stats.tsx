'use client';

import { useEffect, useState } from 'react';

export default function Stats() {
  const [emailCount, setEmailCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    const emailTarget = 1234567;
    const campaignTarget = 45678;
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
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <div>
            <p className="text-lg mb-2 opacity-90">Отправлено писем за всё время:</p>
            <span className="text-5xl md:text-6xl font-bold">{emailCount.toLocaleString()}</span>
          </div>
          <div>
            <p className="text-lg mb-2 opacity-90">Совершённые рассылки:</p>
            <span className="text-5xl md:text-6xl font-bold">{campaignCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}