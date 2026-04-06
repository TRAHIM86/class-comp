import type { hero } from '../../types';

// Result.test, TableResult.test ***********************
export const heroes = [
  {
    name: 'r2-d2',
    gender: 'robot',
    birth_year: '1140',
    height: '100',
  },
  {
    name: 'Padme Amidala',
    gender: 'female',
    birth_year: '1190',
    height: '1172',
  },
];

// Requests.test ***********************
export const responseSearchDarth = [
  {
    name: 'darth Moul',
    gender: 'Man',
    birth_year: '1170',
    height: '167',
  },

  {
    name: 'darth Vader',
    gender: 'Man',
    birth_year: '1195',
    height: '190',
  },
];

export const responseSearchEmpty: hero[] = [];

export const responseSearchAllPeople = [
  {
    name: 'darth Moul',
    gender: 'Man',
    birth_year: '1170',
    height: '167',
  },
  {
    name: 'darth Vader',
    gender: 'Man',
    birth_year: '1195',
    height: '190',
  },
  {
    name: 'r2-d2',
    gender: 'robot',
    birth_year: '1140',
    height: '100',
  },
  {
    name: 'Padme Amidala',
    gender: 'female',
    birth_year: '1190',
    height: '1172',
  },
];
