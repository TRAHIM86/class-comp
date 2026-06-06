import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Requests from '../../requests';
import type { hero } from '../../types';
import { Loading } from '../loading/loading';
import { ErrorBoundary } from '../error/errorBoundary';

export const HeroData = () => {
  const params = useParams();

  const heroId = params.heroId || undefined;

  const [heroData, setHeroData] = useState<hero | null>(null);

  // state загрузка до ответа сервера
  const [loading, setLoading] = useState<boolean>(false);
  console.log(loading);

  useEffect(() => {
    if (heroId) {
      async function fetchHeroData(heroId: string) {
        setLoading(true);
        const data = await Requests.getHeroData(heroId);
        setHeroData(data);
        setLoading(false);
      }

      fetchHeroData(heroId);
    }
  }, [heroId]);

  return (
    <div className="flex items-center flex-1">
      {loading ? (
        <div className="flex items-center justify-center w-full">
          <Loading quantity={5} />
        </div>
      ) : (
        <ErrorBoundary>
          <div className="flex flex-col px-5">
            <div>Name : {heroData?.name}</div>
            <div>Gender : {heroData?.gender}</div>
            <div>Birth year : {heroData?.birth_year}</div>
            <div>Height : {heroData?.height}</div>
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
};
