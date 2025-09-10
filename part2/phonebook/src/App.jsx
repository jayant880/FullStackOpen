import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personsServices";
import NotificationBanner from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personData = await personService.getAllPersons();
        setPersons(personData);
        setError(false);
        setMessage("All data has been fetched");
      } catch (error) {
        console.error("Error Fetching persons :", error);
        setError(true);
        setMessage("Error while getting data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      setError(null);
    }, 2000);
  }, [error]);

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
      <NotificationBanner message={message} error={error} />
      <Filter filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setError={setError}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filterQuery ? filteredPersons : persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setError={setError}
      />
    </div>
  );
};

export default App;
