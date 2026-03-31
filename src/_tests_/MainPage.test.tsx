import { render, screen } from '@testing-library/react';
import { MainPage } from '../pages/mainPage';
import { container1280 } from '../styles/styles';

describe('MainPage test', () => {
  test('MainPage test 1280px', () => {
    render(<MainPage />);

    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('container')).toHaveClass(container1280);
  });
});
