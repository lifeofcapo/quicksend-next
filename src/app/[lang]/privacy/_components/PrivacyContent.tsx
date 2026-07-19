// src/app/[lang]/privacy/_components/PrivacyContent.tsx
'use client';

import { useTheme } from '@/contexts/theme-context';
import { useTranslation } from '@/hooks/useTranslation';

interface PrivacyContentProps {
  lang: string;
}

export default function PrivacyContent({ lang }: PrivacyContentProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('privacy.lastUpdated')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {t('privacy.intro')}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('privacy.overview')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('privacy.overviewText')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('privacy.dataCollected')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('privacy.dataCollectedText')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('privacy.howWeUse')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('privacy.howWeUseText')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('privacy.documentStorage')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {t('privacy.documentStorageText1')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {t('privacy.documentStorageText2')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('privacy.documentStorageText3')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('privacy.thirdParty')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('privacy.thirdPartyText')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('privacy.dataDeletion')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('privacy.dataDeletionText')}{' '}
                    <a 
                      href={`mailto:${t('privacy.dataDeletionEmail')}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t('privacy.dataDeletionEmail')}
                    </a>
                    {' '}{t('privacy.dataDeletionSuffix')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('privacy.security')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('privacy.securityText')}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}