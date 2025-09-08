import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterPersons, setFilterPersons] = useState(persons);

  useEffect(() => {
    setFilterPersons(persons);
    setFilterName("");
  }, [persons]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

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
