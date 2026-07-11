import { activePage, paginationBlock } from '../../styles/styles';
import type { PaginationProps } from '../../types';
import { useStore } from '../../store/store';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Pagination = ({ countPages }: PaginationProps) => {
  // создать из countHeroes массив индексов, например [0,1,2,3,4,5]
  const arrRange = Array.from({ length: countPages }, (_, ind) => ind + 1);

  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchStr = searchParams.get('search') || '';

  // выбрать текущую страницу
  function changePage(num: number): number {
    setCurrentPage(num);
    navigate(`/${num}?search=${searchStr}`);
    return num;
  }

  return (
    <div className={paginationBlock}>
      {arrRange.map((numPage) => {
        return (
          <div
            className={currentPage === numPage ? activePage : ''}
            key={numPage}
            onClick={() => changePage(numPage)}
          >
            {numPage}
          </div>
        );
      })}
    </div>
  );
};
