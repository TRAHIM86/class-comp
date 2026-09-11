import { render } from '@testing-library/react';
import { Search } from '../../components/search-top/search';

export function renderSearch() {
  const mockOnChange = vi.fn();
  const mockOnClick = vi.fn();
  const value = 'dart';

  render(<Search onClickFunc={mockOnClick} disabled={false} />);

  return { mockOnChange, mockOnClick, value };
}
