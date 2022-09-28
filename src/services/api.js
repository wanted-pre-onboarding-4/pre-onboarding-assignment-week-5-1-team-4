import axios from 'axios';

const searchApi = async q => await axios.get(`http://localhost:4000/sick?q=${q}`);

export default searchApi;
