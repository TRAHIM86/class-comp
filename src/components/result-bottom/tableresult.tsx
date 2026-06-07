import { useState } from 'react';
import { result_table, result_block, title_item } from '../../styles/styles';
import type { PeopleResponse } from '../../types';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

/*
export class TableResult extends React.Component<{ heroes: Array<hero> }> {
  render() {
    return (
      <div className={result_table}>
        <div className={result_block}>
          <div className={`${title_item} w-1/3`}>Hero</div>
          <div className={`${title_item} w-2/3`}>Hero description</div>
        </div>

        {this.props.heroes?.map((p, index) => {
          return (
            <div className={result_block} key={index} data-testid="hero-item">
              <div className={`${result_item} w-1/3`}>{p.name}</div>
              <div className={`${result_item} w-2/3`}>
                <div>Gender: {p.gender},</div>
                <div>B.y.: {p.birth_year},</div>
                <div>Height: {p.height}.</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
*/

export const TableResult = ({ heroes }: { heroes: PeopleResponse }) => {
  const params = useParams();
  const navigate = useNavigate();

  // текущий id героя для описания
  const [currentHeroId, setCurrentHeroId] = useState<number>(
    Number(params.heroId)
  );

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
                className={result_block}
                key={index}
                data-testid="hero=item"
                onClick={() => {
                  changeHeroId(hero.url);
                }}
              >
                {hero.name}
              </div>
            );
          })}
        </div>
        {currentHeroId && <Outlet />}
      </div>
    </div>
  );
};
