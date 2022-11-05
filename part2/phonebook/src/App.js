import { useEffect, useState } from "react"
import axios from "axios"

// Filter component
const Filter = ({filterChangeMethod}) => {
  return (
    <div>
    filter shown with <input onChange={filterChangeMethod}/>
    </div>
  )
}

// Person component
const Person = (props) => {
  const {name,phone} = props
  return (
    <p>{name} {phone}</p>
  )
}

// PersonForm component
const PersonForm = (props) => {
  const {formSubmitMethod, nameChangeMethod, phoneChangeMethod, newName, phoneNumber} = props
  return (
    <form onSubmit={formSubmitMethod}>
        <div>
          name: <input onChange={nameChangeMethod} value = {newName}/>
        </div>
        <div>
          number: <input onChange={phoneChangeMethod} value={phoneNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({filterName, persons}) => {
  const filterNumberList = (filterName) => {
    if(filterName.length !== 0) {
      return persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    }
    return persons
  }
  return (
    filterNumberList(filterName).map(person => <Person key={person.id} name={person.name} phone={person.number}/>)
  )
}
// App component
const App = () => {
  const [persons, setPersons] = useState ([])
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [filterName, setFilterName] = useState("")
  const server_url = "http://localhost:3001/persons"

  useEffect(() => {
    axios
      .get(server_url)
      .then(response => {
        setPersons(response.data)
      })
  },[])

  // Function handling name change in input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  // Function handling phone change in input
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value)
  }
  // Function checking name existing in persons array
  const nameExisting = (name) => persons.some(person => person.name === name)

  // Function handling filterName change in input
  const handleNameFilter = (event) => {
    setFilterName(event.target.value)
  }
  // Function handling form submission
  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (nameExisting(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = {name:newName, number:phoneNumber,id:persons.length + 1}
      axios
        .post(server_url,newPersons)
        .then(response => {
          setPersons([...persons,response.data])
          setNewName("") 
          setPhoneNumber("") 
        })
    }
  }

  return (
    <div style = {{margin:"25px"}}>
      <h2>Phonebook</h2>
      <Filter filterChangeMethod={handleNameFilter} />
      <h2>add a new</h2>
      <PersonForm 
          formSubmitMethod = {handleFormSubmit}
          nameChangeMethod = {handleNameChange}
          phoneChangeMethod = {handlePhoneChange}
          newName =  {newName}
          phoneNumber =  {phoneNumber}/>
      <h2>Numbers</h2>
      <Persons filterName={filterName} persons={persons}/>
    </div>
  );
}

export default App;
