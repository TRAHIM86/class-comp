import { useNavigate, useParams } from 'react-router-dom';
import Requests from '../../requests';
import { Loading } from '../loading/loading';
import { ErrorBoundary } from '../error/errorBoundary';
import { Btn } from '../../ui/btn';
import { ErrorResponse } from '../error/errorResponse';
import { useQuery } from '@tanstack/react-query';

export const HeroData = () => {
  const params = useParams();
  console.log('PARAMS:', params);
  const navigate = useNavigate();

  const heroId = params.heroId || undefined;

  const {
    data: heroData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['heroData', heroId],
    queryFn: () => {
      if (!heroId) return null;
      return Requests.getHeroData(heroId);
    },
  });

  if (error) return <div>Sorry some error: {error.message}</div>;

  // принудительное обновление героев
  async function updateHeroData() {
    console.log('updating heroData');
    await refetch();
    console.log('updated');
  }

  return (
    <div className="flex items-center flex-1 border-1 border-gray-300">
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <Loading quantity={5} />
        </div>
      ) : !heroData ? (
        <ErrorResponse />
      ) : (
        <ErrorBoundary>
          <div className="flex flex-col px-5 w-full gap-1">
            <div className="text-xl">Name : {heroData?.name}</div>
            <div className="text-xl">Gender : {heroData?.gender}</div>
            <div className="text-xl">Birth year : {heroData?.birth_year}</div>
            <div className="text-xl">Height : {heroData?.height}</div>
            <Btn
              btnText="HIDE"
              disabled={isLoading}
              onClickFunc={() => navigate('..')}
            />
            <Btn btnText="Update" onClickFunc={updateHeroData} />
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
};
