import { useState } from "react"

const Person = (props) => {
  const {name,phone} = props
  return (
    <p>{name} {phone}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState ([
    {name: "Arto Hellas",phone:"040-1234567"}
  ])
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  // Function handling name change in input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value)
  }
  // Function checking name existing in persons array
  const nameExisting = (name) => persons.some(person => person.name == name)

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
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input onChange={handleNameChange} value = {newName}/>
        </div>
        <div>
          number: <input onChange={handlePhoneChange} value={phoneNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} phone={person.phone}/>)}
    </div>
  );
}

export default App;
