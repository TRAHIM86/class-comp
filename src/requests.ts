import axios from 'axios';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';
const ERROR_4XX_URL = 'https://swapi.dev/api/people404';

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
          data: await response.json().catch(() => ({})),
        };
      }

      const data = await response.json();
      return data;
    } catch {
      return {
        isError: true,
        message: 'Network error',
      };
    }
  },
};

export default Requests;
