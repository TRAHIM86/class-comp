import axios from 'axios';
import Requests from '../requests';
import {
  responseSearchAllPeople,
  responseSearchDarth,
  responseSearchEmpty,
} from './test-utils/dataForTests';
import { testGetAllPeople } from './test-utils/testGetAllPeople';
import { testError404 } from './test-utils/testError404';
import { testSuccessResponse } from './test-utils/testSuccessResponse';
import { tetsErrorNetwork } from './test-utils/tetsErrorNetwork';

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

    const result = await Requests.getAllPeople('darth', 1);

    expect(consoleSpy).toHaveBeenCalledWith(errorResponse);
    expect(result).toBeNull();

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
