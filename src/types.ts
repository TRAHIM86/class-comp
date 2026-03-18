import type React from 'react';

export interface ChildProps {
  children?: React.ReactNode;
}

export interface SearchProps {
  value: string;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFunc: (value: string) => void;
}

export interface BtnProps extends ChildProps {
  onClickFunc: () => void;
}

export interface hero {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
}

export interface ErrorBtnProps {
  onClickErrorFunc: () => void;
}

export interface StateError {
  hasError: boolean;
}
