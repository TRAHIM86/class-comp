import type { PasswordComplexity } from '../types';

export function passwordComplexity(
  currentPassword: string
): PasswordComplexity {
  const hasDigit = /\d/.test(currentPassword);
  const hasUpperCase = /[A-Z]/.test(currentPassword);
  const hasLowerCase = /[a-z]/.test(currentPassword);
  const hasSpecial = /[!@#$%^&*]/.test(currentPassword);
  const isPasswordDifficult =
    hasDigit && hasUpperCase && hasLowerCase && hasSpecial;

  return {
    hasDigit,
    hasUpperCase,
    hasLowerCase,
    hasSpecial,
    isPasswordDifficult,
  };
}
