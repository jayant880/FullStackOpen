import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personsServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personData = await personService.getAllPersons();
        setPersons(personData);
      } catch (error) {
        console.error("Error Fetching persons :", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filterQuery) {
      const query = filterQuery.toLowerCase().trim();
      const filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(query)
      );
      setFilteredPersons(filtered);
    } else {
      setFilteredPersons(persons);
    }
  }, [filterQuery, persons]);

  return (
    <div>
      <h2>Phone book</h2>
      <Filter filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons
        persons={filterQuery ? filteredPersons : persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
