import React from 'react';
import { Btn } from '../../ui/btn';
import type { ErrorBtnProps } from '../../../types';

export class ErrorBtn extends React.Component<ErrorBtnProps> {
  render() {
    return (
      <Btn
        disabled={this.props.disabled}
        onClickFunc={() => {
          this.props.onClickErrorFunc();
        }}
      >
        Error
      </Btn>
    );
  }
}
