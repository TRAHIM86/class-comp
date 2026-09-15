import { useState } from 'react';
import { result_table, result_block, title_item } from '../../styles/styles';
import type { PeopleResponse } from '../../types';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../store/store';
import { Btn } from '../../ui/btn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const TableResult = ({ heroes }: { heroes: PeopleResponse }) => {
  const selectedHeroes = useStore((state) => state.selectedHeroes);
  const toggleSelectHero = useStore((state) => state.toggleSelectHero);
  const clearSelected = useStore((state) => state.clearSelected);
  const downloadSelected = useStore((state) => state.downloadSelected);

  const queryClient = useQueryClient();

  // только имитация мутации, т.к. https://swapi.py4e.com/api не
  // дает делать изменения, только чтение. Поэтому просто имитация
  // запроса и обновление кэша по ключу "heroData". Глупо, т.к.
  // убирает нужный кэш, но нужно для задания
  const imitateMutation = useMutation({
    mutationFn: (heroId: number) => {
      console.log('Имитация мутации:', heroId);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: (_data, heroId) => {
      queryClient.invalidateQueries({ queryKey: ['heroData', String(heroId)] });
      console.log('Мутация выполнена');
    },
  });

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
    imitateMutation.mutate(heroId);
    return heroId;
  }

  // принудительное обновление героев
  async function updateHeroes() {
    console.log('updating');
    await queryClient.invalidateQueries({ queryKey: ['people'] });
    console.log('updated');
  }

  return (
    <div className={result_table}>
      <div className={result_block}>
        <div className={`${title_item} w-1/2`}>HERO</div>
        <Btn onClickFunc={updateHeroes} btnText="Update"></Btn>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-1/2 border-1 border-gray-300 p-1">
          {heroes?.peopleArr.map((hero, index) => {
            return (
              <div
                key={index}
                className={result_block}
                data-testid="hero-item"
                onClick={() => {
                  changeHeroId(hero.url);
                }}
              >
                <div>{hero.name}</div>
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
      {!!selectedHeroes.length && (
        <div className="flex flex-col items-center sticky bottom-0 bg-black w-1/2">
          Selected heroes: {selectedHeroes.length}
          <div className="w-4 flex flex-col gap-1 items-center w-full">
            <Btn btnText="Clear" onClickFunc={clearSelected} />

            <Btn btnText="Load" onClickFunc={() => downloadSelected()} />
          </div>
        </div>
      )}
    </div>
  );
};
