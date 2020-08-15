import React, { useState, useEffect } from "react"
import Form from "./Components/Form.js"
import Content from "./Components/Content.js"
import axios from "axios"

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  })

  return (
    <div>
      <Form filter={filter} setFilter={setFilter} />
      {filter ? (
        <Content countries={filteredCountries} setFilter={setFilter} />
      ) : (
        ""
      )}
    </div>
  )
}

export default App
