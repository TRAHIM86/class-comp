import { create } from 'zustand';
import type { Hero, Store } from '../types';

export const useStore = create<Store>((set, get) => ({
  // состояние
  people: [],
  searchTerm: '',
  currentPage: 1,
  totalCount: 0,
  selectedHeroes: [],

  // методы
  setPeople: (people: Hero[]) => set({ people }),
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setTotalCount: (totalCount: number) => set({ totalCount }),

  // метод длобавить/удалить избранное
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
