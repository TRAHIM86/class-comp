export interface ChildProps {
  children?: React.ReactNode;
}

export interface SearchProps {
  value: string;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFunc: () => void;
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
