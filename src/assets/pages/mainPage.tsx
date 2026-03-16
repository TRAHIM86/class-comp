import React from 'react';
import { container1280 } from '../../styles/styles';
import { ErrorBlock } from '../components/error/errorBlock';
import { Result } from '../components/result-bottom/results';
import { Search } from '../components/search-top/search';
import Requests from '../../requests';
import type { hero } from '../../types';

export class MainPage extends React.Component {
  state = {
    inputValue: localStorage.getItem('searchStr') || '',
    prevInputValue: '',
    people: [] as hero[],
  };

  getAllPeople = async (value: string | null) => {
    console.log('val :', this.state.inputValue);
    console.log('prev :', this.state.prevInputValue);

    if (this.state.inputValue === this.state.prevInputValue) {
      console.log('Value = prevValue');
      return;
    } else {
      this.setState({ prevInputValue: value });
      const allPeople = await Requests.getAllPeople(value);
      this.setState({ people: allPeople });
    }

    const allPeople = await Requests.getAllPeople(value);
    return allPeople;
  };

  componentDidMount() {
    const loadData = async () => {
      const heroes = await Requests.getAllPeople(this.state.inputValue);
      console.log('heroes: ', heroes);
      this.setState({ people: heroes });
      console.log('val :', this.state.inputValue);
      console.log('prev :', this.state.prevInputValue);
      this.setState({ prevInputValue: this.state.inputValue });
    };

    loadData();
    //console.log(this.state.people);
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
