import React from 'react';
import { btn_base } from '../../styles/styles';
import type { ChildProps } from '../../types';

interface BtnProps extends ChildProps {
  onClickFunc: () => void;
}

export class Btn extends React.Component<BtnProps> {
  render(): React.ReactNode {
    return (
      <button className={btn_base} onClick={this.props.onClickFunc}>
        {this.props.children}
      </button>
    );
  }
}
