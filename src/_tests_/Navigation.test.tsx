// render - рендерит компонент в фейковый DOM, screen — ищет в нём элементы.
import { render, screen } from '@testing-library/react';

// спец роутер для тестов. Нужен т.к. внутри навигации
// есть NavLink, а он срабатвает только внутри роутера
import { MemoryRouter } from 'react-router-dom';

// userEvent — имитация клика пользователя.
import userEvent from '@testing-library/user-event';

import { ThemeContext } from '../store/ThemeContext';
import { Navigation } from '../components/navigation/navigation';

describe('Navigation tests', () => {
  test('Render links HOME and ABOUT', () => {
    const toggleTheme = vi.fn();

    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
          <Navigation />
        </ThemeContext.Provider>
      </MemoryRouter>
    );

    // чекаем что есть обе ссылки
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();

    // чекаем кнопку на темы
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('If theme is DARK - button is showing LIGTH', () => {
    const toggleTheme = vi.fn();

    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
          <Navigation />
        </ThemeContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('button')).toHaveTextContent('ligth');
  });

  test('If theme is LIGTH - button is showing DARK', () => {
    const toggleTheme = vi.fn();

    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme: 'ligth', toggleTheme }}>
          <Navigation />
        </ThemeContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('button')).toHaveTextContent('dark');
  });

  test('Click on buttonTheme call toggleTheme', async () => {
    const toggleTheme = vi.fn();

    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
          <Navigation />
        </ThemeContext.Provider>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
