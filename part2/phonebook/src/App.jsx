import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 1111111111 },
  ]);
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
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Phone book</h2>
      <form onSubmit={handleSubmit}>
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
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name} : {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
