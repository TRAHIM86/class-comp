import React from 'react';
import { search_form, search_sec } from '../../../styles/styles';
import { Btn } from '../../ui/btn';
import { InputSearch } from '../../ui/inputSearch';

export class Search extends React.Component {
  state = {
    inputValue: '',
  };

  componentDidMount() {
    const searchStr: string | null = localStorage.getItem('searchStr');
    console.log(searchStr);
    this.setState({ inputValue: searchStr });
  }

  changeInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ inputValue: value });

    if (typeof value === 'string') {
      localStorage.setItem('searchStr', value);
    }
  }

  render() {
    return (
      <section className={search_sec}>
        <form className={search_form}>
          <InputSearch
            value={this.state.inputValue}
            onChangeFunc={this.changeInputValue}
          />
          <Btn>SEARCH</Btn>
        </form>
      </section>
    );
  }
}
