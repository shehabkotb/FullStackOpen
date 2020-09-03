import React, { useState, useEffect } from "react"
import Filter from "./components/Filter.js"
import PhoneList from "./components/PhoneList.js"
import Form from "./components/Form.js"
import Notification from "./components/Notification.js"
import contactService from "./services/contacts.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState({ type: 0, message: "" }) // 0 green notification, 1 error

  useEffect(() => {
    contactService.getAll().then((persons) => setPersons(persons))
  }, [])

  return (
    <div>
      {notification.message && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      <h2>Filter</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Phonebook</h2>
      <Form
        setPersons={setPersons}
        persons={persons}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <ul>
        <PhoneList filter={filter} persons={persons} setPersons={setPersons} />
      </ul>
    </div>
  )
}

export default App
