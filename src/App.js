import React, { useState, useEffect } from "react";
import CountryCard from "./components/countryCards";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.common &&
      country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="countryList"
      style={{
        display:"flex",
        flexWrap:"wrap",
        gap: "10px",
    }}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard name={country.common} flag={country.png} />
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
