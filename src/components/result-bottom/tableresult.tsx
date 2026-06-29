import { useState } from 'react';
import { result_table, result_block, title_item } from '../../styles/styles';
import type { PeopleResponse } from '../../types';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../store/store';

export const TableResult = ({ heroes }: { heroes: PeopleResponse }) => {
  const selectedHeroes = useStore((state) => state.selectedHeroes);
  const toggleSelectHero = useStore((state) => state.toggleSelectHero);

  console.log('selectedHeroes :', selectedHeroes);

  const params = useParams();
  const navigate = useNavigate();

  // текущий id героя для описания
  const [currentHeroId, setCurrentHeroId] = useState<number>(
    Number(params.heroId)
  );

  if (params.heroId && isNaN(Number(params.heroId))) {
    navigate('/1');
    return null;
  }

  // текущая страница (или 1)
  const currentPage = params.pageId || 1;

  function changeHeroId(stringData: string): number {
    const heroId = Number(stringData.split('/').filter(Boolean).pop()) || 0;
    setCurrentHeroId(heroId);

    navigate(`/${currentPage}/${heroId}`);
    return heroId;
  }

  return (
    <div className={result_table}>
      <div className={result_block}>
        <div className={`${title_item} w-1/2`}>HERO</div>
      </div>

      <div className="flex flex-row w-full border-2 border-blue-300">
        <div className="flex flex-col w-1/2 border-2 border-red-700">
          {heroes?.peopleArr.map((hero, index) => {
            return (
              <div
                key={index}
                className={result_block}
                data-testid="hero=item"
                onClick={() => {
                  changeHeroId(hero.url);
                }}
              >
                <div className=" border-1 border-red-700">{hero.name}</div>
                <input
                  type="checkbox"
                  checked={selectedHeroes.some((h) => h.name === hero.name)}
                  onChange={() => toggleSelectHero(hero)}
                  onClick={(e) => e.stopPropagation()}
                ></input>
              </div>
            );
          })}
        </div>
        {currentHeroId ? <Outlet /> : null}
      </div>
    </div>
  );
};
