import { create } from 'zustand';
import type { Hero, Store } from '../types';

export const useStore = create<Store>((set) => ({
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

  toggleSelectHero: (hero) =>
    set((state) => ({
      selectedHeroes: state.selectedHeroes.some((h) => h.name === hero.name)
        ? state.selectedHeroes.filter((h) => h.name !== hero.name)
        : [...state.selectedHeroes, hero],
    })),
}));
