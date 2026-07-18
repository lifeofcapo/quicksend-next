'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/language-context';
import Link from 'next/link';

interface TermsAgreementProps {
  buttonName: string;
  variant?: 'paypal' | 'login';
}

export default function TermsAgreement({
  buttonName,
  variant = 'paypal',
}: TermsAgreementProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const isRussian = language === 'ru';

  const className =
    variant === 'paypal'
      ? 'text-sm text-gray-600 dark:text-gray-400'
      : 'text-sm text-gray-400 mt-6 dark:text-gray-400';

  return (
    <p className={className}>
      {t('termsAgreement.before', { button: buttonName })}{' '}

      <Link
        href={`/${language}/privacy`}
        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
      >
        {t('termsAgreement.privacy')}
      </Link>

      {isRussian ? (
        <>
          {t('termsAgreement.comma')}{' '}

          <Link
            href={`/${language}/terms`}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            {t('termsAgreement.terms')}
          </Link>

          {t('termsAgreement.afterTerms')}{' '}

          <a
            href="https://quicksend.vercel.app/agreement-pd.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            {t('termsAgreement.personalData')}
          </a>
        </>
      ) : (
        <>
          {' '}
          {t('termsAgreement.and')}{' '}

          <Link
            href={`/${language}/terms`}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            {t('termsAgreement.terms')}
          </Link>
        </>
      )}
    </p>
  );
}