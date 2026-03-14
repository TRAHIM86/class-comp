import React from 'react';
import { btn_base } from '../../styles/styles';
import type { ChildProps } from '../../types';

export class Btn extends React.Component<ChildProps> {
  render(): React.ReactNode {
    return <button className={btn_base}>{this.props.children}</button>;
  }
}
