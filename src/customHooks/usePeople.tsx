import { useQuery } from '@tanstack/react-query';
import Requests from '../requests';

export const usePeople = (searchValue: string, currentPage: number) => {
  const {
    data: people,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['people', searchValue, currentPage],
    queryFn: () => Requests.getAllPeople(searchValue, currentPage),
    staleTime: Number(import.meta.env.VITE_CACHE_TTL),
  });

  const countPages = people ? Math.ceil(people.countAll / 10) : 0;

  return {
    people,
    isLoading,
    error,
    countPages,
  };
};
