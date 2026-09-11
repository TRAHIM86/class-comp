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

  test('BtnSearch click with value', async () => {
    const SearchComponent = renderSearch();

    const searchBtn = screen.getByRole('button');
    expect(searchBtn).toBeInTheDocument();

    await userEvent.click(searchBtn);
    expect(SearchComponent.mockOnClick).toHaveBeenCalledTimes(1);
    expect(SearchComponent.mockOnClick).toHaveBeenLastCalledWith(
      SearchComponent.value,
      1
    );
  });

  test('Test props SearchBtn', () => {
    renderSearch();

    const btnSearch = screen.getByRole('button', { name: /SEARCH/i });

    expect(btnSearch).toHaveTextContent('SEARCH');
    expect(btnSearch).not.toBeDisabled();
  });
});
