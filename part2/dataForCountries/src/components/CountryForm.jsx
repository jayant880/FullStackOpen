const CountryForm = ({ country, setCountry }) => {
  return (
    <div>
      <label>
        Find country:
        <input
          type="text"
          id="country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
    </div>
  );
};

export default CountryForm;
