import { useEffect, useState } from "react";
import personService from "../services/personService";

const Filter = ({ update, setPersons }) => {
  const [filterName, setFilterName] = useState("");
  const [originalPersonLists, setOriginalPersonLists] = useState([]);

  const getAllPersons = async () => {
    try {
      const result = await personService.getPersons();
      setOriginalPersonLists(result);
    } catch (error) {
      console.error("errorGettingAllPersons", error);
    }
  };

  useEffect(() => {
    getAllPersons();
  }, [update]);

  const handleNameFilter = (event) => {
    const requestName = event.target.value;
    setFilterName(requestName);
    if (requestName) {
      const filteredList = originalPersonLists.filter(
        (person) => person.name.toLowerCase() === requestName.toLowerCase()
      );
      filteredList?.length ? setPersons(filteredList) : setPersons(null);
    } else {
      setPersons(originalPersonLists);
    }
  };

  return (
    <div>
      filter shown with <input onChange={handleNameFilter} value={filterName} />
    </div>
  );
};

export default Filter;
