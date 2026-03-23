import type React from 'react';

export interface ChildProps {
  children?: React.ReactNode;
}

export interface SearchProps {
  value: string;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFunc: (value: string) => void;
  disabled: boolean;
}

export interface BtnProps extends ChildProps {
  onClickFunc: () => void;
  disabled: boolean;
}

export interface hero {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
}

export interface ErrorBtnProps {
  onClickErrorFunc: () => void;
  disabled: boolean;
}

export interface StateError {
  isError: boolean;
  errorStatus: string;
}
