import React from 'react';
import { search_form, search_sec } from '../../../styles/styles';
import { Btn } from '../../ui/btn';
import { InputSearch } from '../../ui/inputSearch';
import Requests from '../../../requests';

async function getAllPeople() {
  const allPeople = await Requests.getAllPeople();
  console.log('allPeople :', allPeople[0]);
}

export class Search extends React.Component {
  state = {
    inputValue: '',
  };

  componentDidMount() {
    const searchStr: string | null = localStorage.getItem('searchStr');
    this.setState({ inputValue: searchStr ?? '' }, () => {
      getAllPeople();
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
      <section className={search_sec}>
        <form className={search_form} onSubmit={(e) => e.preventDefault()}>
          <InputSearch
            value={this.state.inputValue}
            onChangeFunc={this.changeInputValue}
          />
          <Btn onClickFunc={getAllPeople}>SEARCH</Btn>
        </form>
      </section>
    );
  }
}
