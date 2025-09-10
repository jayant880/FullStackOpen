import axios from "axios"
const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/'


const getAllCountries = () => {
    return axios.get(`${BASE_URL}/all`).then(res => res.data);
}

export default { getAllCountries }