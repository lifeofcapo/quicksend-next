'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { FORM_CONSTANTS, ReportData } from '@/lib/tenty-form';
import TentyInfo from '@/components/TentyInfo';
import { useSession } from 'next-auth/react';

export default function TentyReportForm() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();

  if (status === 'loading') return <div className="p-4 text-center">Loading...</div>;
  if (status === 'unauthenticated') return <div className="p-4 text-center">Please sign in to submit a report</div>;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReportData>({
    firstName: '', lastName: '', companyName: '', mailingAddress: '',
    phoneNumber: '', email: '', additionalContacts: '', reportingPlatform: '',
    reportType: '', contentType: '', reportingReason: '', evidenceUrl: '',
    ownershipType: '', ownershipExplanation: '', agreeTerms: false,
    agreeAccuracy: false, agreePenalties: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ReportData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: t('tenty.personalInfo') },
    { number: 2, title: t('tenty.reportDetails') },
    { number: 3, title: t('tenty.ownershipProof') },
    { number: 4, title: t('tenty.reviewSubmit') },
  ];

  const handleChange = <K extends keyof ReportData>(field: K, value: ReportData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof ReportData, string>> = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = t('tenty.requiredField');
      if (!formData.lastName.trim()) newErrors.lastName = t('tenty.requiredField');
      if (!formData.email.trim()) newErrors.email = t('tenty.requiredField');
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('tenty.invalidEmail');
    }
    if (step === 2) {
      if (!formData.reportingPlatform) newErrors.reportingPlatform = t('tenty.requiredField');
      if (!formData.reportType) newErrors.reportType = t('tenty.requiredField');
      if (!formData.contentType) newErrors.contentType = t('tenty.requiredField');
      if (!formData.reportingReason.trim()) newErrors.reportingReason = t('tenty.requiredField');
      else if (formData.reportingReason.length < 50) newErrors.reportingReason = t('tenty.minCharacters', { count: 50 });
      else if (formData.reportingReason.length > 2000) newErrors.reportingReason = t('tenty.maxCharacters', { count: 2000 });
    }
    if (step === 3) {
      if (!formData.evidenceUrl.trim()) newErrors.evidenceUrl = t('tenty.requiredField');
      else if (!/^(https?:\/\/)/.test(formData.evidenceUrl)) newErrors.evidenceUrl = t('tenty.invalidUrl');
      if (!formData.ownershipType) newErrors.ownershipType = t('tenty.requiredField');
      if (!formData.ownershipExplanation.trim()) newErrors.ownershipExplanation = t('tenty.requiredField');
      else if (formData.ownershipExplanation.length < 100) newErrors.ownershipExplanation = t('tenty.minCharacters', { count: 100 });
    }
    if (step === 4) {
      if (!formData.agreeTerms) newErrors.agreeTerms = t('tenty.agreeRequired');
      if (!formData.agreeAccuracy) newErrors.agreeAccuracy = t('tenty.agreeRequired');
      if (!formData.agreePenalties) newErrors.agreePenalties = t('tenty.agreeRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep(currentStep)) setCurrentStep(prev => Math.min(prev + 1, 4)); };
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/tenty/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert(t('tenty.submitSuccess'));
        setFormData({
          firstName: '', lastName: '', companyName: '', mailingAddress: '',
          phoneNumber: '', email: '', additionalContacts: '', reportingPlatform: '',
          reportType: '', contentType: '', reportingReason: '', evidenceUrl: '',
          ownershipType: '', ownershipExplanation: '', agreeTerms: false,
          agreeAccuracy: false, agreePenalties: false,
        });
        setCurrentStep(1);
      } else throw new Error('Submission failed');
    } catch {
      alert(t('tenty.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((currentStep - 1) / 3) * 100;
  const inputBase = 'w-full px-3 sm:px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm sm:text-base';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <TentyInfo />

      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between mb-2">
          {steps.map(step => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 sm:mb-2 text-sm sm:text-base ${
                currentStep >= step.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                {currentStep > step.number ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <span className="font-medium">{step.number}</span>
                )}
              </div>
              <span className={`text-xs sm:text-sm font-medium hidden xs:block sm:block text-center max-w-[60px] sm:max-w-none ${
                currentStep >= step.number ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {currentStep === 1 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t('tenty.personalInfoTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { field: 'firstName' as const, label: t('tenty.firstName'), required: true },
                { field: 'lastName' as const, label: t('tenty.lastName'), required: true },
                { field: 'companyName' as const, label: t('tenty.companyName') },
                { field: 'phoneNumber' as const, label: t('tenty.phoneNumber'), type: 'tel' },
              ].map(({ field, label, required, type }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                    {label} {required && '*'}
                  </label>
                  <input
                    type={type || 'text'}
                    value={formData[field] as string}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className={`${inputBase} ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors[field] && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors[field]}</p>}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">{t('tenty.mailingAddress')}</label>
              <textarea
                value={formData.mailingAddress}
                onChange={(e) => handleChange('mailingAddress', e.target.value)}
                rows={3}
                className={`${inputBase} border-gray-300`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">{t('tenty.email')} *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`${inputBase} ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">{t('tenty.additionalContacts')}</label>
                <input
                  type="text"
                  value={formData.additionalContacts}
                  onChange={(e) => handleChange('additionalContacts', e.target.value)}
                  className={`${inputBase} border-gray-300`}
                  placeholder={t('tenty.additionalContactsPlaceholder')}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t('tenty.reportDetailsTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">{t('tenty.reportingPlatform')} *</label>
                <select value={formData.reportingPlatform} onChange={(e) => handleChange('reportingPlatform', e.target.value)} className={`${inputBase} ${errors.reportingPlatform ? 'border-red-500' : 'border-gray-300'}`}>
                  <option value="">{t('tenty.selectPlatform')}</option>
                  {FORM_CONSTANTS.platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.reportingPlatform && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.reportingPlatform}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">{t('tenty.reportType')} *</label>
                <select value={formData.reportType} onChange={(e) => handleChange('reportType', e.target.value)} className={`${inputBase} ${errors.reportType ? 'border-red-500' : 'border-gray-300'}`}>
                  <option value="">{t('tenty.selectReportType')}</option>
                  {FORM_CONSTANTS.reportTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                {errors.reportType && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.reportType}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">{t('tenty.contentType')} *</label>
              <select value={formData.contentType} onChange={(e) => handleChange('contentType', e.target.value)} className={`${inputBase} ${errors.contentType ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">{t('tenty.selectContentType')}</option>
                {FORM_CONSTANTS.contentTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              {errors.contentType && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.contentType}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                {t('tenty.reportingReason')} *
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {formData.reportingReason.length}/2000 {t('tenty.characters')}
                </span>
              </label>
              <textarea
                value={formData.reportingReason}
                onChange={(e) => handleChange('reportingReason', e.target.value)}
                rows={5}
                maxLength={2000}
                className={`${inputBase} ${errors.reportingReason ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={t('tenty.reportingReasonPlaceholder')}
              />
              {errors.reportingReason && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.reportingReason}</p>}
            </div>
          </div>
        )}


        {currentStep === 3 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t('tenty.ownershipProofTitle')}</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">{t('tenty.evidenceUrl')} *</label>
              <input type="url" value={formData.evidenceUrl} onChange={(e) => handleChange('evidenceUrl', e.target.value)} className={`${inputBase} ${errors.evidenceUrl ? 'border-red-500' : 'border-gray-300'}`} placeholder="https://example.com/proof" />
              <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('tenty.evidenceUrlHelp')}</p>
              {errors.evidenceUrl && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.evidenceUrl}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">{t('tenty.ownershipType')} *</label>
              <select value={formData.ownershipType} onChange={(e) => handleChange('ownershipType', e.target.value)} className={`${inputBase} ${errors.ownershipType ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">{t('tenty.selectOwnershipType')}</option>
                {FORM_CONSTANTS.ownershipTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              {errors.ownershipType && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.ownershipType}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                {t('tenty.ownershipExplanation')} *
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {formData.ownershipExplanation.length}/1000 {t('tenty.characters')}
                </span>
              </label>
              <textarea
                value={formData.ownershipExplanation}
                onChange={(e) => handleChange('ownershipExplanation', e.target.value)}
                rows={6}
                maxLength={1000}
                className={`${inputBase} ${errors.ownershipExplanation ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={t('tenty.ownershipExplanationPlaceholder')}
              />
              {errors.ownershipExplanation && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.ownershipExplanation}</p>}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t('tenty.reviewSubmitTitle')}</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-base sm:text-lg mb-3">{t('tenty.personalInfo')}</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { label: t('tenty.firstName'), value: formData.firstName },
                    { label: t('tenty.lastName'), value: formData.lastName },
                    { label: t('tenty.email'), value: formData.email },
                    { label: t('tenty.phoneNumber'), value: formData.phoneNumber || t('tenty.notProvided') },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
                      <p className="font-medium text-sm sm:text-base break-all">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-base sm:text-lg mb-3">{t('tenty.reportDetails')}</h3>
                <div className="space-y-2">
                  {[
                    { label: t('tenty.reportingPlatform'), value: formData.reportingPlatform },
                    { label: t('tenty.reportType'), value: formData.reportType },
                    { label: t('tenty.contentType'), value: formData.contentType },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
                      <p className="font-medium text-sm sm:text-base">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-base sm:text-lg mb-3">{t('tenty.ownershipProof')}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">{t('tenty.evidenceUrl')}</p>
                    <p className="font-medium text-sm sm:text-base break-all">{formData.evidenceUrl}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">{t('tenty.ownershipType')}</p>
                    <p className="font-medium text-sm sm:text-base">{formData.ownershipType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              {[
                {
                  id: 'agreeTerms' as const,
                  title: t('tenty.agreeTermsTitle'),
                  text: t('tenty.agreeTermsText'),
                },
                {
                  id: 'agreeAccuracy' as const,
                  title: t('tenty.agreeAccuracyTitle'),
                  text: t('tenty.agreeAccuracyText'),
                },
                {
                  id: 'agreePenalties' as const,
                  title: t('tenty.agreePenaltiesTitle'),
                  text: t('tenty.agreePenaltiesText'),
                },
              ].map(({ id, title, text }) => (
                <div key={id}>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={id}
                      checked={formData[id] as boolean}
                      onChange={(e) => handleChange(id, e.target.checked)}
                      className="mt-1 w-4 h-4 shrink-0"
                    />
                    <div>
                      <label htmlFor={id} className="font-medium text-sm sm:text-base cursor-pointer">{title}</label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{text}</p>
                    </div>
                  </div>
                  {errors[id] && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors[id]}</p>}
                </div>
              ))}
            </div>
          </div>
        )}


        <div className="flex justify-between pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('tenty.previous')}
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {t('tenty.next')}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  {t('tenty.submitting')}
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {t('tenty.submitReport')}
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}