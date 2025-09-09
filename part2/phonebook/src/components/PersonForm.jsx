import { useState } from "react";
import personsServices from "../services/personsServices";

const PersonForm = ({ persons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phone book`);
      return;
    }
    if (newName.trim() === "" || newNumber.trim() === "") {
      alert("name and number both are required");
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personsServices.createPerson(newPerson);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>add a new</h2>
        <div>
          name :
          <input
            type="text"
            name="name"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div>
          number :
          <input
            type="text"
            name="number"
            id="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
