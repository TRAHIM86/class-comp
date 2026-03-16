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

  fetchAllPeople = async (value: string | null) => {
    const valueTrim = value?.trim() || '';
    console.log(valueTrim?.length);

    console.log('val :', value);
    console.log('trim :', valueTrim);

    this.setState({ inputValue: valueTrim });
    this.setState({ prevInputValue: valueTrim });

    if (this.state.inputValue.trim() === this.state.prevInputValue.trim()) {
      //console.log('Value = prevValue');
      return;
    } else {
      const allPeople = await Requests.getAllPeople(valueTrim);
      this.setState({ people: allPeople });
      return allPeople;
    }
  };

  componentDidMount() {
    const loadData = async () => {
      const heroes = await Requests.getAllPeople(this.state.inputValue);
      //console.log('heroes: ', heroes);
      this.setState({ people: heroes });
      //console.log('val :', this.state.inputValue);
      //console.log('prev :', this.state.prevInputValue);
      this.setState({ prevInputValue: this.state.inputValue });
    };

    loadData();
    //console.log(this.state.people);
  }

  changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ inputValue: value });

    if (typeof value === 'string') {
      localStorage.setItem('searchStr', value.trim());
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
