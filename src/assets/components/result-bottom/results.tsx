import React from 'react';
import { result_sec } from '../../../styles/styles';
import { TableResult } from './tableresult';
import type { hero } from '../../../types';

export class Result extends React.Component<{ heroes: Array<hero> }> {
  render() {
    return (
      <section className={result_sec}>
        <TableResult heroes={this.props.heroes} />
      </section>
    );
  }
}
