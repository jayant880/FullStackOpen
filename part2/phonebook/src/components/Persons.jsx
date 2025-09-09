import personsServices from "../services/personsServices";

const Persons = ({ filterPersons }) => {
  const handleDelete = (person) => {
    if (confirm("Confirm to delete", person.name))
      personsServices.deletePerson(person.id);
  };

  return (
    <div>
      {filterPersons.length > 0 &&
        filterPersons.map((person) => (
          <div key={person.id}>
            {person.name} : {person.number}
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default Persons;
