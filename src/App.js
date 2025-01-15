import React, { useState, useEffect } from "react";
import CountryCard from "./components/countryCards";


function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Allow request cancellation
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch country data. Please try again later.");
      });

    return () => controller.abort(); // Cleanup on component unmount
  }, []);

  const filteredCountries = countries.filter((country) =>
    country?.common?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: "20px", padding: "10px", fontSize: "16px" }}
      />
      <div
        className="countryList"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {error ? (
          <p className="error">{error}</p>
        ) : filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard
              key={country.common}
              className="countryCard"
              name={country.common}
              flag={country.png}
            />
          ))
        ) : (
          <p className="noResults">No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
