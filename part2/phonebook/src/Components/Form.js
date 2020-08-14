import React, { useState } from "react"

const Form = (props) => {
  const { setPersons, persons } = props

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName))
      window.alert(`${newName} is already added to the phonebook`)
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setNewName("")
      setNewNumber("")
      setPersons(persons.concat(newPerson))
    }
  }

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleClick}>
          add
        </button>
      </div>
    </form>
  )
}

export default Form
