import axios from "axios"
const server_url = "http://localhost:3001/persons"
const getPersons = () => {
   const request = axios.get(server_url)
   return request.then(response => response.data)
}

const addPerson = (newPerson) => {
    const request = axios.post(server_url,newPerson)
    return request.then(response => response.data)
}

const deletePerson = (deleteId) => {
    return axios.delete(`${server_url}/${deleteId}`)
}
export default {
    getPersons,
    addPerson,
    deletePerson
}