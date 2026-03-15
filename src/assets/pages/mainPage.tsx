import React from 'react';
import { container1280 } from '../../styles/styles';
import { ErrorBlock } from '../components/error/errorBlock';
import { Result } from '../components/result-bottom/results';
import { Search } from '../components/search-top/search';
import Requests from '../../requests';
import type { hero } from '../../types';

export class MainPage extends React.Component {
  state = {
    inputValue: '',
    people: [] as hero[],
  };

  getAllPeople = async () => {
    const allPeople = await Requests.getAllPeople();
    console.log('Click');
    return allPeople;
  };

  componentDidMount() {
    const searchStr: string | null = localStorage.getItem('searchStr');
    this.setState({ inputValue: searchStr ?? '' }, async () => {
      const heroes = await this.getAllPeople();
      this.setState({ people: heroes });
      console.log(this.state.people);
    });
  }

  changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ inputValue: value });

    if (typeof value === 'string') {
      localStorage.setItem('searchStr', value);
    }
  };

  render() {
    return (
      <>
        <div className={container1280}>
          <header />
          <Search
            value={this.state.inputValue}
            onChangeFunc={this.changeInputValue}
            onClickFunc={this.getAllPeople}
          />
          <Result heroes={this.state.people} />

          <ErrorBlock />

          <footer />
        </div>
      </>
    );
  }
}
