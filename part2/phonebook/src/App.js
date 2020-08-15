import React, { useState, useEffect } from "react"
import Filter from "./components/Filter.js"
import PhoneList from "./components/PhoneList.js"
import Form from "./components/Form.js"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
  }, [])

  return (
    <div>
      <h2>Filter</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Phonebook</h2>
      <Form setPersons={setPersons} persons={persons} />
      <h2>Numbers</h2>
      <ul>
        <PhoneList filter={filter} persons={persons} setPersons={setPersons} />
      </ul>
    </div>
  )
}

export default App
