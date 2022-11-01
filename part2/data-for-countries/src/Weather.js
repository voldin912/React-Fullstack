import { useState, useEffect} from "react"
import axios from "axios"

const WeatherDisplay = ({weatherData}) => {
    return (
        <>
        <h1>Weather in {weatherData.name}</h1>
        <p>temperature {weatherData.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
        width="100" height="100" alt="hihi"/>
        <p>wind {weatherData.wind.speed} m/s</p>
      </>
    )
}
const Weather = ({country}) => {
    const api_key = process.env.REACT_APP_API_KEY 
    const latitude = country.latlng[0]
    const longitude = country.latlng[1]
    const [weatherData, setWeatherData] = useState({})
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${api_key}`)
        .then(response => {
          const weatherData = response.data
          setWeatherData(weatherData)
        })
    },[])
    const weatherDataNotEmpty = () => Object.keys(weatherData).length !== 0

    return (
      <div>
        {weatherDataNotEmpty() ? <WeatherDisplay weatherData={weatherData}/>
        :  <></>
        }
      </div>
    )
  } 

  export default Weather;