import { useStore } from '../store/store';
import { useLocalStorage } from './useLocalStorage';

export const usePeopleSearch = () => {
  // state search для поиска
  const [searchValue, setSearchValue] = useLocalStorage('searchStr', '');

  // store для инпута
  const inputValue = useStore((state) => state.inputValue);

  // store для текущая страница
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  // функция обновить поиск и страницу
  function handleSearch(value: string) {
    if (searchValue.trim() === inputValue.trim()) {
      console.log('Please enter new data for search');
      return;
    }

    setSearchValue(value);
    setCurrentPage(1);
  }

  return {
    searchValue,
    currentPage,
    handleSearch,
  };
};
