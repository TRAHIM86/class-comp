import type { PasswordComplexity } from '../types';

export function passwordComplexity(
  currentPassword: string,
  confirm: string
): PasswordComplexity {
  const hasDigit = /\d/.test(currentPassword);
  const hasUpperCase = /[A-Z]/.test(currentPassword);
  const hasLowerCase = /[a-z]/.test(currentPassword);
  const hasSpecial = /[!@#$%^&*]/.test(currentPassword);
  const isPasswordDifficult =
    hasDigit && hasUpperCase && hasLowerCase && hasSpecial;

  const isConfirm = currentPassword === confirm;

  return {
    hasDigit,
    hasUpperCase,
    hasLowerCase,
    hasSpecial,
    isPasswordDifficult,
    isConfirm,
  };
}
