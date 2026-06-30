import { render, screen } from '@testing-library/react';
import { ErrorBtn } from '../components/error/errorBtn';
import userEvent from '@testing-library/user-event';

describe('ErrorBtn test', () => {
  const mockClickBtnErr = vi.fn();

  test('Disabled is active, when disables = false', () => {
    render(
      <ErrorBtn
        btnText="test-btn"
        disabled={false}
        onClickErrorFunc={mockClickBtnErr}
      />
    );

    const btnErr = screen.getByRole('button', { name: 'test-btn' });

    expect(btnErr).not.toBeDisabled();
  });

  test('OnClickErrorFunc is calling', async () => {
    render(
      <ErrorBtn
        btnText="test-btn"
        disabled={false}
        onClickErrorFunc={mockClickBtnErr}
      />
    );

    const btnErr = screen.getByRole('button', { name: 'test-btn' });

    await userEvent.click(btnErr);

    expect(mockClickBtnErr).toHaveBeenCalledTimes(1);
  });
});
