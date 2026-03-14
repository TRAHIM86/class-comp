import React from 'react';
import {
  result_table,
  result_block,
  title_item,
  reult_item,
} from '../../../styles/styles';

export class TableResult extends React.Component {
  render() {
    return (
      <div className={result_table}>
        <div className={result_block}>
          <div className={`${title_item} w-1/3`}>Item Name</div>
          <div className={`${title_item} w-2/3`}>Item Description</div>
        </div>
        <div className={result_block}>
          <div className={`${reult_item} w-1/3`}>Item ...</div>
          <div className={`${reult_item} w-2/3`}>Description ...</div>
        </div>
      </div>
    );
  }
}
