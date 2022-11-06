// Person component
const Person = (props) => {
    const {person,deletePerson} = props
    return (
      <div>{person.name} {person.number} <button onClick={()=> {
        if(window.confirm(`Delete ${person.name} ?`)) {
          deletePerson(person.id)
        }
      }}>delete</button>
      </div>
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

// Persons component displaying list of person based on filterName
const Persons = ({filterName, persons, deletePerson}) => {
  const filterNumberList = (filterName) => {
    if(filterName.length !== 0) {
      return persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    }
    return persons
  }
  return (
    filterNumberList(filterName).map(person => 
    <Person 
      key={person.id} 
      person={person} 
      deletePerson={deletePerson}/>)
  )
}

export {
    PersonForm,
    Persons
};