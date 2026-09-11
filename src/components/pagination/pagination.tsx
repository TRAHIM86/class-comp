import { activePage, paginationBlock } from '../../styles/styles';
import type { PaginationProps } from '../../types';
import { useStore } from '../../store/store';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const Pagination = ({ countPages }: PaginationProps) => {
  // создать из countHeroes массив индексов, например [0,1,2,3,4,5]
  const arrRange = Array.from({ length: countPages }, (_, ind) => ind + 1);

  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchStr = searchParams.get('search') || '';

  // выбрать текущую страницу
  function changePage(num: number): number {
    setCurrentPage(num);
    navigate(`/${num}?search=${searchStr}`);
    return num;
  }

  useEffect(() => {
    if (
      params.pageId &&
      (isNaN(Number(params.pageId)) || Number(params.pageId) > countPages)
    ) {
      navigate('/1');
      setCurrentPage(1);
      return;
    }

    setCurrentPage(Number(params.pageId || 1));
  }, [params.pageId, countPages, navigate, setCurrentPage]);

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
