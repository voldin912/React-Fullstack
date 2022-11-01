import { useEffect, useState } from "react";
import axios from "axios"
const Country = ({country})  => {
  const languagesList = Object.values(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <p><b>languages:</b></p>
      <ul>
      {languagesList.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} width="180" height="180"/>
    </div>
    )
}

const FoundCountries = ({countries}) => {
  return (
    <ul>
      {countries.map(country => <li key={country.name.official}>{country.name.common}</li>)}
    </ul>
  )
}

const App = () => {
  const [query, setQuery] = useState("")
  const [countries, setCountries] = useState([])
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }
  useEffect (() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response =>{
      const countries = response.data
      setCountries(countries)
    })
  },[])

  const runQuery = (query) => {
    if(countries.length != 0 && query.length != 0) {
      const result = countries.filter(country => country.name.common.toLowerCase().includes(query))
      return (result.length > 10) ?  <p>Too many matches, specify another filter</p>
      : (result.length > 1 && result.length < 10) ? <FoundCountries countries = {result}/>
      : (result.length === 1) ? <Country country={result[0]}/>
      : <p>Query not found</p>
    }
  }

  return (
    <div>
      find countries <input value={query} onChange={handleQueryChange}/>
      {runQuery(query)}
    </div>
  );
}

export default App;
