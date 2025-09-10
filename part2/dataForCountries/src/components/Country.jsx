const Country = ({ country }) => {
  return (
    <div>
      <>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital[0]}</div>
        <div>Area {country.area}</div>
        <h2>Language</h2>
        <ul>
          {Object.entries(country.languages).map(([code, name]) => (
            <li key={code}>
              {code} - {name}
            </li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </>
    </div>
  );
};

export default Country;
