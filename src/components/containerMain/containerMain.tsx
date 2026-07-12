import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../store/ThemeContext';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { useQuery } from '@tanstack/react-query';
import { container1280, container1280_ligth } from '../../styles/styles';
import { Search } from '../search-top/search';
import { Loading } from '../loading/loading';
import { ErrorResponse } from '../error/errorResponse';
import { ErrorBoundary } from '../error/errorBoundary';
import { Result } from '../result-bottom/results';
import { Pagination } from '../pagination/pagination';
import { ErrorBlock } from '../error/errorBtnBlock';
import Requests from '../../requests';
import { useStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

export const ContainerMain = () => {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  // state search для поиска
  const [searchValue, setSearchValue] = useLocalStorage('searchStr', '');

  // store для инпута
  const inputValue = useStore((state) => state.inputValue);

  // store для текущей страница
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  useEffect(() => {
    // при первой загрузке, даже если в url есть search=da,
    // перебросить на значение из локалстордж (условие таска)
    navigate(`/${currentPage}?search=${searchValue}`);
  }, []);

  // специальные состояния для имитации ошибок (рендер + 2 запроса)
  const [renderError, setRenderError] = useState([1]);
  const [errorRequest, setErrorRequest] = useState<{
    isError: boolean;
    status: string;
  } | null>(null);

  const {
    data: people,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['people', searchValue, currentPage],
    queryFn: () => Requests.getAllPeople(searchValue, currentPage),
    staleTime: Number(import.meta.env.VITE_CACHE_TTL),
  });

  // количество страниц для пагинации
  const countPages = people ? Math.ceil(people.countAll / 10) : 0;

  // функция обновить поиск и страницу
  function updateSearchAndPage(value: string) {
    if (searchValue.trim() === inputValue.trim()) {
      console.log('Please enter new data for search');
      return;
    }

    setSearchValue(value);
    setCurrentPage(1);
  }

  return (
    <div
      data-testid="container"
      className={`${container1280} ${theme === 'light' ? container1280_ligth : ''}`}
    >
      <Search onClickFunc={updateSearchAndPage} disabled={isLoading} />

      {isLoading || !people ? (
        <Loading quantity={8} data-testid="loading" />
      ) : people?.peopleArr.length === 0 ? (
        <ErrorResponse />
      ) : (
        <ErrorBoundary>
          <Result
            heroes={people}
            error={error}
            renderError={renderError}
            errorRequest={errorRequest}
            data-testid="result"
          />
          <Pagination countPages={countPages} />
        </ErrorBoundary>
      )}

      <ErrorBlock
        isLoading={isLoading}
        setRenderError={setRenderError}
        setErrorRequest={setErrorRequest}
      />
    </div>
  );
};
