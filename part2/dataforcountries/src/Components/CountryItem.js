import React from "react"

const CountryItem = (props) => {
  const { country, setFilter } = props

  const handleClick = (event) => {
    setFilter(country.name)
  }

  return (
    <div>
      <li>{country.name}</li>
      <button key={country.name} onClick={handleClick}>
        show
      </button>
    </div>
  )
}

export default CountryItem
