const Filter = ({ persons, filterName, setFilterName, setFilterPersons }) => {
  const handleFilterChange = (e) => {
    const name = e.target.value;
    setFilterName(name);
    const filterName = name.toLowerCase();
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterName)
    );
    setFilterPersons(filteredPersons);
  };
  return (
    <>
      <div>
        Filter shown with{" "}
        <input
          name="filteredName"
          value={filterName}
          onChange={handleFilterChange}
        />
      </div>
    </>
  );
};

export default Filter;
