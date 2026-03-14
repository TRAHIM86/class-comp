import React from 'react';
import { result_sec } from '../../../styles/styles';
import { TableResult } from './tableresult';

export class Result extends React.Component {
  render() {
    return (
      <section className={result_sec}>
        <TableResult />
      </section>
    );
  }
}
