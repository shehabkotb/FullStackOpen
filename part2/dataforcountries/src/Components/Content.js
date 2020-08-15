import React from "react"
import Country from "./Country.js"
import CountryItem from "./CountryItem.js"

const Content = (props) => {
  const { countries, setFilter } = props

  if (countries.length > 10)
    return <p>too many matches, specify another filter</p>

  if (countries.length === 1) return <Country Country={countries[0]} />

  return (
    <ul>
      {countries.map((country) => (
        <CountryItem country={country} setFilter={setFilter} />
      ))}
    </ul>
  )
}

export default Content
