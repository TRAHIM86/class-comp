import React from 'react';
import { container1280 } from '../../styles/styles';
import { ErrorBlock } from '../components/error/errorBlock';
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
  };

  fetchAllPeople = async (value: string | null) => {
    const valueTrim = value?.trim() || '';

    this.setState({ inputValue: valueTrim });
    this.setState({ prevInputValue: valueTrim });

    if (this.state.inputValue.trim() === this.state.prevInputValue.trim()) {
      console.log('Prev === valueInput! Please enter data.');
      return;
    } else {
      this.setState({ loading: true });
      localStorage.setItem('searchStr', valueTrim);

      const allPeople = await Requests.getAllPeople(valueTrim);
      this.setState({ people: allPeople });
      this.setState({ loading: false });

      return allPeople;
    }
  };

  fetchError4xx = async () => {
    const error4xx = await Requests.imitation4xx();
    console.log(error4xx);
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
        ) : (
          <Result heroes={this.state.people} />
        )}

        <div>
          {' '}
          <ErrorBlock onClickErrorFunc={this.fetchError4xx} />
          <ErrorBlock onClickErrorFunc={this.fetchError5xx} />
        </div>
      </div>
    );
  }
}
