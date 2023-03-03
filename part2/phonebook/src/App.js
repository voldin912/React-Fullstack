import { useEffect, useState } from "react";
import personService from "./services/personService";
import { PersonForm, Persons } from "./components/PersonUI";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [update, setUpdate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const getAllPersons = async () => {
    try {
      const result = await personService.getPersons();
      setPersons(result);
    } catch (error) {
      console.error("errorGettingAllPersons", error);
    }
  };

  useEffect(() => {
    getAllPersons();
  }, [update]);

  return (
    <div
      style={{
        margin: "25px",
      }}
    >
      {visible && <Notification status={status} message={message} />}

      <h2>Phonebook</h2>
      <Filter persons={persons} setPersons={setPersons} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        update={update}
        setUpdate={setUpdate}
        setVisible={setVisible}
        setStatus={setStatus}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      <Persons 
      persons={persons} 
      update={update} 
      setUpdate={setUpdate} 
      setVisible={setVisible}
      setStatus={setStatus}
      setMessage={setMessage} 
      />
    </div>
  );
};

export default App;
