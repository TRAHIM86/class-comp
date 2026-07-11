import { useContext, useState } from 'react';
import { ThemeContext } from '../../store/ThemeContext';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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

export const ContainerMain = () => {
  const { theme } = useContext(ThemeContext);

  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchStr = searchParams.get('search') || '';

  // state search для поиска
  const [searchValue, setSearchValue] = useLocalStorage('searchStr', '');

  // state search для инпута {countAll: 0, peopleArr: [],}
  const [inputValue, setInputValue] = useState(searchValue);

  // текущая страница
  const currentPage = Number(params.pageId) || 1;

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

  // выбрать текущую страницу
  function changePage(num: number): number {
    navigate(`/${num}?search=${searchStr}`);
    return num;
  }

  const countPages = people ? Math.ceil(people.countAll / 10) : 0;

  if (params.pageId && isNaN(Number(params.pageId))) {
    navigate('/1');
  }

  function updateSearchAndPage(value: string) {
    if (searchValue.trim() === inputValue.trim()) {
      console.log('Please enter new data for search');
      return;
    }

    setSearchValue(value);
    navigate(`/1?search=${value}`);
  }

  function changeInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
  }

  return (
    <div
      data-testid="container"
      className={`${container1280} ${theme === 'light' ? container1280_ligth : ''}`}
    >
      <Search
        btnText="SEARCH"
        value={inputValue}
        onChangeFunc={changeInputValue}
        onClickFunc={updateSearchAndPage}
        disabled={isLoading}
      />

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
          <Pagination
            countPages={countPages}
            currentPage={currentPage}
            fyncChangePage={changePage}
          />
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
