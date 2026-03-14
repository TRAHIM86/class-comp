import { BtnSearch } from './btnSearch';
import { InputSearch } from './inputSearch';

export const Search = () => {
  return (
    <section className="border-2 border-green-500 border-solid h-1/4 w-full">
      <form className="flex items-center justify-center gap-1 w-full h-full">
        <InputSearch />
        <BtnSearch>SEARCH</BtnSearch>
      </form>
    </section>
  );
};
