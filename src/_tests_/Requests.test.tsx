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

async function testError404(
  method: keyof typeof Requests,
  value: string | null
) {
  window.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
    json: async () => ({}),
  } as Response);

  const result = await Requests[method](value);

  expect(result).toEqual({
    isError: true,
    status: 404,
  });
}

async function tetsErrorNetwork(
  method: keyof typeof Requests,
  value: string | null
) {
  window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

  const result = await Requests[method](value);

  expect(result).toBeInstanceOf(Error);
  expect(result.message).toBe('Network error');
}

async function testSuccessResponse(
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

async function testGetAllPeople(valueSearch: string, arrHero: hero[]) {
  vi.spyOn(axios, 'get').mockResolvedValue({
    data: {
      results: arrHero,
    },
  });

  const result = await Requests.getAllPeople(valueSearch);

  expect(result).toEqual(arrHero);
}

describe('Request getAllPeople', () => {
  test('Return data success', async () => {
    await testGetAllPeople('darth', responseSearchDarth);
  });

  test('Return data empty', async () => {
    await testGetAllPeople('qwertyuop', responseSearchEmpty);
  });

  test('Return data without filter', async () => {
    await testGetAllPeople('', responseSearchAllPeople);
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
    await testError404('imitation4xx', 'darth');
  });

  test('Imitation4xx returns data on success', async () => {
    await testSuccessResponse('imitation4xx', 'darth');
  });

  test('Imitation4xx returns error', async () => {
    await tetsErrorNetwork('imitation4xx', 'darth');
  });
});

/********************************************************/
describe('Request imitationErrNetwork', () => {
  test('Imitation4xx returns error', async () => {
    await tetsErrorNetwork('imitationErrNetwork', 'darth');
  });

  test('Imitation4xx returns isError + 404', async () => {
    await testError404('imitationErrNetwork', 'darth');
  });

  test('Imitation4xx returns data on success', async () => {
    await testSuccessResponse('imitationErrNetwork', 'darth');
  });
});
