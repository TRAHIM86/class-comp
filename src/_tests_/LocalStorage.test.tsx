import { render, screen } from '@testing-library/react';
import { MainPage } from '../pages/mainPage';
import userEvent from '@testing-library/user-event';

describe('LocalStorage test', () => {
  test('Get localStorage (if ls haves data)', () => {
    localStorage.setItem('searchStr', 'padme');

    render(<MainPage />);

    expect(screen.getByRole('textbox')).toHaveValue('padme');
  });

  test('Get localStorage (if ls haves not data)', () => {
    localStorage.clear();

    render(<MainPage />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('Save localStorage test', async () => {
    render(<MainPage />);

    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'vader');
    await userEvent.click(buttonSearch);

    expect(input).toHaveValue('vader');
  });
});
