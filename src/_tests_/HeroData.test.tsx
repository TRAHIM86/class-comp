import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HeroData } from '../components/heroData/heroData';
import { MainPage } from '../pages/mainPage';
import Requests from '../requests';
import { vi } from 'vitest';
import { heroes } from './test-utils/dataForTests';
import userEvent from '@testing-library/user-event';

vi.mock('../requests', () => ({
  default: {
    getHeroData: vi.fn(),
  },
}));

describe('HeroData test', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('if !HeroData', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path="/:pageId" element={<MainPage />}>
              <Route path=":heroId" element={<HeroData />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(Requests.getHeroData).not.toHaveBeenCalled();
  });

  test('if HeroData', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/2']}>
          <Routes>
            <Route path="/:heroId" element={<HeroData />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(Requests.getHeroData).toHaveBeenCalledWith('2');
  });

  test('if !heroId', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <HeroData />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(Requests.getHeroData).not.toHaveBeenCalled();
  });

  /*************** ТЕСТ КЭША *****************/
  test('кэширует данные при повторном запросе', async () => {
    const mockHeroData = heroes[0];

    vi.mocked(Requests.getHeroData).mockResolvedValue(mockHeroData);

    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path="/:heroId" element={<HeroData />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Ждем загрузки данных
    await waitFor(() => {
      expect(screen.getByText(/r2-d2/i)).toBeInTheDocument();
    });

    // Проверяем - первый запрос был
    expect(Requests.getHeroData).toHaveBeenCalledTimes(1);

    // Перерендериваем с ТЕМ ЖЕ heroId (1) и ТЕМ ЖЕ клиентом
    rerender(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path="/:heroId" element={<HeroData />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Ждем, что данные все еще на месте
    await waitFor(() => {
      expect(screen.getByText(/r2-d2/i)).toBeInTheDocument();
    });

    // ПРОВЕРКА КЭША: запрос НЕ вызвался второй раз
    expect(Requests.getHeroData).toHaveBeenCalledTimes(1);
  });

  test('after click "Update" call refetch', async () => {
    const mockHeroData = heroes[0];
    vi.mocked(Requests.getHeroData).mockResolvedValue(mockHeroData);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path="/:heroId" element={<HeroData />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/r2-d2/i)).toBeInTheDocument();
    });

    // находим баттон 'Update' и кликаем его для refetch
    const updateButton = screen.getByText('Update');
    await userEvent.click(updateButton);

    await waitFor(() => {
      expect(Requests.getHeroData).toHaveBeenCalledTimes(2);
    });
  });

  test('error request', async () => {
    const testQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // отключаем повторные попытки
          retry: false,
        },
      },
    });

    // 1. Мокаем ошибку
    vi.mocked(Requests.getHeroData).mockRejectedValue(
      new Error('Network Error')
    );

    render(
      <QueryClientProvider client={testQueryClient}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path="/:heroId" element={<HeroData />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Sorry some error/i)).toBeInTheDocument();
    });
  });
});
