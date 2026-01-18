'use client'

import { useState } from 'react';
import { Lock, Shield, CreditCard } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/language-context';
import TermsAgreement from '@/components/TermsAgreement';

export default function PaypalSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const subscribeButtonText = t('paypal.subscribeWithPaypal');
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="pt-24 pb-32 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-green-500 blur-md opacity-20"></div>
                        <Lock className="w-8 h-8 text-green-600 dark:text-green-400 relative" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('paypal.securePayment')}
                      </h2>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {t('paypal.securePaymentDescription')}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0 mt-1">
                        <Shield className="w-6 h-6 text-blue-500 relative z-10" />
                        <div className="absolute inset-0 bg-blue-500 blur-sm opacity-20"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {t('paypal.buyerProtection')}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t('paypal.buyerProtectionDescription')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0 mt-1">
                        <CreditCard className="w-6 h-6 text-purple-500 relative z-10" />
                        <div className="absolute inset-0 bg-purple-500 blur-sm opacity-20"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {t('paypal.multiplePaymentMethods')}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t('paypal.multiplePaymentMethodsDescription')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Lock className="w-4 h-4" />
                      <span>
                        {t('paypal.securityNote')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-8 border border-gray-200/30 dark:border-gray-700/30">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {t('paypal.selectPlan')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('paypal.selectPlanDescription')}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-300/50 dark:border-gray-600/50 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-colors group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              PayPal
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {t('paypal.creditDebitCard')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 dark:text-white">
                            {isAnnual ? '20% OFF' : 'Standard'}
                          </div>
                          <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
                            {t('paypal.recommended')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="group relative w-full py-4 rounded-lg font-semibold transition-all duration-300 overflow-hidden bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-gray-900">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="font-bold text-lg">
                          {t('paypal.subscribeWithPaypal')}
                        </div>
                        <Lock className="w-5 h-5" />
                      </div>
                      
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <TermsAgreement 
                        buttonName={subscribeButtonText} 
                        variant="paypal" 
                      />
                      <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                        <Shield className="w-3 h-3" />
                        <span>
                          {t('paypal.privacyNote')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}