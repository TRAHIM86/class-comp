import { render, screen } from '@testing-library/react';
import { MainPage } from '../../pages/mainPage';
import userEvent from '@testing-library/user-event';

export async function imitateError(btnName: string, getText: string) {
  render(<MainPage />);

  const errBtn = screen.getByRole('button', { name: new RegExp(btnName, 'i') });

  await userEvent.click(errBtn);
  await new Promise((resolve) => setTimeout(resolve, 2500));

  expect(screen.getByText(new RegExp(getText, 'i'))).toBeInTheDocument();
}
