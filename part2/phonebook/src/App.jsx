import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phone book`);
      return;
    }
    const newPerson = { name: newName };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook </h2>
      <form onSubmit={handleSubmit}>
        <div>
          name :
          <input
            type="text"
            name="name"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
