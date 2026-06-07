import type { hero } from '../../types';

// Result.test, TableResult.test ***********************
export const heroes = [
  {
    name: 'r2-d2',
    gender: 'robot',
    birth_year: '1140',
    height: '100',
    url: 'https://swapi.py4e.com/api/people/1/',
  },
  {
    name: 'Padme Amidala',
    gender: 'female',
    birth_year: '1190',
    height: '1172',
    url: 'https://swapi.py4e.com/api/people/3/',
  },
];

export const heroesResponse = {
  countAll: heroes.length,
  peopleArr: heroes,
};

// Requests.test ***********************
export const responseSearchDarth = [
  {
    name: 'darth Moul',
    gender: 'Man',
    birth_year: '1170',
    height: '167',
    url: 'https://swapi.py4e.com/api/people/4/',
  },

  {
    name: 'darth Vader',
    gender: 'Man',
    birth_year: '1195',
    height: '190',
    url: 'https://swapi.py4e.com/api/people/8/',
  },
];

export const responseSearchEmpty: hero[] = [];

export const responseSearchAllPeople = [
  {
    name: 'darth Moul',
    gender: 'Man',
    birth_year: '1170',
    height: '167',
    url: 'https://swapi.py4e.com/api/people/8/',
  },
  {
    name: 'darth Vader',
    gender: 'Man',
    birth_year: '1195',
    height: '190',
    url: 'https://swapi.py4e.com/api/people/11/',
  },
  {
    name: 'r2-d2',
    gender: 'robot',
    birth_year: '1140',
    height: '100',
    url: 'https://swapi.py4e.com/api/people/81/',
  },
  {
    name: 'Padme Amidala',
    gender: 'female',
    birth_year: '1190',
    height: '1172',
    url: 'https://swapi.py4e.com/api/people/49/',
  },
];
