import { useState } from "react";
import personsServices from "../services/personsServices";

const PersonForm = ({ persons, setPersons, setMessage, setError }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with the new one?`
        )
      ) {
        personsServices
          .updatePerson(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setError(false);
            setMessage(`${newName} phone number has been updated`);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            setError(true);
            setMessage(`Could not update ${newName}`);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personsServices
        .createPerson(newPerson)
        .then((createdPerson) => {
          setPersons([...persons, createdPerson]);
          setNewName("");
          setNewNumber("");
          setError(false);
          setMessage(`Added ${newName}`);
        })
        .catch((error) => {
          console.error("Error creating person:", error);
          setError(true);
          setMessage(`${error.response.data.error}`);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a new contact</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="number">Number:</label>
          <input
            type="text"
            id="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
