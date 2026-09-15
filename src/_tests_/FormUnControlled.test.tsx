import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormUnControled } from '../components/formUnControlled/formUnControlled';

import { useStore } from '../store/store';

describe('FormUnControlled tests', () => {
  // перед каждым тестом сбросить стор
  beforeEach(() => {
    useStore.setState({
      countries: ['Poland', 'France', 'Germany'],
      users: [],
    });
  });

  // отдельный хелпер для рендера контролируемой формы
  function renderForm() {
    // две функции-пустышки (пропсы для формы)
    const closeModalFunc = vi.fn();
    const setLastId = vi.fn();

    render(
      <FormUnControled closeModalFunc={closeModalFunc} setLastId={setLastId} />
    );

    // вытянем функции чтобы проверить что они вызвались
    return { closeModalFunc, setLastId };
  }

  test('Render all fields of form', () => {
    renderForm();

    expect(document.getElementById('name')).toBeInTheDocument();
    expect(document.getElementById('age')).toBeInTheDocument();
    expect(document.getElementById('email')).toBeInTheDocument();
    expect(document.getElementById('male')).toBeInTheDocument();
    expect(document.getElementById('female')).toBeInTheDocument();
    expect(document.getElementById('agree')).toBeInTheDocument();
    expect(document.getElementById('image')).toBeInTheDocument();
    expect(document.getElementById('password')).toBeInTheDocument();
    expect(document.getElementById('confirm')).toBeInTheDocument();
    expect(
      document.querySelector('input[list="countriesEU"]')
    ).toBeInTheDocument();

    // кнопка 'send'
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('Button "SEND" is active', () => {
    renderForm();

    const sendBtn = screen.getByRole('button', { name: /send/i });
    expect(sendBtn).not.toBeDisabled();
  });

  test('4 hints of dificult password are in form', () => {
    renderForm();

    expect(screen.getByText(/1 digit/)).toBeInTheDocument();
    expect(screen.getByText(/1 UP letter/)).toBeInTheDocument();
    expect(screen.getByText(/1 low letter/)).toBeInTheDocument();
    expect(screen.getByText(/1 special/)).toBeInTheDocument();
  });

  test('Click on "eye" toggles password  visibility', async () => {
    const user = userEvent.setup();

    renderForm();

    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;

    // инпут изначально скрыт (тип - password)
    expect(passwordInput.type).toBe('password');

    const eye1 = document.querySelectorAll('svg');

    await user.click(eye1[0]);
    expect(passwordInput.type).toBe('text');

    const eye2 = document.querySelectorAll('svg');
    await user.click(eye2[0]);
    expect(passwordInput.type).toBe('password');
  });

  test('Password hints respond to input', async () => {
    const user = userEvent.setup();
    renderForm();

    // получить строку инпута 'password'
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;

    // достать нужную подсказку по тексту и проверить на класс
    // т.е. если нет например цифры в пароле - то opacity-50
    function isInActiveHint(text: string) {
      return screen.getByText(text).className.includes('opacity-50');
    }

    // на старте все 4 подсказки не активны
    expect(isInActiveHint('1 digit')).toBe(true);
    expect(isInActiveHint('1 UP letter')).toBe(true);
    expect(isInActiveHint('1 low letter')).toBe(true);
    expect(isInActiveHint('1 special')).toBe(true);

    // вводим малую букву - '1 low letter' - активна
    await user.type(passwordInput, 'b');
    expect(isInActiveHint('1 digit')).toBe(true);
    expect(isInActiveHint('1 UP letter')).toBe(true);
    expect(isInActiveHint('1 low letter')).toBe(false);
    expect(isInActiveHint('1 special')).toBe(true);

    // вводим большую букву - '1 UP letter' - активна
    await user.type(passwordInput, 'A');
    expect(isInActiveHint('1 UP letter')).toBe(false);

    // вводим цифру — '1 digit активна'.
    await user.type(passwordInput, '1');
    expect(isInActiveHint('1 digit')).toBe(false);

    // вводим спецсимвол — все активны.
    await user.type(passwordInput, '!');
    expect(isInActiveHint('1 special')).toBe(false);
  });

  test('Submit with invalid fields will call errors', async () => {
    const user = userEvent.setup();
    renderForm();

    const btnSend = screen.getByRole('button', { name: /send/i });
    await user.click(btnSend);

    // ожидаем все ошибки на экране после клика отправить без полей
    expect(
      screen.getByText('First letter capitalized. Latin letters only')
    ).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Select gender')).toBeInTheDocument();
    expect(screen.getByText('Accept the terms')).toBeInTheDocument();
    expect(
      screen.getByText('Upload a PNG or JPEG image no larger than 5MB')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select a country from the list')
    ).toBeInTheDocument();
  });

  test('Submit form with 1 invalid field', async () => {
    const user = userEvent.setup();
    renderForm();

    // это поле НЕ валидно (имя с маленькой буквы) остальные валидны
    await user.type(
      document.getElementById('name') as HTMLInputElement,
      'ivan'
    );

    await user.type(document.getElementById('age') as HTMLInputElement, '30');

    await user.type(
      document.getElementById('email') as HTMLInputElement,
      'ivan@mail.com'
    );

    await user.click(document.getElementById('male') as HTMLInputElement);

    await user.click(document.getElementById('agree') as HTMLInputElement);

    // создать фейковый файл и как-бы загпузить какртинку
    const file = new File(['x'], 'test.png', { type: 'image/png' });
    await user.upload(
      document.getElementById('image') as HTMLInputElement,
      file
    );

    await user.type(
      document.getElementById('password') as HTMLInputElement,
      'Pass1!'
    );

    await user.type(
      document.getElementById('confirm') as HTMLInputElement,
      'Pass1!'
    );

    await user.type(
      document.getElementById('country') as HTMLInputElement,
      'Poland'
    );
  });
});
