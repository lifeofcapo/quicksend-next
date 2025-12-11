'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, ArrowLeft, Check, AlertCircle } from 'lucide-react';


interface ReportData {
  firstName: string;
  lastName: string;
  companyName: string;
  mailingAddress: string;
  phoneNumber: string;
  email: string;
  additionalContacts: string;
  
  reportingPlatform: string;
  reportType: string;
  contentType: string;
  reportingReason: string;
  
  evidenceUrl: string;
  ownershipType: string;
  ownershipExplanation: string;
  
  agreeTerms: boolean;
  agreeAccuracy: boolean;
  agreePenalties: boolean;
}

export default function TentyReportForm() {
  const { t } = useTranslation();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReportData>({
    firstName: '',
    lastName: '',
    companyName: '',
    mailingAddress: '',
    phoneNumber: '',
    email: '',
    additionalContacts: '',
    reportingPlatform: '',
    reportType: '',
    contentType: '',
    reportingReason: '',
    evidenceUrl: '',
    ownershipType: '',
    ownershipExplanation: '',
    agreeTerms: false,
    agreeAccuracy: false,
    agreePenalties: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReportData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const platforms = [
    'TikTok',
    'YouTube',
    'Spotify',
    'SoundCloud',
    'Apple Music',
    'iTunes',
    'Deezer',
    'Amazon Music',
    'Bandcamp',
    'Beatport',
    'Mixcloud',
    'Pandora',
    'Tidal',
    'Google Play Music',
    'Yandex Music',
    'VK Music',
    'Audiomack',
    'ReverbNation',
    'DistroKid',
    'CD Baby',
  ];

  // Report types
  const reportTypes = [
    'Copyright Infringement',
    'Trademark Violation',
    'Right of Publicity/Likeness',
    'Defamation',
    'Privacy Violation',
    'Counterfeit/Impersonation',
    'Unauthorized Sampling',
    'Plagiarism',
  ];

  // Content types
  const contentTypes = [
    'Music Composition',
    'Sound Recording',
    'Music Video',
    'Podcast',
    'Cover Song',
    'Remix',
    'Mashup',
    'Lyrics',
    'Album Artwork',
    'Artist Biography',
    'Playlist',
    'Live Performance',
    'DJ Set',
    'Beat/Instrumental',
    'Sound Effect',
    'Audio Book',
    'Jingle',
    'Film Score',
  ];

  // Ownership types
  const ownershipTypes = [
    'I own the composition',
    'I own the sound recording',
    'I own the video content',
    'I own the lyrics/text',
    'I own the artwork/visuals',
    'I represent the rights holder',
    'I am the authorized agent',
    'I have exclusive license',
  ];

  const steps = [
    { number: 1, title: t('tenty.personalInfo') },
    { number: 2, title: t('tenty.reportDetails') },
    { number: 3, title: t('tenty.ownershipProof') },
    { number: 4, title: t('tenty.reviewSubmit') },
  ];

  const handleChange = (field: keyof ReportData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof ReportData, string>> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = t('tenty.requiredField');
      if (!formData.lastName.trim()) newErrors.lastName = t('tenty.requiredField');
      if (!formData.email.trim()) {
        newErrors.email = t('tenty.requiredField');
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = t('tenty.invalidEmail');
      }
    }

    if (step === 2) {
      if (!formData.reportingPlatform) newErrors.reportingPlatform = t('tenty.requiredField');
      if (!formData.reportType) newErrors.reportType = t('tenty.requiredField');
      if (!formData.contentType) newErrors.contentType = t('tenty.requiredField');
      if (!formData.reportingReason.trim()) {
        newErrors.reportingReason = t('tenty.requiredField');
      } else if (formData.reportingReason.length < 50) {
        newErrors.reportingReason = t('tenty.minCharacters', { count: 50 });
      } else if (formData.reportingReason.length > 2000) {
        newErrors.reportingReason = t('tenty.maxCharacters', { count: 2000 });
      }
    }

    if (step === 3) {
      if (!formData.evidenceUrl.trim()) {
        newErrors.evidenceUrl = t('tenty.requiredField');
      } else if (!/^(https?:\/\/)/.test(formData.evidenceUrl)) {
        newErrors.evidenceUrl = t('tenty.invalidUrl');
      }
      if (!formData.ownershipType) newErrors.ownershipType = t('tenty.requiredField');
      if (!formData.ownershipExplanation.trim()) {
        newErrors.ownershipExplanation = t('tenty.requiredField');
      } else if (formData.ownershipExplanation.length < 100) {
        newErrors.ownershipExplanation = t('tenty.minCharacters', { count: 100 });
      }
    }

    if (step === 4) {
      if (!formData.agreeTerms) newErrors.agreeTerms = t('tenty.agreeRequired');
      if (!formData.agreeAccuracy) newErrors.agreeAccuracy = t('tenty.agreeRequired');
      if (!formData.agreePenalties) newErrors.agreePenalties = t('tenty.agreeRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Здесь будет API запрос для отправки формы
      const response = await fetch('/api/tenty/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(t('tenty.submitSuccess'));
        // Сброс формы или перенаправление
        setFormData({
          firstName: '',
          lastName: '',
          companyName: '',
          mailingAddress: '',
          phoneNumber: '',
          email: '',
          additionalContacts: '',
          reportingPlatform: '',
          reportType: '',
          contentType: '',
          reportingReason: '',
          evidenceUrl: '',
          ownershipType: '',
          ownershipExplanation: '',
          agreeTerms: false,
          agreeAccuracy: false,
          agreePenalties: false,
        });
        setCurrentStep(1);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      alert(t('tenty.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress bar percentage
  const progressPercentage = ((currentStep - 1) / 3) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with warning */}
      <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              {t('tenty.importantNotice')}
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              {t('tenty.legalWarning')}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map(step => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center mb-2
                ${currentStep >= step.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }
              `}>
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-medium">{step.number}</span>
                )}
              </div>
              <span className={`text-sm font-medium ${
                currentStep >= step.number
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('tenty.personalInfoTitle')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tenty.firstName')} *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tenty.lastName')} *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tenty.companyName')}
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tenty.phoneNumber')}
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tenty.mailingAddress')}
              </label>
              <textarea
                value={formData.mailingAddress}
                onChange={(e) => handleChange('mailingAddress', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tenty.email')} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tenty.additionalContacts')}
                </label>
                <input
                  type="text"
                  value={formData.additionalContacts}
                  onChange={(e) => handleChange('additionalContacts', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  placeholder={t('tenty.additionalContactsPlaceholder')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Report Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('tenty.reportDetailsTitle')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tenty.reportingPlatform')} *
                </label>
                <select
                  value={formData.reportingPlatform}
                  onChange={(e) => handleChange('reportingPlatform', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                    errors.reportingPlatform ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('tenty.selectPlatform')}</option>
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
                {errors.reportingPlatform && (
                  <p className="mt-1 text-sm text-red-600">{errors.reportingPlatform}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tenty.reportType')} *
                </label>
                <select
                  value={formData.reportType}
                  onChange={(e) => handleChange('reportType', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                    errors.reportType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('tenty.selectReportType')}</option>
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.reportType && (
                  <p className="mt-1 text-sm text-red-600">{errors.reportType}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tenty.contentType')} *
              </label>
              <select
                value={formData.contentType}
                onChange={(e) => handleChange('contentType', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                  errors.contentType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{t('tenty.selectContentType')}</option>
                {contentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.contentType && (
                <p className="mt-1 text-sm text-red-600">{errors.contentType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tenty.reportingReason')} *
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {formData.reportingReason.length}/2000 {t('tenty.characters')}
                </span>
              </label>
              <textarea
                value={formData.reportingReason}
                onChange={(e) => handleChange('reportingReason', e.target.value)}
                rows={6}
                maxLength={2000}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                  errors.reportingReason ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('tenty.reportingReasonPlaceholder')}
              />
              {errors.reportingReason && (
                <p className="mt-1 text-sm text-red-600">{errors.reportingReason}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Ownership Proof */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('tenty.ownershipProofTitle')}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tenty.evidenceUrl')} *
              </label>
              <input
                type="url"
                value={formData.evidenceUrl}
                onChange={(e) => handleChange('evidenceUrl', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                  errors.evidenceUrl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/proof"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t('tenty.evidenceUrlHelp')}
              </p>
              {errors.evidenceUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.evidenceUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tenty.ownershipType')} *
              </label>
              <select
                value={formData.ownershipType}
                onChange={(e) => handleChange('ownershipType', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                  errors.ownershipType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{t('tenty.selectOwnershipType')}</option>
                {ownershipTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.ownershipType && (
                <p className="mt-1 text-sm text-red-600">{errors.ownershipType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tenty.ownershipExplanation')} *
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {formData.ownershipExplanation.length}/1000 {t('tenty.characters')}
                </span>
              </label>
              <textarea
                value={formData.ownershipExplanation}
                onChange={(e) => handleChange('ownershipExplanation', e.target.value)}
                rows={8}
                maxLength={1000}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 ${
                  errors.ownershipExplanation ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('tenty.ownershipExplanationPlaceholder')}
              />
              {errors.ownershipExplanation && (
                <p className="mt-1 text-sm text-red-600">{errors.ownershipExplanation}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Review and Submit */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('tenty.reviewSubmitTitle')}
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">{t('tenty.personalInfo')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{t('tenty.firstName')}</p>
                    <p className="font-medium">{formData.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tenty.lastName')}</p>
                    <p className="font-medium">{formData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tenty.email')}</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tenty.phoneNumber')}</p>
                    <p className="font-medium">{formData.phoneNumber || t('tenty.notProvided')}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">{t('tenty.reportDetails')}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">{t('tenty.reportingPlatform')}</p>
                    <p className="font-medium">{formData.reportingPlatform}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tenty.reportType')}</p>
                    <p className="font-medium">{formData.reportType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tenty.contentType')}</p>
                    <p className="font-medium">{formData.contentType}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">{t('tenty.ownershipProof')}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">{t('tenty.evidenceUrl')}</p>
                    <p className="font-medium break-all">{formData.evidenceUrl}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tenty.ownershipType')}</p>
                    <p className="font-medium">{formData.ownershipType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreements */}
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="agreeTerms" className="font-medium">
                    {t('tenty.agreeTermsTitle')}
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('tenty.agreeTermsText')}
                  </p>
                </div>
              </div>
              {errors.agreeTerms && (
                <p className="text-sm text-red-600">{errors.agreeTerms}</p>
              )}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeAccuracy"
                  checked={formData.agreeAccuracy}
                  onChange={(e) => handleChange('agreeAccuracy', e.target.checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="agreeAccuracy" className="font-medium">
                    {t('tenty.agreeAccuracyTitle')}
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('tenty.agreeAccuracyText')}
                  </p>
                </div>
              </div>
              {errors.agreeAccuracy && (
                <p className="text-sm text-red-600">{errors.agreeAccuracy}</p>
              )}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreePenalties"
                  checked={formData.agreePenalties}
                  onChange={(e) => handleChange('agreePenalties', e.target.checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="agreePenalties" className="font-medium">
                    {t('tenty.agreePenaltiesTitle')}
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('tenty.agreePenaltiesText')}
                  </p>
                </div>
              </div>
              {errors.agreePenalties && (
                <p className="text-sm text-red-600">{errors.agreePenalties}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('tenty.previous')}
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              {t('tenty.next')}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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