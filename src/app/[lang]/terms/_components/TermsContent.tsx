// src/app/[lang]/terms/_components/TermsContent.tsx
'use client';

import { useTheme } from '@/contexts/theme-context';
import { useTranslation } from '@/hooks/useTranslation';

interface TermsContentProps {
  lang: string;
}

export default function TermsContent({ lang }: TermsContentProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {line}
      </p>
    ));
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('terms.lastUpdated')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {formatText(t('terms.intro'))}

                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.philosophy')}
                    </h2>
                    {formatText(t('terms.philosophyText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.serviceDescription')}
                    </h2>
                    {formatText(t('terms.serviceDescriptionText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.ownershipRequirement')}
                    </h2>
                    {formatText(t('terms.ownershipRequirementText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.process')}
                    </h2>
                    {formatText(t('terms.processText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.noGuarantee')}
                    </h2>
                    {formatText(t('terms.noGuaranteeText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.payments')}
                    </h2>
                    {formatText(t('terms.paymentsText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.refunds')}
                    </h2>
                    {formatText(t('terms.refundsText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.chargebacks')}
                    </h2>
                    {formatText(t('terms.chargebacksText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.support')}
                    </h2>
                    {formatText(t('terms.supportText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.confidentiality')}
                    </h2>
                    {formatText(t('terms.confidentialityText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.privacy')}
                    </h2>
                    {formatText(t('terms.privacyText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.warranty')}
                    </h2>
                    {formatText(t('terms.warrantyText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.liability')}
                    </h2>
                    {formatText(t('terms.liabilityText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.assignment')}
                    </h2>
                    {formatText(t('terms.assignmentText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.arbitration')}
                    </h2>
                    {formatText(t('terms.arbitrationText'))}
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.miscellaneous')}
                    </h2>
                    {formatText(t('terms.miscellaneousText'))}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}