import { useEffect, useState } from 'react';
import { container1280 } from '../../styles/styles';
import { Search } from '../search-top/search';
import { Loading } from '../loading/loading';
import { ErrorResponse } from '../error/errorResponse';
import { ErrorBoundary } from '../error/errorBoundary';
import { Result } from '../result-bottom/results';
import { Pagination } from '../pagination/pagination';
import { ErrorBlock } from '../error/errorBtnBlock';
import { useNavigate } from 'react-router-dom';
import { usePeople } from '../../customHooks/usePeople';
import { usePeopleSearch } from '../../customHooks/usePeopleSearch';

export const ContainerMain = () => {
  const navigate = useNavigate();

  const { searchValue, currentPage, handleSearch } = usePeopleSearch();

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

  // состояния из кастомного хука для основного рендера
  const { people, isLoading, error, countPages } = usePeople(
    searchValue,
    currentPage
  );

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
