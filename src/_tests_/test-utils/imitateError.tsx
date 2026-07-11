import { render, screen } from '@testing-library/react';
import { MainPage } from '../../pages/mainPage';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

export async function imitateError(btnName: string, getText: string) {
  const queryClientTest = new QueryClient();

  // имитация URL-адреса для теста (для useSearchParams())
  window.history.pushState({}, 'Test page', '/class-comp/');

  render(
    <QueryClientProvider client={queryClientTest}>
      <BrowserRouter basename="/class-comp/">
        <MainPage />
      </BrowserRouter>
    </QueryClientProvider>
  );

  const errBtn = screen.getByRole('button', { name: new RegExp(btnName, 'i') });

  await userEvent.click(errBtn);
  await new Promise((resolve) => setTimeout(resolve, 2500));

  expect(screen.getByText(new RegExp(getText, 'i'))).toBeInTheDocument();
}
