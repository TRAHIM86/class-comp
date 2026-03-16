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
    this.setState({ loading: true });

    const valueTrim = value?.trim() || '';

    this.setState({ inputValue: valueTrim });
    this.setState({ prevInputValue: valueTrim });

    if (this.state.inputValue.trim() === this.state.prevInputValue.trim()) {
      console.log('Prev === valueInput! Please enter data.');
      return;
    } else {
      localStorage.setItem('searchStr', valueTrim);

      const allPeople = await Requests.getAllPeople(valueTrim);
      this.setState({ people: allPeople });
      this.setState({ loading: false });

      return allPeople;
    }
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
      <>
        {this.state.loading ? <Loading quantity={5} /> : ''}
        <div className={container1280}>
          <header />
          <Search
            value={this.state.inputValue}
            onChangeFunc={this.changeInputValue}
            onClickFunc={this.fetchAllPeople}
          />
          <Result heroes={this.state.people} />

          <ErrorBlock />

          <footer />
        </div>
      </>
    );
  }
}
