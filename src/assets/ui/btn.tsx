import React from 'react';
import { btn_base, btn_disabled } from '../../styles/styles';
import type { BtnProps } from '../../types';

export class Btn extends React.Component<BtnProps> {
  render(): React.ReactNode {
    const { onClickFunc, disabled } = this.props;

    return (
      <button
        className={`${btn_base} ${this.props.disabled ? btn_disabled : ''}`}
        onClick={onClickFunc}
        disabled={disabled}
      >
        {this.props.children}
      </button>
    );
  }
}
