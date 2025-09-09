import axios from "axios";
const BASEURL = 'http://localhost:3001/persons';

const getAllPersons = () => {
    const res = axios.get(BASEURL);
    return res.then(response => response.data);
}

const createPerson = (person) => {
    const res = axios.post(BASEURL, person);
    return res.then(response => response.data);
}

const deletePerson = (id) => {
    const res = axios.delete(BASEURL + '/' + id);
    return res.then(response => response.data);
}

export default { getAllPersons, createPerson, deletePerson }