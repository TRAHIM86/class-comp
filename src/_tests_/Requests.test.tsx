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

/********************************************************/

describe('Request imitation4xx', () => {
  test('Imitation4xx returns isError + 404', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    const result = await Requests.imitation4xx();

    expect(result).toEqual({
      isError: true,
      status: 404,
    });
  });

  test('Imitation4xx returns data on success', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ name: 'test4xx' }),
    } as Response);

    const result = await Requests.imitation4xx();

    expect(result).toEqual({ name: 'test4xx' });
  });

  test('Imitation4xx returns error', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await Requests.imitation4xx();

    expect(result).toBeInstanceOf(Error);

    expect(result.message).toBe('Network error');
  });
});

/********************************************************/
describe('Request imitationErrNetwork', () => {
  test('Return network error', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await Requests.imitationErrNetwork();

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Network error');
  });

  test('ImitationErrNetwork returns 404', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    const result = await Requests.imitationErrNetwork();

    expect(result).toEqual({
      isError: true,
      status: 404,
    });
  });

  test('Imitation4xx returns data on success', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ name: 'testNetwork' }),
    } as Response);

    const result = await Requests.imitationErrNetwork();

    expect(result).toEqual({ name: 'testNetwork' });
  });
});
