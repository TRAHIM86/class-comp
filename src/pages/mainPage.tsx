import React, { useContext, useState } from 'react';
import {
  container1280,
  container1280_ligth,
  errorBlock,
} from '../styles/styles';
import { ErrorBtn } from '../components/error/errorBtn';
import { Result } from '../components/result-bottom/results';
import { Search } from '../components/search-top/search';
import Requests from '../requests';
import { Loading } from '../components/loading/loading';
import { ErrorBoundary } from '../components/error/errorBoundary';
import { useLocalStorage } from '../customHooks/useLocalStorage';
import { Pagination } from '../components/pagination/pagination';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ErrorResponse } from '../components/error/errorResponse';
import { ThemeContext } from '../store/ThemeContext';
import { useQuery } from '@tanstack/react-query';

/*
export class MainPage extends React.Component {
  state = {
    inputValue: localStorage.getItem('searchStr') || '',
    prevInputValue: '',
    people: [] as hero[],
    loading: true,
    error: { isError: false, errorStatus: '' } as StateError,
  };

  fetchAllPeople = async (value: string | null) => {
    const valueTrim = value?.trim() || '';

    this.setState({
      inputValue: valueTrim,
      prevInputValue: valueTrim,
    });

    if (
      this.state.inputValue.trim() === this.state.prevInputValue.trim() &&
      !this.state.error
    ) {
      console.log('Prev === valueInput! Please enter data.');
      return;
    } else {
      this.setState({ loading: true });
      localStorage.setItem('searchStr', valueTrim);

      const allPeople = await Requests.getAllPeople(valueTrim);
      this.setState({
        people: allPeople,
        loading: false,
        error: null,
      });

      return allPeople;
    }
  };

  imitateErrorRender = async () => {
    // Имитируем получение данных
    this.setState({ loading: true });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.setState({
      error: {
        isError: false,
        errorStatus: 'error render',
      },
      loading: false,
      people: '123', // специально для ошибки рендера, вызощет ErrorBoundary
    });
  };

  fetchError4xx = async () => {
    this.setState({ loading: true });
    const error4xx = await Requests.imitation4xx();

    if (error4xx.isError) {
      this.setState({
        error: {
          isError: true,
          errorStatus: error4xx.status,
        },
        people: [],
      });

      // сюда никогда не дойдет, т.к. имитиация вернет ТОЛЬКО ошибку
    } else {
      this.setState({
        people: error4xx.data,
        error: null,
      });
    }

    this.setState({ loading: false });
  };

  fetchErrorNetwork = async () => {
    this.setState({ loading: true });
    const errorNetwork = await Requests.imitationErrNetwork();

    // в запросе мы получим реальный Error через catch
    if (errorNetwork instanceof Error) {
      this.setState({
        error: {
          isError: true,
          errorStatus: 'Unknown error',
        },
        people: [],
      });

      // сюда никогда не дойдет, т.к. имитиация вернет ТОЛЬКО ошибку
    } else {
      this.setState({
        people: errorNetwork.data,
        error: null,
      });
    }

    this.setState({ loading: false });
  };

  componentDidMount() {
    const loadData = async () => {
      const heroes = await Requests.getAllPeople(this.state.inputValue);

      this.setState({ people: heroes });

      this.setState({ prevInputValue: this.state.inputValue });
      this.setState({ loading: false });
    };

    loadData();
  }

  changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ inputValue: value });
  };

  render() {
    return (
      <div data-testid="container" className={container1280}>
        <Search
          btnText="SEARCH"
          value={this.state.inputValue}
          onChangeFunc={this.changeInputValue}
          onClickFunc={this.fetchAllPeople}
          disabled={this.state.loading}
        />

        {this.state.loading ? (
          <Loading quantity={8} />
        ) : (
          <ErrorBoundary>
            <Result stateError={this.state.error} heroes={this.state.people} />
          </ErrorBoundary>
        )}

        <div data-testid="error-block" className={errorBlock}>
          {' '}
          <ErrorBtn
            btnText="render error"
            disabled={this.state.loading}
            onClickErrorFunc={this.imitateErrorRender}
          />
          <ErrorBtn
            btnText="404 error (!response.ok)"
            disabled={this.state.loading}
            onClickErrorFunc={this.fetchError4xx}
          />
          <ErrorBtn
            btnText="network error (catch)"
            disabled={this.state.loading}
            onClickErrorFunc={this.fetchErrorNetwork}
          />
        </div>
      </div>
    );
  }
}
*/

export const MainPage = () => {
  const { theme } = useContext(ThemeContext);

  const params = useParams();
  const [searchParams] = useSearchParams();
  const searchStr = searchParams.get('search') || '';

  const navigate = useNavigate();

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

  // блок с имитацией ошибок
  async function imitateErrorRender() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('render error');

    // @ts-expect-error - имитация ошибки для ErrorBoundary
    setRenderError('123');
  }

  async function fetchError4xx() {
    console.log('imitation4xx');
    const error4xx = await Requests.imitation4xx();

    if (error4xx) {
      console.log('error4xx :', error4xx);
      setErrorRequest(error4xx);
    }
  }

  async function fetchErrorNetwork() {
    const errorNetwork = await Requests.imitationErrNetwork();

    setErrorRequest({ isError: true, status: 'Unknown error' });

    return errorNetwork;
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

      <div data-testid="error-block" className={errorBlock}>
        <ErrorBtn
          btnText="render error"
          disabled={isLoading}
          onClickErrorFunc={imitateErrorRender}
        />
        <ErrorBtn
          btnText="404 error (!response.ok)"
          disabled={isLoading}
          onClickErrorFunc={fetchError4xx}
        />
        <ErrorBtn
          btnText="network error (catch)"
          disabled={isLoading}
          onClickErrorFunc={fetchErrorNetwork}
        />
      </div>
    </div>
  );
};
