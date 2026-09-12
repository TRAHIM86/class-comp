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
      name: 'Simon',
      age: 42,
      email: 'simon_lewandowski@s.pl',
      gender: 'male',
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='gold'/%3E%3Ccircle cx='35' cy='40' r='6'/%3E%3Ccircle cx='65' cy='40' r='6'/%3E%3Cpath d='M30 60 Q50 80 70 60' stroke='black' stroke-width='5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E",
      password: '!2Qw',
      country: 'Poland',
    },
    {
      id: 222,
      name: 'Diana',
      age: 48,
      email: 'diana@paris77.fr',
      gender: 'female',
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231E3A8A'/%3E%3Ccircle cx='50' cy='40' r='18' fill='%23FFDBAC'/%3E%3Cpath d='M30 35 Q50 10 70 35 Q70 20 50 15 Q30 20 30 35' fill='%238B4513'/%3E%3Ccircle cx='43' cy='40' r='3' fill='black'/%3E%3Ccircle cx='57' cy='40' r='3' fill='black'/%3E%3Cpath d='M45 50 Q50 55 55 50' stroke='%23C0392B' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M50 60 L50 90 L30 90 Q50 70 50 60 Q50 70 70 90 L50 90' fill='%23E91E63'/%3E%3C/svg%3E",
      password: '#4Er',
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
