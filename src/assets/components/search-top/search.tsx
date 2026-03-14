import React from 'react';
import { search_form, search_sec } from '../../../styles/styles';
import { Btn } from '../../ui/btn';
import { InputSearch } from '../../ui/inputSearch';

export class Search extends React.Component {
  render() {
    return (
      <section className={search_sec}>
        <form className={search_form}>
          <InputSearch />
          <Btn>SEARCH</Btn>
        </form>
      </section>
    );
  }
}
