import { useState } from 'react';

// кастомный хук - принимает ключ для get в localStorage
// и "запасную строку." Возвращает значениеиз LS (или запасную строку,
// если LS пустой) при ПЕРВОМ рендере. Так же возвращает функцию для
// set нового значения по "ключу". Т.к. помимо дефолтной функции по изменению
// состония надо еще записывать в LS (доп. функционал) - то основную функцию
// setValue надо обернуть в обертку, доб функционал и вернуть как setStoredValue
export const useLocalStorage = (
  key: string,
  emptyStr: string = ''
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState(() => {
    const dataLS = localStorage.getItem(key);
    return dataLS || emptyStr;
  });

  const setStoredValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, setStoredValue];
};
