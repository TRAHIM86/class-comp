import axios from 'axios';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

const Requests = {
  async getAllPeople(value: string | null) {
    console.log('Request :', value);

    try {
      const allPeople = await axios.get(`${SWAPI_PEOPLE_URL}?search=${value}`);

      console.log('Response :', value);

      return allPeople.data.results;
    } catch (err) {
      console.log(err);
    }
  },
};

export default Requests;
