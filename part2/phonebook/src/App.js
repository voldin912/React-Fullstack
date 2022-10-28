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
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleFormSubmit = (event) => {
    event.preventDefault()
    setPersons([...persons,{name:newName}])
  }

  return (
    <div style = {{margin:"25px"}}>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input onChange={handleNameChange}/>
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
