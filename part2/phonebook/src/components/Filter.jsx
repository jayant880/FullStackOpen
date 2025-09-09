const Filter = ({ filterQuery, setFilterQuery }) => {
  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">Filter shown with:</label>
      <input
        id="filter"
        name="filter"
        value={filterQuery}
        onChange={handleFilterChange}
        placeholder="Search contacts..."
      />
    </div>
  );
};

export default Filter;
