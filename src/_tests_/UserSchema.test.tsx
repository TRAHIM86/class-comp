import { userSchema } from '../schemas/userSchema';

describe('useSchema', () => {
  const countries = ['Poland', 'France', 'Germany'];

  // Создаём схему один раз — она не меняется между тестами.
  const schema = userSchema(countries);

  // создаём настоящий File — картинку PNG.
  const fakeFile = new File(['something'], 'test.png', { type: 'image/png' });

  // фейк того, что возвращает инпутФайл (файлы по индексам, длина
  // метод возвращающий файлы по индексу)
  const fakeFileList = {
    0: fakeFile,
    length: 1,
    item: (i: number) => (i === 0 ? fakeFile : null),
  };

  // функция которая возвращает НОВЫЙ объект +
  // принимает overrides - изменения, т.е. можем вернуть
  // наш объект + изменить поля (например возраст минус 5)
  // т.к. наши тесты буду менять поля (а нужен новый всегда)
  const makeValidData = (overrides = {}) => ({
    name: 'Ivan',
    age: 30,
    email: 'ivan@mail.com',
    gender: 'male',
    agree: true,
    password: 'Pass1!',
    confirm: 'Pass1!',
    image: fakeFileList,
    country: 'Poland',
    ...overrides,
  });

  // валидный тест
  test('is valid data', () => {
    const result = schema.safeParse(makeValidData());
    expect(result.success).toBe(true);
  });

  /********** тесты на возраст **********/

  test('age under 1 - error', () => {
    const result = schema.safeParse(makeValidData({ age: -5 }));
    expect(result.success).toBe(false);
  });

  /********** тесты на мыло **********/

  // тест на отсутствие собаки в мыле
  test('email without @ - error', () => {
    const result = schema.safeParse(makeValidData({ email: 'ivanmail.com' }));
    expect(result.success).toBe(false);
  });

  // тест на две собаки в мыле
  test('two @ - error', () => {
    const result = schema.safeParse(makeValidData({ email: 'ivan@@mail.com' }));
    expect(result.success).toBe(false);
  });

  // тест на пустую первую часть
  test('the first part is empty - error', () => {
    const result = schema.safeParse(makeValidData({ email: '@mail.com' }));
    expect(result.success).toBe(false);
  });

  // тест на отсутствие точки во второй части
  test('the secont part without dot - error', () => {
    const result = schema.safeParse(makeValidData({ email: 'ivan@mail' }));
    expect(result.success).toBe(false);
  });

  // тест на точку в самом начале второй части
  test('the secont part starts with dot - error', () => {
    const result = schema.safeParse(makeValidData({ email: 'ivan@.com' }));
    expect(result.success).toBe(false);
  });

  // тест на точку в самом конце второй части
  test('the secont part ends with dot - error', () => {
    const result = schema.safeParse(makeValidData({ email: 'ivan@mail.' }));
    expect(result.success).toBe(false);
  });

  /********** тесты на гендер **********/

  // тест на гендер 'female' (проверка на 'male'- в первом дефолтном тесте)
  test('gender is male - valid', () => {
    const result = schema.safeParse(makeValidData({ gender: 'female' }));
    expect(result.success).toBe(true);
  });

  // тест на гендер '' (пустая строка - т.е. не выбран)
  test('gender did nod klicked', () => {
    const result = schema.safeParse(makeValidData({ gender: '' }));
    expect(result.success).toBe(false);
  });

  /********** тесты на agree **********/

  // тест на "agree" - согласен
  test('agree did clicked', () => {
    const result = schema.safeParse(makeValidData({ agree: true }));
    expect(result.success).toBe(true);
  });

  // тест на "agree" - не согласен
  test('agree did not clicked', () => {
    const result = schema.safeParse(makeValidData({ agree: false }));
    expect(result.success).toBe(false);
  });

  /********** тесты на пароль и проверку**********/
  // тест на пароль без цифры
  test('password without digit - error', () => {
    const result = schema.safeParse(
      makeValidData({ password: 'Pass!', confirm: 'Pass!' })
    );
    expect(result.success).toBe(false);
  });

  // тест на пароль без большой буквы
  test('password without UP letter - error', () => {
    const result = schema.safeParse(
      makeValidData({ password: 'pass!', confirm: 'pass!' })
    );
    expect(result.success).toBe(false);
  });

  // тест на пароль без малой буквы
  test('password without low letter - error', () => {
    const result = schema.safeParse(
      makeValidData({ password: 'PASS1!', confirm: 'PASS1!' })
    );
    expect(result.success).toBe(false);
  });

  // тест на пароль без спецсимвола
  test('password without low special', () => {
    const result = schema.safeParse(
      makeValidData({ password: 'Pass11', confirm: 'Pass11' })
    );
    expect(result.success).toBe(false);
  });

  // тест что ошибка именно confirm
  test('error in confirm field', () => {
    const result = schema.safeParse(
      makeValidData({ password: 'Pass1!', confirm: 'Other1!' })
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(['confirm']);
    }
  });
});
