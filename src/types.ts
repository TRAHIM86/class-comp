import type React from 'react';

export interface ChildProps {
  children?: React.ReactNode;
}

export interface SearchProps {
  value: string;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFunc: (value: string, numPage: number) => void;
  disabled: boolean;
  btnText?: string;
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

export interface StateError {
  isError: boolean;
  errorStatus?: string;
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
  currentPage: number;
  fyncChangePage: (page: number) => number;
}

// тип для STORE
export type Store = {
  people: Hero[];
  searchTerm: string;
  currentPage: number;
  totalCount: number;
  selectedHeroes: Hero[];
  setPeople: (people: Hero[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalCount: (totalCount: number) => void;
  toggleSelectHero: (hero: Hero) => void;
  clearSelected: () => void;
  downloadSelected: () => void;
};

// тип ThemeContext
export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};
