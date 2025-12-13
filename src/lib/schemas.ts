export type ValidationRule = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  message?: string;
};

export type ValidationRules = {
  [key: string]: ValidationRule;
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const urlRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

export const validationRules: ValidationRules = {
  email: {
    required: true,
    pattern: emailRegex,
    message: 'invalidEmail'
  },
  url: {
    required: true,
    pattern: urlRegex,
    message: 'invalidUrl'
  },
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: 'requiredField'
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: 'requiredField'
  },
  reportingReason: {
    required: true,
    minLength: 50,
    maxLength: 2000,
    message: 'minCharacters'
  },
  ownershipExplanation: {
    required: true,
    minLength: 100,
    maxLength: 1000,
    message: 'minCharacters'
  },
  phone: {
    pattern: /^[\+]?[0-9\s\-\(\)]{10,15}$/,
    message: 'invalidPhone'
  }
};
