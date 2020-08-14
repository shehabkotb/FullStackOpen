import React, { useState } from "react"
import Filter from "./Components/Filter.js"
import PhoneList from "./Components/PhoneList.js"
import Form from "./Components/Form.js"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ])

  const [filter, setFilter] = useState("")

  return (
    <div>
      <h2>Filter</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Phonebook</h2>
      <Form setPersons={setPersons} persons={persons} />
      <h2>Numbers</h2>
      <ul>
        <PhoneList filter={filter} persons={persons} />
      </ul>
    </div>
  )
}

export default App
