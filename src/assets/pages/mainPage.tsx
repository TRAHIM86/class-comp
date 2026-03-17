import React from 'react';
import { container1280, errorBlock } from '../../styles/styles';
import { ErrorBtn } from '../components/error/errorBlock';
import { Result } from '../components/result-bottom/results';
import { Search } from '../components/search-top/search';
import Requests from '../../requests';
import type { hero } from '../../types';
import { Loading } from '../components/loading/loading';

export class MainPage extends React.Component {
  state = {
    inputValue: localStorage.getItem('searchStr') || '',
    prevInputValue: '',
    people: [] as hero[],
    loading: true,
    error: null,
    statusError: '',
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

  fetchError4xx = async () => {
    this.setState({ loading: true });
    const error4xx = await Requests.imitation4xx();
    if (error4xx.isError) {
      this.setState({
        error: error4xx,
        statusError: error4xx.status,
        people: [],
        loading: false,
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

  fetchError5xx = async () => {
    const error5xx = await Requests.imitation5xx();
    console.log(error5xx);
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
        ) : this.state.error ? (
          <div>
            Sorry, an error occurred. Error status: {this.state.statusError}.
            <br />
            Please try sending your request again.
          </div>
        ) : (
          <Result heroes={this.state.people} />
        )}

        <div className={errorBlock}>
          {' '}
          <ErrorBtn onClickErrorFunc={this.fetchError4xx} />
          <ErrorBtn onClickErrorFunc={this.fetchError5xx} />
        </div>
      </div>
    );
  }
}
