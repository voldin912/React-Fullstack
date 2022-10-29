import { useState } from "react"

const Person = (props) => {
  const {name} = props
  return (
    <p>{name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState ([
    {name: "Arto Hellas"}
  ])
  const [newName, setNewName] = useState("")
  
  // Function handling name change in input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Function checking name existing in persons array
  const nameExisting = (name) => persons.some(person => person.name == name)

  // Function handling form submission
  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (nameExisting(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons,{name:newName}])
      setNewName("")  
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} />)}
    </div>
  );
}

export default App;
