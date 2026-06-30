import { useContext } from 'react';
import { btn_base, btn_disabled, btn_ligth } from '../styles/styles';
import type { BtnProps } from '../types';
import { ThemeContext } from '../store/ThemeContext';

export const Btn = ({ onClickFunc, disabled, btnText }: BtnProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      data-testid="test-btn"
      className={`${theme === 'dark' ? btn_base : btn_ligth} ${disabled ? btn_disabled : ''}`}
      onClick={onClickFunc}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};
