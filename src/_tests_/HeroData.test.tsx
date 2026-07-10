import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HeroData } from '../components/heroData/heroData';
import { MainPage } from '../pages/mainPage';
import Requests from '../requests';
import { vi } from 'vitest';

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
});
