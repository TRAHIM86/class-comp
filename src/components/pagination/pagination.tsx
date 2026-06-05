import { activePage, paginationBlock } from '../../styles/styles';
import type { PaginationProps } from '../../types';

export const Pagination = ({
  countHeroes,
  currentPage,
  fyncChangePage,
}: PaginationProps) => {
  // создать из countHeroes массив индексов, например [0,1,2,3,4,5]
  const arrRange = Array.from({ length: countHeroes }, (_, ind) => ind + 1);

  return (
    <div className={paginationBlock}>
      {arrRange.map((numPage) => {
        return (
          <div
            className={currentPage === numPage ? activePage : ''}
            key={numPage}
            onClick={() => fyncChangePage(numPage)}
          >
            {numPage}
          </div>
        );
      })}
    </div>
  );
};
