import React, { useEffect, useState } from "react"
import Axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ countryName, countryCapital }) => {
  const [weatherData, setWeatherData] = useState({})
  const getURL = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryCapital}`

  useEffect(() => {
    Axios.get(getURL).then((response) => {
      setWeatherData(response.data)
    })
  }, [getURL])

  return (
    <div>
      <h2>weather of {countryCapital}</h2>
      <h5>
        temperature:{" "}
        {Object.keys(weatherData).length === 0
          ? "loading..."
          : weatherData.current.temperature}{" "}
        Celcius
      </h5>
      <img
        alt="happy sun"
        src={
          Object.keys(weatherData).length === 0
            ? ""
            : weatherData.current.weather_icons[0]
        }
      />
      <h5>
        wind:{" "}
        {Object.keys(weatherData).length === 0
          ? "loading..."
          : weatherData.current.wind_speed}{" "}
        mph
      </h5>
    </div>
  )
}

export default Weather
