import { useEffect, useState } from "react";
import axios from "axios"

//  Country component that displays specific information of a country
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

// CountryListDisplay component that displays list of found countries from queries
const CountryListDisplay = ({country,clickListener}) => {
  return (
    <div>
      {country.name.common} <button style={{display:"inline-block"}} onClick={() => clickListener(country)}>Show</button>
    </div>
  )

}
// component that renders CountryListDisplay 
const FoundCountries = ({countries,handleShowButtonClick}) => {
  return (
    <ul>
      {countries.map(country => <CountryListDisplay key={country.name.official} country={country} clickListener={handleShowButtonClick}/>)}
    </ul>
  )
}

// Main app component
const App = () => {
  const [query, setQuery] = useState("")
  const [countries, setCountries] = useState([])
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }
  const handleShowButtonClick = (selectedCountry) => {
    setQuery(selectedCountry.name.common)
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
    if(countries.length !== 0 && query.length !== 0) {
      const result = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
      return (result.length > 10) ?  <p>Too many matches, specify another filter</p>
      : (result.length > 1 && result.length < 10) ? <FoundCountries countries = {result} handleShowButtonClick={handleShowButtonClick}/>
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
