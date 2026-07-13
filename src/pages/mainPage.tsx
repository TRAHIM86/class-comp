import { useEffect, useState } from 'react';
import { usePeopleSearch } from '../customHooks/usePeopleSearch';
import { usePeople } from '../customHooks/usePeople';
import { useNavigate } from 'react-router-dom';

import { Search } from '../components/search-top/search';
import { Loading } from '../components/loading/loading';
import { ErrorResponse } from '../components/error/errorResponse';
import { ErrorBoundary } from '../components/error/errorBoundary';
import { Pagination } from '../components/pagination/pagination';
import { Result } from '../components/result-bottom/results';
import { ErrorBlock } from '../components/error/errorBtnBlock';

import { container1280 } from '../styles/styles';

export const MainPage = () => {
  const navigate = useNavigate();

  // данные из кастомного хука для поиска
  const { searchValue, currentPage, handleSearch } = usePeopleSearch();

  // данные из кастомного хука для основного рендера
  const { people, isLoading, error, countPages } = usePeople(
    searchValue,
    currentPage
  );

  // специальные состояния для имитации ошибок (рендер + 2 запроса)
  const [renderError, setRenderError] = useState([1]);
  const [errorRequest, setErrorRequest] = useState<{
    isError: boolean;
    status: string;
  } | null>(null);

  useEffect(() => {
    // при первой загрузке, даже если в url есть search=da,
    // перебросить на значение из локалстордж (условие таска)
    navigate(`/${currentPage}?search=${searchValue}`);
  }, []);

  return (
    <div data-testid="container" className={container1280}>
      <Search onClickFunc={handleSearch} disabled={isLoading} />

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
