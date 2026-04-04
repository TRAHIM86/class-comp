import axios from 'axios';
import Requests from '../requests';
import type { hero } from '../types';

const responseSearchDarth = [
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

const responseSearchEmpty: hero[] = [];

const responseSearchAllPeople = [
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

describe('Request getAllPeople', () => {
  test('Return data success', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        results: responseSearchDarth,
      },
    });

    const result = await Requests.getAllPeople('darth');

    expect(result).toEqual(responseSearchDarth);
  });

  test('Return data empty', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        results: responseSearchEmpty,
      },
    });

    const result = await Requests.getAllPeople('qwertyuop');

    expect(result).toEqual(responseSearchEmpty);
  });

  test('Return data without filter', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        results: responseSearchAllPeople,
      },
    });

    const result = await Requests.getAllPeople('');

    expect(result).toEqual(responseSearchAllPeople);
  });

  test('Error axios.get', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const errorResponse = new Error('Network error');

    vi.spyOn(axios, 'get').mockRejectedValue(errorResponse);

    const result = await Requests.getAllPeople('darth');

    expect(consoleSpy).toHaveBeenCalledWith(errorResponse);
    expect(result).toBeUndefined();

    consoleSpy.mockRestore();
  });
});
