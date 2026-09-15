import { render, screen } from '@testing-library/react';
import { TableResult } from '../components/result-bottom/tableresult';
import { heroesResponse } from './test-utils/dataForTests';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useStore } from '../store/store';

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

  test('After click on hero URL are changing', async () => {
    //userEvent нужен чтобы клик был настоящим
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TableResult heroes={heroesResponse} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const firstHero = screen.getAllByTestId('hero-item')[0];
    await user.click(firstHero);

    expect(window.location.pathname).toContain('/1/');
  });

  test('Click on checkBox do not change URL', async () => {
    const user = userEvent.setup();

    // запомнить URL дло клика
    const firstUrl = window.location.pathname;

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TableResult heroes={heroesResponse} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const checkBoxes = screen.getAllByRole('checkbox');

    await user.click(checkBoxes[0]);

    expect(window.location.pathname).toBe(firstUrl);
  });

  test('Click on checkBox add hero to selected heroes', async () => {
    const user = userEvent.setup();

    // сбросить стор (очистить наш selectedHeroes)
    useStore.setState({ selectedHeroes: [] });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TableResult heroes={heroesResponse} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // клик по первому чекбоксу
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    expect(useStore.getState().selectedHeroes).toHaveLength(1);
  });

  test('Repetead click on checkBox add hero to selected heroes', async () => {
    const user = userEvent.setup();

    // сбросить стор (очистить наш selectedHeroes)
    useStore.setState({ selectedHeroes: [] });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TableResult heroes={heroesResponse} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // клик по первому чекбоксу
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    expect(useStore.getState().selectedHeroes).toHaveLength(1);

    // повторный клик по первому чекбоксу

    await user.click(checkboxes[0]);
    expect(useStore.getState().selectedHeroes).toHaveLength(0);
  });
});
