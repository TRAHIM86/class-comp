import { create } from 'zustand';
import type { Store, User } from '../types';

export const useStore = create<Store>((set, get) => ({
  // *********** СОСТОЯНИЯ ***********//
  inputValue: localStorage.getItem('searchStr') || '',
  currentPage: 1,
  selectedHeroes: [],
  countries: [
    'Albania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaijan',
    'Belarus',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Georgia',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kazakhstan',
    'Kosovo',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'Netherlands',
    'North Macedonia',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'Ukraine',
    'United Kingdom',
  ],
  users: [
    {
      id: 111,
      name: 'ppp',
      age: 42,
      email: 'pp@p.pu',
      gender: 'male',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      password: '1Pp!',
      country: 'Poland',
    },
    {
      id: 222,
      name: 'gf',
      age: 48,
      email: 'ggf@ff.tu',
      gender: 'female',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      password: '2Gg@',
      country: 'France',
    },
  ],

  // метод добавить юзера
  addUser: (newUser: User) => {
    set((state) => ({
      users: [...state.users, newUser],
    }));
  },

  // метод удалить юзера
  removeUser: (RemovedIndex: number) => {
    set((state) => ({
      users: [...state.users.filter((_, index) => index !== RemovedIndex)],
    }));
  },

  // метод строки в инпуте
  setInputValue: (value: string) => {
    set({ inputValue: value });
  },

  // метод изменить страницу
  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  // метод добавить/удалить избранное
  toggleSelectHero: (hero) =>
    set((state) => ({
      selectedHeroes: state.selectedHeroes.some((h) => h.name === hero.name)
        ? state.selectedHeroes.filter((h) => h.name !== hero.name)
        : [...state.selectedHeroes, hero],
    })),

  // очистить все избранное
  clearSelected: () => set({ selectedHeroes: [] }),

  // для скачивания героев
  downloadSelected: () => {
    const heroes = get().selectedHeroes;

    const csv = [
      'name;gender;birth_year;height',
      ...heroes.map((h) => `${h.name};${h.gender};${h.birth_year};${h.height}`),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });

    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);

    link.download = `${heroes.length}_items.csv`;

    link.click();

    link.remove();
    URL.revokeObjectURL(link.href);
  },
}));
