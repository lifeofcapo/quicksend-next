'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

interface TabProfileInfoProps {
  user: any;
  userData: {
    avatar_url?: string;
    company_name?: string;
    emails_sent?: number;
    created_at?: string;
    status?: string;
    active_plan?: string;
    subscription_end?: string;
  };
}

export default function TabProfileInfo({ user, userData }: TabProfileInfoProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const avatarSrc =
    userData?.avatar_url ||
    user?.image ||
    '/default-avatar.png';

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    
    try {
      const date = new Date(dateString);
      return format(date, 'PPP');
    } catch (error) {
      return '—';
    }
  };

  const getTranslatedStatus = (status?: string) => {
    if (!status) return t('profile.active');
    
    const statusMap: Record<string, string> = {
      active: t('profile.active'),
      inactive: t('profile.inactive'),
      pending: t('profile.pending'),
      suspended: t('profile.suspended'),
      trial: t('profile.trial'),
    };
    
    return statusMap[status.toLowerCase()] || status;
  };

  const getTranslatedPlan = (plan?: string) => {
    if (!plan) return t('profile.freePlan');
    
    const planMap: Record<string, string> = {
      free: t('profile.freePlan'),
      basic: t('profile.basicPlan'),
      pro: t('profile.proPlan'),
      premium: t('profile.premiumPlan'),
      enterprise: t('profile.enterprisePlan'),
    };
    
    return planMap[plan.toLowerCase()] || plan;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
          <Image
            src={avatarSrc}
            alt={t('profile.avatarAlt')}
            fill
            className="rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover shadow-sm"
            unoptimized // важно для внешних URL (Google, Supabase)
            sizes="(max-width: 768px) 96px, 112px"
          />
        
          {userData?.status && (
            <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 ${
              userData.status === 'active' || userData.status === 'trial'
                ? 'bg-green-500'
                : userData.status === 'pending'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`} />
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {user?.name ?? t('profile.userNameFallback')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {user?.email ?? t('profile.emailFallback')}
          </p>
          
          {userData?.company_name && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">
                {userData.company_name}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
<div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {t('profile.activePlanLabel')}
      </p>
    </div>
    <p className="text-xl font-bold text-gray-900 dark:text-white">
      {getTranslatedPlan(userData?.active_plan)}
    </p>
    {(!userData?.active_plan || userData.active_plan.toLowerCase() === 'free') && (
      <Link 
        href={`/${language}/pricing`}
        className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-block"
      >
        {t('profile.upgradePlan')} →
      </Link>
    )}
    </div>

        <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-xl border border-green-100 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {t('profile.subscriptionEndsLabel')}
            </p>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {userData?.subscription_end
              ? formatDate(userData.subscription_end)
              : t('profile.noSubscription')}
          </p>
          {userData?.subscription_end && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ 
                    width: `${Math.max(
                      10, 
                      Math.min(
                        100, 
                        (new Date().getTime() - new Date(userData.subscription_end).getTime()) / (30 * 24 * 60 * 60 * 1000) * 100
                      )
                    )}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {t('profile.accountStatus')}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {getTranslatedStatus(userData?.status)}
            </p>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              (!userData?.status || userData.status === 'active') 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : userData.status === 'trial'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                : userData.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {userData?.status || 'active'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('profile.accountDetails')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('profile.fullName')}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-gray-900 dark:text-white text-lg">
                  {user?.name ?? t('profile.userNameFallback')}
                </p>
                {user?.email_verified && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium rounded-full">
                    {t('profile.verified')}
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Email
              </p>
              <p className="text-gray-900 dark:text-white text-lg">
                {user?.email ?? t('profile.emailFallback')}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('profile.company')}
              </p>
              <p className="text-gray-900 dark:text-white">
                {userData?.company_name ?? '—'}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('profile.accountCreated')}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-gray-900 dark:text-white">
                  {userData?.created_at
                    ? formatDate(userData.created_at)
                    : '—'}
                </p>
                {userData?.created_at && (
                  <span className="text-xs text-gray-500">
                    ({format(new Date(userData.created_at), 'PP')})
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('profile.emailsSent')}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-gray-900 dark:text-white text-2xl font-bold">
                  {userData?.emails_sent?.toLocaleString() ?? '0'}
                </p>
                <span className="text-sm text-green-600 dark:text-green-400">
                  +0% {t('profile.fromLastMonth')}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('profile.userId')}
              </p>
              <div className="flex items-center gap-2">
                <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  {user?.id?.substring(0, 8) || '—'}
                </code>
                <button 
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => user?.id && navigator.clipboard.writeText(user.id)}
                >
                  {t('profile.copy')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}