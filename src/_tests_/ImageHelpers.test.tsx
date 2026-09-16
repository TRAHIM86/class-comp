import { fileToBase64 } from '../utils/imageHelpers';

describe('fileToBase64', () => {
  // сохраним на всякий п.ж. оригинальный FileReader,
  // т.к. будем его подменять моком
  const OriginalFileReader = globalThis.FileReader;

  // после тестов вернем оригинальный FileReader (для других тестов)
  afterAll(() => {
    globalThis.FileReader = OriginalFileReader;
  });

  test('returns a base64 string upon successful reading', async () => {
    // ожидаемый фейковый результат (любая строка)
    const fakeResult = 'data:image/png;base64,iVBORw0KGgo=';

    // подменить глобальный FileReader на фейк
    globalThis.FileReader = class {
      result: string | null = null;

      onloadend: (() => void) | null = null;

      readAsDataURL() {
        this.result = fakeResult;
        this.onloadend?.();
      }
    } as unknown as typeof FileReader;

    const fakeFile = new File(['any content'], 'test.png', {
      type: 'image/png',
    });

    const result = await fileToBase64(fakeFile);

    expect(result).toBe(fakeResult);
  });

  test('rejects with an error if result is not a string', async () => {
    // подменяем глобальный globalThis.FileReader
    globalThis.FileReader = class {
      result: string | ArrayBuffer | null = null;
      onloadend: (() => void) | null = null;

      readAsDataURL() {
        this.result = null;
        this.onloadend?.();
      }
    } as unknown as typeof FileReader;

    const fakeFile = new File(['any content'], 'test.png', {
      type: 'image/png',
    });

    await expect(fileToBase64(fakeFile)).rejects.toBe('Error reading file IMG');
  });
});
