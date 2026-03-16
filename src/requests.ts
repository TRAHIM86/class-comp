import axios from 'axios';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';
const ERROR_4XX_URL = 'https://swapi.dev/api/people444';
const ERROR_5XX_URL = 'https://httpstat.us/500';

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
    try {
      const response = await axios.get(`${ERROR_4XX_URL}`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error4xx = {
          isError: true,
          status: err.response?.status,
          data: err.response?.data,
        };

        console.log(error4xx);

        return error4xx;
      }
      return {
        isError: true,
        message: 'Unknown error',
      };
    }
  },

  async imitation5xx() {
    try {
      const response = await axios.get(`${ERROR_5XX_URL}`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error5xx = {
          isError: true,
          code: err.code,
          message: err.message,
        };

        console.log(error5xx);

        return error5xx;
      }
      return {
        isError: true,
        message: 'Unknown error',
      };
    }
  },
};

export default Requests;
