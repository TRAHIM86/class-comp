import { btn, btn_disabled } from '../styles/styles';
import type { BtnProps } from '../types';

export const Btn = ({ onClickFunc, disabled, btnText }: BtnProps) => {
  return (
    <button
      data-testid="test-btn"
      className={`${btn} ${disabled ? btn_disabled : ''}`}
      onClick={onClickFunc}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};
