import { search_form, search_sec } from '../../../styles/styles';
import { Btn } from '../../ui/btn';
import { InputSearch } from './inputSearch';

export const Search = () => {
  return (
    <section className={search_sec}>
      <form className={search_form}>
        <InputSearch />
        <Btn>SEARCH</Btn>
      </form>
    </section>
  );
};
