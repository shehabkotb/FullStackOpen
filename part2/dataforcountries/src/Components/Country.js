import React from "react"
import Weather from "./Weather"

const Country = ({ Country }) => {
  const CountryName = Country.name
  const capital = Country.capital
  const languages = Country.languages
  const population = Country.population
  const flag = Country.flag

  return (
    <div>
      <h2>{CountryName}</h2>
      <ul>
        <li>Capital {capital}</li>
        <li>Population {population}</li>
      </ul>
      <h3>languages</h3>
      <ul>
        {languages.map((lang) => {
          return <li key={lang.name}>{lang.name}</li>
        })}
      </ul>
      <img alt="flag of country" src={flag} />
      <Weather CountryName={CountryName} countryCapital={capital} />
    </div>
  )
}

export default Country
