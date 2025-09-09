import personsServices from "../services/personsServices";

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsServices
        .deletePerson(personToDelete.id)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          alert(
            `Could not delete ${personToDelete.name}. They might have already been removed.`
          );
          personsServices
            .getAllPersons()
            .then((updatedPersons) => setPersons(updatedPersons))
            .catch((err) => console.error("Error fetching updated list:", err));
        });
    }
  };

  return (
    <div>
      {persons.length > 0 ? (
        persons.map((person) => (
          <div key={person.id}>
            {person.name}: {person.number}
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        ))
      ) : (
        <p>No contacts to display</p>
      )}
    </div>
  );
};

export default Persons;
