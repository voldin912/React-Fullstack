import { useEffect, useState } from "react"
import axios from "axios"
import personService  from "./services/personService"
import {PersonForm,Persons} from "./personUI"
// Filter component
const Filter = ({filterChangeMethod}) => {
  return (
    <div>
    filter shown with <input onChange={filterChangeMethod}/>
    </div>
  )
}

const Notification = ({successMessage}) => {
  if (successMessage.length === 0) {
    return null
  }
  return (
    <div className="success">
      {successMessage}
    </div>
  )
}
// App component
const App = () => {
  const [persons, setPersons] = useState ([])
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [filterName, setFilterName] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
      personService.getPersons()
      .then(personList => {
        setPersons(personList)
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

  // Function handling filterName change in input
  const handleNameFilter = (event) => {
    setFilterName(event.target.value)
  }
  // Function handling form submission
  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (newName.length !== 0 && phoneNumber !== 0) {
      const newPerson = {name:newName, number:phoneNumber}
      const findPerson = persons.find(person => person.name === newName)
      // implementation of person if found in the list or not
      if (findPerson) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService.updatePerson(findPerson.id,newPerson)
          .then(updatedPerson => {
            // create a new person list, replace the findPerson with returned response of put http method
            const newPersonList = persons.concat()
            newPersonList.splice(persons.indexOf(findPerson),1,updatedPerson)
            setPersons(newPersonList)
            setNewName("") 
            setPhoneNumber("") 
          } )
        }
      } else {
        personService.addPerson(newPerson)
          .then(person => {
            setPersons([...persons,person])
            setNewName("") 
            setPhoneNumber("") 
            setSuccessMessage(`Added ${person.name}`)
            setTimeout(() => {setSuccessMessage("")},5000)
          })
      }

    }

  }
  // Function handling delete feature 
  const handleDeletePerson = (id) => {
    const newPersonListAfterDelete = persons.filter(person => person.id !== id)   
    personService.deletePerson(id)
    .then(result => {
      if(result.status = "200") {
        setPersons(newPersonListAfterDelete)
      }
    })

  }
  return (
    <div style = {{margin:"25px"}}>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage}/>
      <Filter filterChangeMethod={handleNameFilter} />
      <h2>add a new</h2>
      <PersonForm 
          formSubmitMethod = {handleFormSubmit}
          nameChangeMethod = {handleNameChange}
          phoneChangeMethod = {handlePhoneChange}
          newName =  {newName}
          phoneNumber =  {phoneNumber}/>
      <h2>Numbers</h2>
      <Persons filterName={filterName} persons={persons} deletePerson = {handleDeletePerson}/>
    </div>
  );
}

export default App;
