import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from '../pages/mainPage';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('LocalStorage test', () => {
  const queryClientTest = new QueryClient();

  test('Get localStorage (if ls haves data)', async () => {
    // имитация URL-адреса для теста (для useSearchParams())
    window.history.pushState({}, 'Test page', '/class-comp/');

    // поместить в ЛС данные, которые будем читать
    localStorage.setItem('searchStr', 'padme');

    // рендер. Для MainPage нужно два контекста. QueryClientProvider -
    // без него useQuery() в MainPage упадет с ошибкой. BrowserRouter -
    // без него useSearchParams() в MainPage упадет с ошибкой.
    render(
      <QueryClientProvider client={queryClientTest}>
        <BrowserRouter basename="/class-comp/">
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // waitFor нужен для "ожидания" данных
    await waitFor(() => {
      // ищем на странице инпут, у которого есть роль textbox -
      // стандартная роль для инпутов. .toHaveValue('padme') проверяет
      // что в инпуте подставлены наши данные из ЛС
      expect(screen.getByRole('textbox')).toHaveValue('padme');
    });
  });

  test('Get localStorage (if ls haves not data)', async () => {
    window.history.pushState({}, 'Test page', '/class-comp/');
    localStorage.clear();

    render(
      <QueryClientProvider client={queryClientTest}>
        <BrowserRouter basename="/class-comp/">
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  test('Save localStorage test', async () => {
    window.history.pushState({}, 'Test page', '/class-comp/');

    render(
      <QueryClientProvider client={queryClientTest}>
        <BrowserRouter basename="/class-comp/">
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'vader');
    await userEvent.click(buttonSearch);

    expect(input).toHaveValue('vader');
  });
});
