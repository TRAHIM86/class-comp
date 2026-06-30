import { render, screen } from '@testing-library/react';
import { MainPage } from '../pages/mainPage';
import userEvent from '@testing-library/user-event';
import { container1280 } from '../styles/styles';
import { imitateError } from './test-utils/imitateError';

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
    await imitateError('render error', 'sorry');
  });
});

describe('Imitate error 404 test', () => {
  test('Imitate error 404 test', async () => {
    await imitateError('404 error', 'Error. Status: 404');
  });
});

describe('Imitate error network', () => {
  test('Imitate error network test', async () => {
    await imitateError('network error', 'Error. Status');
  });
});
