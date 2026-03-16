import React from 'react';
import { search_form, search_sec } from '../../../styles/styles';
import { Btn } from '../../ui/btn';
import { InputSearch } from '../../ui/inputSearch';
import type { SearchProps } from '../../../types';

export class Search extends React.Component<SearchProps> {
  render() {
    const { value, onChangeFunc, onClickFunc } = this.props;

    return (
      <section className={search_sec}>
        <form className={search_form} onSubmit={(e) => e.preventDefault()}>
          <InputSearch value={value} onChangeFunc={onChangeFunc} />
          <Btn onClickFunc={() => onClickFunc(value)}>SEARCH</Btn>
        </form>
      </section>
    );
  }
}
