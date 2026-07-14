import { validationRules, ValidationRule } from './schemas';

export type FormData = {
  [key: string]: string | boolean | number | undefined;
};

export type TranslationFunction = (key: string, params?: Record<string, string | number>) => string;

const str = (val: string | boolean | number | undefined): string =>
  val === undefined || val === null ? '' : String(val);

export const validateStep = (
  step: number, 
  formData: FormData,
  t: TranslationFunction
): Record<string, string> => {
  const errors: Record<string, string> = {};

  const validateField = (
    fieldName: string,
    value: string,
    rule: ValidationRule
  ): string | null => {
    if (rule.required && (!value || value.trim() === '')) {
      return t('tenty.requiredField');
    }
    
    if (rule.pattern && value && !rule.pattern.test(value)) {
      return rule.message ? t(`tenty.${rule.message}`) : t('tenty.invalidFormat');
    }
    
    if (rule.minLength && value.length < rule.minLength) {
      return t('tenty.minCharacters', { count: rule.minLength });
    }
    
    if (rule.maxLength && value.length > rule.maxLength) {
      return t('tenty.maxCharacters', { count: rule.maxLength });
    }
    
    return null;
  };

  switch (step) {
    case 1:
      const firstNameError = validateField('firstName', str(formData.firstName), validationRules.firstName!);
      if (firstNameError) errors.firstName = firstNameError;

      const lastNameError = validateField('lastName', str(formData.lastName), validationRules.lastName!);
      if (lastNameError) errors.lastName = lastNameError;

      const emailError = validateField('email', str(formData.email), validationRules.email!);
      if (emailError) errors.email = emailError;

      if (formData.phoneNumber) {
        const phoneError = validateField('phoneNumber', str(formData.phoneNumber), validationRules.phone!);
        if (phoneError) errors.phoneNumber = phoneError;
      }
      break;

    case 2:
      if (!formData.reportingPlatform) {
        errors.reportingPlatform = t('tenty.requiredField');
      }
      if (!formData.reportType) {
        errors.reportType = t('tenty.requiredField');
      }
      if (!formData.contentType) {
        errors.contentType = t('tenty.requiredField');
      }
      
      const reasonError = validateField('reportingReason', str(formData.reportingReason), validationRules.reportingReason!);
      if (reasonError) errors.reportingReason = reasonError;
      break;

    case 3:
      const urlError = validateField('evidenceUrl', str(formData.evidenceUrl), validationRules.url!);
      if (urlError) errors.evidenceUrl = urlError;
      
      if (!formData.ownershipType) {
        errors.ownershipType = t('tenty.requiredField');
      }
      
      const ownershipError = validateField('ownershipExplanation', str(formData.ownershipExplanation), validationRules.ownershipExplanation!);
      if (ownershipError) errors.ownershipExplanation = ownershipError;
      break;

    case 4:
      if (!formData.agreeTerms) {
        errors.agreeTerms = t('tenty.agreeRequired');
      }
      if (!formData.agreeAccuracy) {
        errors.agreeAccuracy = t('tenty.agreeRequired');
      }
      if (!formData.agreePenalties) {
        errors.agreePenalties = t('tenty.agreeRequired');
      }
      break;
  }

  return errors;
};