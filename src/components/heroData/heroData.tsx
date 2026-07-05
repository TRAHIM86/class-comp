import { useNavigate, useParams } from 'react-router-dom';
import Requests from '../../requests';
import { Loading } from '../loading/loading';
import { ErrorBoundary } from '../error/errorBoundary';
import { Btn } from '../../ui/btn';
import { ErrorResponse } from '../error/errorResponse';
import { useQuery } from '@tanstack/react-query';

export const HeroData = () => {
  const params = useParams();
  const navigate = useNavigate();

  const heroId = params.heroId || undefined;

  const {
    data: heroData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['heroData', heroId],
    queryFn: () => {
      if (!heroId) return null;
      return Requests.getHeroData(heroId);
    },
  });

  if (error) return <div>Sorry some error: {error.message}</div>;

  return (
    <div className="flex items-center flex-1 border-2 border-green-300">
      {isLoading ? (
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
              disabled={isLoading}
              onClickFunc={() => navigate('..')}
            />
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
};
