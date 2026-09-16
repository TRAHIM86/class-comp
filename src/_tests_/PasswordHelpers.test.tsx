import { checkPassword } from '../utils/passwordHelpers';

describe('checkPasswordHelpers', () => {
  test('If row is empty - all false', () => {
    const result = checkPassword('');

    expect(result.hasDigit).toBe(false);
    expect(result.hasUpperCase).toBe(false);
    expect(result.hasLowerCase).toBe(false);
    expect(result.hasSpecial).toBe(false);
  });

  test('If row is valid - all true', () => {
    const result = checkPassword('Pass1!');

    expect(result.hasDigit).toBe(true);
    expect(result.hasUpperCase).toBe(true);
    expect(result.hasLowerCase).toBe(true);
    expect(result.hasSpecial).toBe(true);
  });

  test('If has digit - true', () => {
    const result = checkPassword('abc1');
    expect(result.hasDigit).toBe(true);
  });

  test('If has not digit - false', () => {
    const result = checkPassword('abc');
    expect(result.hasDigit).toBe(false);
  });

  test('if has UP letter - true', () => {
    const result = checkPassword('abcA');
    expect(result.hasUpperCase).toBe(true);
  });

  test('if has not UP letter - false', () => {
    const result = checkPassword('abc');
    expect(result.hasUpperCase).toBe(false);
  });

  test('if has low letter - true', () => {
    const result = checkPassword('ABCx');
    expect(result.hasLowerCase).toBe(true);
  });

  test('if has not low letter — false', () => {
    const result = checkPassword('ABC');
    expect(result.hasLowerCase).toBe(false);
  });

  test('if has not low special — true', () => {
    const result = checkPassword('abc!');
    expect(result.hasSpecial).toBe(true);
  });

  test('if has not low special — false', () => {
    const result = checkPassword('abc');
    expect(result.hasSpecial).toBe(false);
  });
});
