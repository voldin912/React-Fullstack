import { useEffect, useState } from "react";
import personService from "../services/personService";
import { getTotalInfo } from "../services/phonebookInfo";

const Person = ({
  person,
  updateData,
  update,
  setVisible,
  setStatus,
  setMessage,
}) => {
  const handleDeletePerson = async (id) => {
    let status,
      message = "";
    try {
      const result = await personService.deletePerson(id);
      console.log("deleteResult", result);
      updateData(!update);
      status = "success";
      message = "Removing data successfully!";
    } catch (error) {
      status = "error";
      message = "Error with removing data";
      console.error("errorDeletingPerson", error);
    } finally {
      setStatus(status);
      setMessage(message);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  };

  return (
    <div>
      {person.name} {person.number}{" "}
      <button
        onClick={() => {
          if (window.confirm(`Delete ${person.name} ?`)) {
            handleDeletePerson(person.id);
          }
        }}
      >
        delete
      </button>
    </div>
  );
};

const PersonForm = ({
  persons,
  update,
  setUpdate,
  setVisible,
  setStatus,
  setMessage,
}) => {
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const addData = async (newPerson) => {
    let status,
      message = "";
    try {
      const result = await personService.addPerson(newPerson);
      setUpdate(!update);
      status = "success";
      message = "Adding data successfully!";
    } catch (error) {
      status = "error";
      message = `${error}`;
      console.log(error);
    } finally {
      setStatus(status);
      setMessage(message);
      setVisible(true); 
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  };
  const updateData = async (id, newPerson) => {
    let status,
      message = "";
    try {
      const result = await personService.updatePerson(id, newPerson);
      console.log("updated", result);
      setUpdate(!update);
      status = "success";
      message = "Updating data successfully!";
    } catch (error) {
      status = "error";
      message = "Error with updating data";
      throw new Error("errorUpdatingNewPerson", error);
    } finally {
      setStatus(status);
      setMessage(message);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  };
  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      if (newName.length !== 0 && phoneNumber !== 0) {
        const newPerson = { name: newName, number: phoneNumber };
        const findPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        if (findPerson) {
          if (
            window.confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            )
          ) {
            await updateData(findPerson.id, newPerson);
          }
        } else {
          await addData(newPerson);
        }
      }
    } catch (error) {
      console.error("formSubmissionError", error);
    } finally {
      setNewName("");
      setPhoneNumber("");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handlePhoneChange} value={phoneNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({
  persons,
  update,
  setUpdate,
  setVisible,
  setStatus,
  setMessage,
}) => {
  const [totalInfo, setTotalInfo] = useState("");

  const getInfo = async () => {
    try {
      const result = await getTotalInfo();
      setTotalInfo(result);
    } catch (error) {
      console.error("errorGettingTotalInfo", error);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      <p>{totalInfo}</p>
      {persons
        ? persons.map((person) => (
            <Person
              key={person.id}
              person={person}
              updateData={setUpdate}
              update={update}
              setVisible={setVisible}
              setStatus={setStatus}
              setMessage={setMessage}
            />
          ))
        : null}
    </div>
  );
};

export { PersonForm, Persons };
