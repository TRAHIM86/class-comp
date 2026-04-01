import { screen } from '@testing-library/react';
import { renderSearch } from './test-utils/renderSearch';
import userEvent from '@testing-library/user-event';

describe('Search test', () => {
  test('Search render', () => {
    renderSearch();

    expect(screen.getByTestId('search-section')).toBeInTheDocument();
  });

  test('Input value change', async () => {
    const SearchComponent = renderSearch();

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    await userEvent.type(input, 'r2');
    expect(SearchComponent.mockOnChange).toHaveBeenCalledTimes(2);
  });
});
