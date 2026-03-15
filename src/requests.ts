import axios from 'axios';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

const Requests = {
  async getAllPeople() {
    try {
      const allPeople = await axios.get(`${SWAPI_PEOPLE_URL}`);

      return allPeople.data.results;
    } catch (err) {
      console.log(err);
    }
  },
};

export default Requests;
