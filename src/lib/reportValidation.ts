import { validationRules, ValidationRule } from './schemas';

export type FormData = {
  [key: string]: any;
};

export type TranslationFunction = (key: string, params?: Record<string, any>) => string;

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
      const firstNameError = validateField('firstName', formData.firstName, validationRules.firstName!);
      if (firstNameError) errors.firstName = firstNameError;
      
      const lastNameError = validateField('lastName', formData.lastName, validationRules.lastName!);
      if (lastNameError) errors.lastName = lastNameError;
      
      const emailError = validateField('email', formData.email, validationRules.email!);
      if (emailError) errors.email = emailError;
      
      if (formData.phoneNumber) {
        const phoneError = validateField('phoneNumber', formData.phoneNumber, validationRules.phone!);
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
      
      const reasonError = validateField('reportingReason', formData.reportingReason, validationRules.reportingReason!);
      if (reasonError) errors.reportingReason = reasonError;
      break;

    case 3:
      const urlError = validateField('evidenceUrl', formData.evidenceUrl, validationRules.url!);
      if (urlError) errors.evidenceUrl = urlError;
      
      if (!formData.ownershipType) {
        errors.ownershipType = t('tenty.requiredField');
      }
      
      const ownershipError = validateField(
        'ownershipExplanation', 
        formData.ownershipExplanation, 
        validationRules.ownershipExplanation!
      );
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