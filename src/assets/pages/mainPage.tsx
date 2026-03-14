import { container1280 } from '../../styles/styles';
import { ErrorBlock } from '../components/error/errorBlock';
import { Result } from '../components/result-bottom/results';
import { Search } from '../components/search-top/search';

export const MainPage = () => {
  return (
    <>
      <div className={container1280}>
        <header />
        <Search />
        <Result />
        <ErrorBlock />
        <footer />
      </div>
    </>
  );
};
