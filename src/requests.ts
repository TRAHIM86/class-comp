import axios from 'axios';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';
const ERROR_4XX_URL = 'https://swapi.dev/api/people404';
const ERROR_NETWORK = 'https://swapi123.dev/api/people';

const Requests = {
  async getAllPeople(value: string | null) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const allPeople = await axios.get(`${SWAPI_PEOPLE_URL}?search=${value}`);

      return allPeople.data.results;
    } catch (err) {
      console.log(err);
    }
  },

  async imitation4xx() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
