import axios from "axios"

const baseURL = "http://localhost:3001/persons"

const createContact = (contact) => {
  return axios.post(baseURL, contact).then((response) => response.data)
}

const updateContact = (contact) => {
  return axios
    .put(`${baseURL}/${contact.id}`, contact)
    .then((response) => response.data)
}

const deleteContact = (contact) => {
  console.log(contact)
  return axios.delete(`${baseURL}/${contact.id}`)
}

export default { createContact, updateContact, deleteContact }
