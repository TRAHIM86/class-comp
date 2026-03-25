import React from 'react';
import {
  result_table,
  result_block,
  title_item,
  result_item,
} from '../../styles/styles';
import type { hero } from '../../types';

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
            <div className={result_block} key={index}>
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
