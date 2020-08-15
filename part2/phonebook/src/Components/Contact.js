import React from "react"
import contactService from "../services/contacts.js"

const Contact = ({ contact, persons, setPersons }) => {
  const handleClick = async () => {
    let confirmation = window.confirm(`Delete ${contact.name}`)

    if (confirmation) {
      await contactService.deleteContact(contact)
      setPersons(persons.filter((person) => person.id !== contact.id))
    }
  }

  return (
    <li>
      {contact.name} {contact.number}{" "}
      <button onClick={handleClick}>Delete</button>
    </li>
  )
}

export default Contact
