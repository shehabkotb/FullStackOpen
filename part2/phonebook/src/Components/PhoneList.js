import React from "react"
import Contact from "./Contact.js"

const PhoneList = (props) => {
  const { filter, persons, setPersons } = props

  let personsList
  if (filter) {
    personsList = persons.filter(
      (person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
  } else {
    personsList = [...persons]
  }
  return personsList.map((person) => (
    <Contact
      key={person.id}
      contact={person}
      persons={persons}
      setPersons={setPersons}
    />
  ))
}

export default PhoneList
