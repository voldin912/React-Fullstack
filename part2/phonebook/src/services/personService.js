import axios from "axios";
const server_url = "/api/persons";

const getPersons = () => {
  const request = axios.get(server_url);
  return request
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const addPerson = (newPerson) => {
  const request = axios.post(server_url, newPerson);
  return request
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err.response.data.error);
    });
};

const deletePerson = (deleteId) => {
  const request = axios.delete(`${server_url}/${deleteId}`);
  return request
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err);
    });
};
const updatePerson = (updateId, newPerson) => {
  const request = axios.put(`${server_url}/${updateId}`, newPerson);
  return request
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err);
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPersons,
  addPerson,
  deletePerson,
  updatePerson,
};
