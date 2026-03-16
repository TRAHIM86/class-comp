import axios from 'axios';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

const Requests = {
  async getAllPeople(value: string | null) {
    console.log('request');

    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const allPeople = await axios.get(`${SWAPI_PEOPLE_URL}?search=${value}`);

      return allPeople.data.results;
    } catch (err) {
      console.log(err);
    }
  },
};

export default Requests;
