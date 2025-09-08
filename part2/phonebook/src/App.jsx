import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterPersons, setFilterPerson] = useState(persons);
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
  const handleFilterChange = (e) => {
    const name = e.target.value;
    setFilterName(name);
    const filterName = name.toLowerCase();
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterName)
    );
    setFilterPerson(filteredPersons);
  };
  return (
    <div>
      <h2>Phone book</h2>
      <div>
        Filter shown with{" "}
        <input
          name="filteredName"
          value={filterName}
          onChange={handleFilterChange}
        />
      </div>
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
      <h2>Numbers</h2>
      {filterPersons.map((person) => (
        <div key={person.id}>
          {person.name} : {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
