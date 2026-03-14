import type { ChildProps } from '../../../types';

export const BtnSearch = ({ children }: ChildProps) => {
  return (
    <button className="p-4 bg-blue-500 text-white rounded">{children}</button>
  );
};
