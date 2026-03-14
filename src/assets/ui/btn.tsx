import { btn_base } from '../../styles/styles';
import type { ChildProps } from '../../types';

export const Btn = ({ children }: ChildProps) => {
  return <button className={btn_base}>{children}</button>;
};
