import { render, screen } from '@testing-library/react';
import { TableResult } from '../components/result-bottom/tableresult';
import { heroesResponse } from './test-utils/dataForTests';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

describe('TableResult test', () => {
  const queryClient = new QueryClient();

  test('Length of heroes', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TableResult heroes={heroesResponse} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const quantityHeroes = screen.getAllByTestId('hero-item');
    expect(quantityHeroes).toHaveLength(2);
  });

  test('Names  of heroes', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TableResult heroes={heroesResponse} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const quantityHeroes = screen.getAllByTestId('hero-item');
    expect(quantityHeroes[0]).toHaveTextContent('r2-d2');
    expect(quantityHeroes[1]).toHaveTextContent('Padme Amidala');
  });

  test('All description of hero', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TableResult heroes={heroesResponse} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const quantityHeroes = screen.getAllByTestId('hero-item');
    expect(quantityHeroes[0]).toHaveTextContent('r2-d2');
    expect(quantityHeroes[1]).toHaveTextContent('Padme');
  });
});
