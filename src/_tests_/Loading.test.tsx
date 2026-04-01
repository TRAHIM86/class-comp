import { render, screen } from '@testing-library/react';
import { Loading } from '../components/loading/loading';
import { dotLoadActive } from '../styles/styles';
import { act } from 'react';

describe('Loading test', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('Change active dot after 100ms', async () => {
    render(<Loading quantity={3} />);

    const dots = screen.getAllByTestId('dot');
    expect(dots[0]).toHaveClass(dotLoadActive);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(dots[1]).toHaveClass(dotLoadActive);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(dots[2]).toHaveClass(dotLoadActive);
  });
});
