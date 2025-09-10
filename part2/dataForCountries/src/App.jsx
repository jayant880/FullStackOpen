import { useEffect, useState } from "react";
import countriesServices from "./services/countriesServices";
import CountryForm from "./components/CountryForm";
import Country from "./components/Country";

const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await countriesServices.getAllCountries();
        setCountries(countriesData);
        setFilteredCountries(countriesData);
      } catch (error) {
        console.error("Error when getting countries", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const matchedCountries = countries.filter((cou) =>
      cou.name.common.toLowerCase().includes(country.toLowerCase())
    );
    setFilteredCountries(matchedCountries);
  }, [country, countries]);

  return (
    <div>
      <CountryForm country={country} setCountry={setCountry} />
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <>
            <Country country={filteredCountries[0]} />
          </>
        ) : (
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              <>{country.name.common}</>
              <button onClick={() => setCountry(country.name.common)}>
                Show
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
