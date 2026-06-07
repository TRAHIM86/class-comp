import axios from 'axios';
import type { hero, PeopleResponse } from './types';

const SWAPI_PEOPLE_URL = 'https://swapi.py4e.com/api/people/';
const ERROR_4XX_URL = 'https://swapi.py4e.com/api/people404';
const ERROR_NETWORK = 'https://swapi123.dev/api/people';

const Requests = {
  async getAllPeople(
    value: string | null,
    numPage: number
  ): Promise<PeopleResponse | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const allPeople = await axios.get(
        `${SWAPI_PEOPLE_URL}?search=${value}&page=${numPage}`
      );

      return {
        countAll: allPeople.data.count,
        peopleArr: allPeople.data.results,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  async getHeroData(heroId: string): Promise<hero | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const heroData = await axios.get(`${SWAPI_PEOPLE_URL}${heroId}`);

      return heroData.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  async imitation4xx() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await fetch(`${ERROR_4XX_URL}`);

      if (!response.ok) {
        return {
          isError: true,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const error = err as Error;
      return error;
    }
  },

  async imitationErrNetwork() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await fetch(`${ERROR_NETWORK}`);

      if (!response.ok) {
        return {
          isError: true,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const error = err as Error;
      return error;
    }
  },
};

export default Requests;
