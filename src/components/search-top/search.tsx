import { search_form, search_sec } from '../../styles/styles';
import { Btn } from '../../ui/btn';
import { InputSearch } from '../../ui/inputSearch';
import type { SearchProps } from '../../types';
import { useStore } from '../../store/store';

export const Search = ({ onClickFunc, disabled }: SearchProps) => {
  const inputValue = useStore((state) => state.inputValue);
  const setInputValue = useStore((state) => state.setInputValue);

  function changeInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
  }

  return (
    <section className={search_sec} data-testid="search-section">
      <form
        className={search_form}
        onSubmit={(e) => e.preventDefault()}
        data-testid="form"
      >
        <InputSearch value={inputValue} onChangeFunc={changeInputValue} />
        <Btn
          btnText={'SEARCH'}
          disabled={disabled}
          onClickFunc={() => onClickFunc(inputValue, 1)}
        />
      </form>
    </section>
  );
};
