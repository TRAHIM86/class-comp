import axios from 'axios';
import Requests from '../../requests';
import type { hero } from '../../types';

export async function testGetAllPeople(valueSearch: string, arrHero: hero[]) {
  vi.spyOn(axios, 'get').mockResolvedValue({
    data: {
      results: arrHero,
    },
  });

  const result = await Requests.getAllPeople(valueSearch);

  expect(result).toEqual(arrHero);
}
