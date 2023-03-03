import { useRef, useState } from "react";

const Filter = ({ persons, setPersons }) => {
  const [filterName, setFilterName] = useState("");
  const originalPersonsDeepCopy = useRef(persons && JSON.parse(JSON.stringify(persons)))

  const handleNameFilter = (event) => {
    const requestName = event.target.value;
    setFilterName(requestName);
    if (requestName) {
      const filteredList = persons.filter(
        (person) => person.name.toLowerCase() === requestName.toLowerCase()
      );
      filteredList.length
        ? setPersons(filteredList)
        : setPersons(originalPersonsDeepCopy.current);
    }
  };

  return (
    <div>
      filter shown with <input onChange={handleNameFilter} value={filterName} />
    </div>
  );
};

export default Filter;
