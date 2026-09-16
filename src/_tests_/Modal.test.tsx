import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from '../components/modal/modal';

describe('Modal test', () => {
  // Хелпер для рендера модалки
  function renderModal(isOpen: boolean) {
    // функция-vi для пропсов
    const onClose = vi.fn();

    render(
      <Modal isOpen={isOpen} onClose={onClose}>
        <p>Test</p>
      </Modal>
    );

    // вытянуть функцию-vi для проверки на ней вызовов
    return { onClose };
  }

  test('If props of Modal === false do not render', () => {
    renderModal(false);

    // модалки не должно быть
    expect(screen.queryByText('Test content')).toBeNull();

    // Кнопки CLOSE тоже быть не должно.
    expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
  });

  test('If props of Modal === true do render', () => {
    renderModal(true);

    // Children отрисовались.
    expect(screen.getByText('Test')).toBeInTheDocument();

    // Кнопка CLOSE есть.
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('Click on btn "close" call onClose', async () => {
    const user = userEvent.setup();

    // вытянем vi функцию-пустышку
    const { onClose } = renderModal(true);

    const btnClose = screen.getByRole('button', { name: /close/i });

    await user.click(btnClose);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Click on overlay close modal window', async () => {
    const user = userEvent.setup();

    // вытянем vi функцию-пустышку
    const { onClose } = renderModal(true);

    const overlay = screen.getByTestId('overlay');
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Click on modal-box do not close modal window', async () => {
    const user = userEvent.setup();

    // вытянем vi функцию-пустышку
    const { onClose } = renderModal(true);

    const modalBox = screen.getByTestId('modal-box');

    await user.click(modalBox);

    // stopPropagation не дал клику дойти до оверлея, т.е. onClose не вызвался.
    expect(onClose).not.toHaveBeenCalled();
  });

  test('Escape close modal window', async () => {
    const user = userEvent.setup();

    // вытянем vi функцию-пустышку
    const { onClose } = renderModal(true);

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Other key do not call onClose', async () => {
    const user = userEvent.setup();

    // вытянем vi функцию-пустышку
    const { onClose } = renderModal(true);

    await user.keyboard('{Enter}');
    expect(onClose).not.toHaveBeenCalled();
  });
});
