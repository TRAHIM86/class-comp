import { render } from '@testing-library/react';
import { Search } from '../../components/search-top/search';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from '../../store/store';

export function renderSearch() {
  // обязательно сбросить стор
  useStore.setState({
    inputValue: '',
    currentPage: 1,
    selectedHeroes: [],
  });

  const mockOnClick = vi.fn();

  render(
    <MemoryRouter>
      <Search onClickFunc={mockOnClick} disabled={false} />
    </MemoryRouter>
  );

  return { mockOnClick };
}
