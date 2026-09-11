export function checkPassword(currentPassword: string) {
  const hasDigit = /\d/.test(currentPassword);
  const hasUpperCase = /[A-Z]/.test(currentPassword);
  const hasLowerCase = /[a-z]/.test(currentPassword);
  const hasSpecial = /[!@#$%^&*]/.test(currentPassword);

  return { hasDigit, hasUpperCase, hasLowerCase, hasSpecial };
}

export function passwordComplexity(
  currentPassword: string,
  currentConfirm: string
) {
  const hasDigit = /\d/.test(currentPassword);
  const hasUpperCase = /[A-Z]/.test(currentPassword);
  const hasLowerCase = /[a-z]/.test(currentPassword);
  const hasSpecial = /[!@#$%^&*]/.test(currentPassword);
  const isPasswordDifficult =
    hasDigit && hasUpperCase && hasLowerCase && hasSpecial;
  const isConfirm = currentPassword === currentConfirm;

  return {
    hasDigit,
    hasUpperCase,
    hasLowerCase,
    hasSpecial,
    isPasswordDifficult,
    isConfirm,
  };
}
