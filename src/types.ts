import type React from 'react';

export interface ChildProps {
  children?: React.ReactNode;
}

export interface SearchProps {
  onClickFunc: (value: string) => void;
  disabled: boolean;
}

export interface BtnProps extends ChildProps {
  onClickFunc: () => void;
  disabled?: boolean;
  btnText?: string;
}

// тип героя
export interface Hero {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
  url: string;
}

export interface ErrorBtnProps {
  onClickErrorFunc: () => void;
  disabled: boolean;
  btnText?: string;
}

export interface ErrorRequest {
  isError: boolean;
  status: string;
}

export interface StateErrorBoundary {
  isError: boolean;
  errorStatus?: string;
}

// тип для тестов
export type DataTestId = string;

// ответ количество героев и сами герои
export interface PeopleResponse {
  countAll: number;
  peopleArr: Hero[];
}

// тип для пагинации (всего героев, функция активной страницы)
export interface PaginationProps {
  countPages: number;
}

// тип для STORE
export type Store = {
  inputValue: string;
  currentPage: number;
  selectedHeroes: Hero[];
  users: User[];
  addUser: (user: User) => void;
  removeUser: (RemovedIndex: number) => void;
  setInputValue: (value: string) => void;
  setCurrentPage: (page: number) => void;
  toggleSelectHero: (hero: Hero) => void;
  clearSelected: () => void;
  downloadSelected: () => void;
};

// тип ThemeContext
export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// тип пропсы для модалки
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// тип нового юзера
export interface User {
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female';
  image?: string;
  password: string;
}

export interface PasswordComplexity {
  hasDigit: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSpecial: boolean;
  isPasswordDifficult: boolean;
}
