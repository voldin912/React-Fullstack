import { useState } from "react"

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
    filterNumberList(filterName).map(person => <Person key={person.name} name={person.name} phone={person.phone}/>)
  )
}
// App component
const App = () => {
  const [persons, setPersons] = useState ([
    {name: "Arto Hellas",phone:"040-1234567"}, 
    {name: "Ada Lovalace",phone:"045-6844579"},
    {name: "Dan Abramov", phone:"042-457896"},
    {name: "Mary Poppendieck", phone:"048-2667239"}
  ])
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [filterName, setFilterName] = useState("")
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
      setPersons([...persons,{name:newName,phone:phoneNumber}])
      setNewName("") 
      setPhoneNumber("") 
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
