const Persons = ({ filterPersons }) => {
  return (
    <div>
      {filterPersons.map((person) => (
        <div key={person.id}>
          {person.name} : {person.number}
        </div>
      ))}
    </div>
  );
};

export default Persons;
