import { render, screen } from '@testing-library/react';
import { MainPage } from '../pages/mainPage';
import { container1280 } from '../styles/styles';

vi.mock('../requests', () => {
  return {
    default: {
      getAllPeople: vi.fn(),
    },
  };
});

describe('MainPage test', () => {
  test('MainPage render and having class 1280px', () => {
    render(<MainPage />);

    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('container')).toHaveClass(container1280);
    expect(screen.getByTestId('error-block')).toBeInTheDocument();
  });

  test('Loading state and its disappearance', async () => {
    render(<MainPage />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await screen.findByTestId('result');
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});
