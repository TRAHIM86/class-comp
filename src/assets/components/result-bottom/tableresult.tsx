import React from 'react';
import {
  result_table,
  result_block,
  title_item,
  reult_item,
} from '../../../styles/styles';
import type { hero } from '../../../types';

export class TableResult extends React.Component<{ heroes: Array<hero> }> {
  render() {
    return (
      <div className={result_table}>
        <div className={result_block}>
          <div className={`${title_item} w-1/3`}>Item Name</div>
          <div className={`${title_item} w-2/3`}>Item Description</div>
        </div>

        {this.props.heroes.map((p, index) => {
          return (
            <div className={result_block} key={index}>
              <div className={`${reult_item} w-1/3`}>{p.name}</div>
              <div className={`${reult_item} w-2/3`}>
                <div>{p.gender}</div>
                <div>{p.birth_year}</div>
                <div>{p.height}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
