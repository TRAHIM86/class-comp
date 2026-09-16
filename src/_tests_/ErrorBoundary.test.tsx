import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/error/errorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary test', () => {
  test('call getDerivedStateFromError when error', () => {
    const spyConsoleErr = vi.spyOn(console, 'error');
    spyConsoleErr.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/sorry/i)).toBeInTheDocument();

    spyConsoleErr.mockRestore();
  });
});
