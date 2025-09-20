import axios from "axios";
const BASE_URL = '/api/persons';

const getAllPersons = () => {
    return axios.get(BASE_URL).then(response => response.data);
}

const createPerson = (person) => {
    return axios.post(BASE_URL, person).then(response => response.data);
}

const deletePerson = (id) => {
    return axios.delete(`${BASE_URL}/${id}`).then(response => response.data);
}

const getAPerson = (id) => {
    return axios.get(`${BASE_URL}/${id}`).then(res => res.data);
}

const updatePerson = (id, person) => {
    return axios.put(`${BASE_URL}/${id}`, person).then(response => response.data);
}

export default { getAllPersons, createPerson, getAPerson, deletePerson, updatePerson }