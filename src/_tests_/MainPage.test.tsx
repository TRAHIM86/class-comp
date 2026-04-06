import { render, screen } from '@testing-library/react';
import { MainPage } from '../pages/mainPage';
import userEvent from '@testing-library/user-event';
import { container1280 } from '../styles/styles';

vi.mock('../requests', () => {
  return {
    default: {
      getAllPeople: vi.fn(),
      imitation4xx: vi.fn().mockResolvedValue({ isError: true, status: 404 }),
      imitationErrNetwork: vi
        .fn()
        .mockResolvedValue(new Error('Network error')),
    },
  };
});

describe('MainPage test render', () => {
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

describe('FetchAllPeople test', async () => {
  test('fetchAllPeople sets loading true', async () => {
    render(<MainPage />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'darth');
    await userEvent.click(button);

    await screen.findByTestId('result');

    expect(screen.queryAllByTestId('loading'));
  });

  test('Prev === valueInput! Please enter data', async () => {
    render(<MainPage />);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'darth');
    await userEvent.click(button);

    await screen.findByTestId('result');

    await userEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Prev === valueInput! Please enter data.'
    );

    await userEvent.type(input, 'darth');

    await userEvent.clear(input);
    await userEvent.click(button);

    consoleSpy.mockRestore();
  });
});

describe('Imitate error render test', () => {
  test('Imitate error render', async () => {
    render(<MainPage />);

    const errBtn = screen.getByRole('button', { name: /render error/i });

    await userEvent.click(errBtn);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    expect(screen.getByText(/sorry/i)).toBeInTheDocument();
  });
});

describe('Imitate error 404 test', () => {
  test('Imiteate error 404 test', async () => {
    render(<MainPage />);

    const errBtn = screen.getByRole('button', { name: /404 error/i });

    await userEvent.click(errBtn);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    expect(screen.getByText(/Error. Status: 404/)).toBeInTheDocument();
  });
});

describe('Imitate error network', () => {
  test('Imitate error network test', async () => {
    render(<MainPage />);

    const errBtn = screen.getByRole('button', { name: /network error/i });

    await userEvent.click(errBtn);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    expect(screen.getByText(/Error. Status/i)).toBeInTheDocument();
  });
});
