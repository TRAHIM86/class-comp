import { screen } from '@testing-library/react';
import { renderSearch } from './test-utils/renderSearch';
import userEvent from '@testing-library/user-event';
import { useStore } from '../store/store';

describe('Search test', () => {
  test('Search render', () => {
    renderSearch();

    expect(screen.getByTestId('search-section')).toBeInTheDocument();
  });

  test('Input value change', async () => {
    renderSearch();

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    await userEvent.type(input, 'r2');

    // после ввода 'r2' в сторе должно быть 'r2'
    expect(useStore.getState().inputValue).toBe('r2');
  });

  test('BtnSearch click with value', async () => {
    const { mockOnClick } = renderSearch();

    // кладем в стор 'dart' (как будто ввели)
    useStore.getState().setInputValue('dart');

    const searchBtn = screen.getByRole('button', { name: /SEARCH/i });
    expect(searchBtn).toBeInTheDocument();

    await userEvent.click(searchBtn);
    expect(mockOnClick).toHaveBeenLastCalledWith('dart');
  });

  test('Test props SearchBtn', () => {
    renderSearch();

    const btnSearch = screen.getByRole('button', { name: /SEARCH/i });

    expect(btnSearch).toHaveTextContent('SEARCH');
    expect(btnSearch).not.toBeDisabled();
  });
});
