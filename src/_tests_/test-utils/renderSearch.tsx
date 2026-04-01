import { render } from '@testing-library/react';
import { Search } from '../../components/search-top/search';

export function renderSearch() {
  const mockOnChange = vi.fn();
  const mockOnClick = vi.fn();

  render(
    <Search
      btnText="SEARCH"
      value=""
      onChangeFunc={mockOnChange}
      onClickFunc={mockOnClick}
      disabled={false}
    />
  );

  return { mockOnChange, mockOnClick };
}
