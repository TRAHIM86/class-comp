import React from 'react';
import { search_form, search_sec } from '../../styles/styles';
import { Btn } from '../../ui/btn';
import { InputSearch } from '../../ui/inputSearch';
import type { SearchProps } from '../../types';

/*
export class Search extends React.Component<SearchProps> {
  render() {
    const { value, onChangeFunc, onClickFunc, disabled, btnText } = this.props;

    return (
      <section className={search_sec} data-testid="search-section">
        <form
          className={search_form}
          onSubmit={(e) => e.preventDefault()}
          data-testid="form"
        >
          <InputSearch value={value} onChangeFunc={onChangeFunc} />
          <Btn
            btnText={btnText}
            disabled={disabled}
            onClickFunc={() => onClickFunc(value)}
          >
            SEARCH
          </Btn>
        </form>
      </section>
    );
  }
}
*/

export const Search = ({
  btnText,
  value,
  onChangeFunc,
  onClickFunc,
  disabled,
}: SearchProps) => {
  return (
    <section className={search_sec} data-testid="search-section">
      <form
        className={search_form}
        onSubmit={(e) => e.preventDefault()}
        data-testid="form"
      >
        <InputSearch value={value} onChangeFunc={onChangeFunc} />
        <Btn
          btnText={btnText}
          disabled={disabled}
          onClickFunc={() => onClickFunc(value)}
        />
      </form>
    </section>
  );
};
