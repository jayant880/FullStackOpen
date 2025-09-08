import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filterName, setFilterName] = useState("");
  const [filterPersons, setFilterPersons] = useState(persons);

  useEffect(() => {
    setFilterPersons(persons);
    setFilterName("");
  }, [persons]);

  return (
    <div>
      <h2>Phone book</h2>
      <Filter
        persons={persons}
        filterName={filterName}
        setFilterName={setFilterName}
        setFilterPersons={setFilterPersons}
      />
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} />
    </div>
  );
};

export default App;
