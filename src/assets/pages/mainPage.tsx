import React from 'react';
import { container1280, errorBlock } from '../../styles/styles';
import { ErrorBtn } from '../components/error/errorBlock';
import { Result } from '../components/result-bottom/results';
import { Search } from '../components/search-top/search';
import Requests from '../../requests';
import type { hero, StateError } from '../../types';
import { Loading } from '../components/loading/loading';
import { ErrorBoundary } from '../components/error/errorBoundary';

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
        isError: true,
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
        loading: false,
        people: [],
      });

      // сюда никогда не дойдет, т.к. имитиация вернет ТОЛЬКО ошибку
    } else {
      this.setState({
        people: error4xx.data,
        error: null,
        loading: false,
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
      <div className={container1280}>
        <Search
          value={this.state.inputValue}
          onChangeFunc={this.changeInputValue}
          onClickFunc={this.fetchAllPeople}
        />

        {this.state.loading ? (
          <Loading quantity={8} />
        ) : (
          <ErrorBoundary>
            <Result stateError={this.state.error} heroes={this.state.people} />
          </ErrorBoundary>
        )}

        <div className={errorBlock}>
          {' '}
          <ErrorBtn onClickErrorFunc={this.imitateErrorRender} />
          <ErrorBtn onClickErrorFunc={this.fetchError4xx} />
        </div>
      </div>
    );
  }
}
