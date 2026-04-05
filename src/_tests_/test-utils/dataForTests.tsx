import axios from 'axios';
import Requests from '../../requests';
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

export async function testError404(
  method: keyof typeof Requests,
  value: string | null
) {
  window.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
  } as Response);

  const result = await Requests[method](value);

  expect(result).toEqual({
    isError: true,
    status: 404,
  });
}

export async function tetsErrorNetwork(
  method: keyof typeof Requests,
  value: string | null
) {
  window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

  const result = await Requests[method](value);

  expect(result).toBeInstanceOf(Error);
  expect(result.message).toBe('Network error');
}

export async function testSuccessResponse(
  method: keyof typeof Requests,
  value: string | null
) {
  window.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ name: 'testNetwork' }),
  } as Response);

  const result = await Requests[method](value);

  expect(result).toEqual({ name: 'testNetwork' });
}

export async function testGetAllPeople(valueSearch: string, arrHero: hero[]) {
  vi.spyOn(axios, 'get').mockResolvedValue({
    data: {
      results: arrHero,
    },
  });

  const result = await Requests.getAllPeople(valueSearch);

  expect(result).toEqual(arrHero);
}
