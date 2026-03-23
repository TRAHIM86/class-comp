import React from 'react';
import { errorMessage, result_sec } from '../../../styles/styles';
import { TableResult } from './tableresult';
import type { hero, StateError } from '../../../types';

export class Result extends React.Component<{
  heroes: Array<hero>;
  stateError?: StateError;
}> {
  render() {
    return (
      <section className={result_sec}>
        {this.props.stateError?.isError ? (
          <div className={errorMessage}>
            Error. Status: {this.props.stateError.errorStatus}. Please try
            again.
          </div>
        ) : (
          <TableResult heroes={this.props.heroes} />
        )}
      </section>
    );
  }
}
