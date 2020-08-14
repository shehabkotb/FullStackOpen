import React from "react"

const PhoneList = (props) => {
  const { filter, persons } = props

  let personsList
  if (filter) {
    personsList = persons.filter(
      (person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
  } else {
    personsList = [...persons]
  }

  return personsList.map((person) => (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  ))
}

export default PhoneList
