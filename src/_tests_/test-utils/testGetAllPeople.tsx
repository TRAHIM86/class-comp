import axios from 'axios';
import Requests from '../../requests';
import type { Hero } from '../../types';

export async function testGetAllPeople(valueSearch: string, arrHero: Hero[]) {
  vi.spyOn(axios, 'get').mockResolvedValue({
    data: {
      results: arrHero,
    },
  });

  const result = await Requests.getAllPeople(valueSearch, 1);

  expect(result).toEqual(arrHero);
}
