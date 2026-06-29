import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Requests from '../../requests';
import type { Hero } from '../../types';
import { Loading } from '../loading/loading';
import { ErrorBoundary } from '../error/errorBoundary';
import { Btn } from '../../ui/btn';
import { ErrorResponse } from '../error/errorResponse';

export const HeroData = () => {
  const params = useParams();
  const navigate = useNavigate();

  const heroId = params.heroId || undefined;

  const [heroData, setHeroData] = useState<Hero | null>(null);

  // state загрузка до ответа сервера
  const [loading, setLoading] = useState<boolean>(false);

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
    <div className="flex items-center flex-1 border-2 border-green-300">
      {loading ? (
        <div className="flex items-center justify-center w-full">
          <Loading quantity={5} />
        </div>
      ) : !heroData ? (
        <ErrorResponse />
      ) : (
        <ErrorBoundary>
          <div className="flex flex-col px-5">
            <div>Name : {heroData?.name}</div>
            <div>Gender : {heroData?.gender}</div>
            <div>Birth year : {heroData?.birth_year}</div>
            <div>Height : {heroData?.height}</div>
            <Btn
              btnText="HIDE"
              disabled={loading}
              onClickFunc={() => navigate('..')}
            />
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
};
