import { EMAIL_REGEXP, USERNAME_REGEXP } from './regexp';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const checkEmailValidation = (email: string): ValidationResult => {
  if (!EMAIL_REGEXP.test(email)) {
    return {
      isValid: false,
      message: '이메일 형식이 올바르지 않습니다.',
    };
  }

  return { isValid: true };
};

export const checkPasswordValidation = (password: string): ValidationResult => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: '비밀번호는 6자 이상이어야 합니다.',
    };
  }

  return { isValid: true };
};

export const checkPasswordConfirmValidation = (
  passwordConfirmation: string,
  password: string,
): ValidationResult => {
  if (password !== passwordConfirmation) {
    return {
      isValid: false,
      message: '비밀번호가 일치하지 않습니다.',
    };
  }

  return { isValid: true };
};

export const checkUsernameValidation = (username: string): ValidationResult => {
  if (username.length < 3) {
    return {
      isValid: false,
      message: '사용자명은 3자 이상이어야 합니다.',
    };
  }
  if (!USERNAME_REGEXP.test(username)) {
    return {
      isValid: false,
      message: '사용자명은 한글, 영문, 숫자, -, _만 사용할 수 있습니다.',
    };
  }

  return { isValid: true };
};

export const isValidToInputStatus = (isValid?: boolean) => {
  if (isValid === undefined) return undefined;
  return isValid ? 'success' : 'error';
};
