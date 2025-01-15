import React, { useState, useEffect } from "react";
import CountryCard from "./components/countryCards";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Create a controller
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries",
          { signal }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data:", err);
          setError("Failed to fetch country data. Please try again later.");
        }
      }
    };

    fetchData();

    // Cleanup: Abort the request if the component unmounts
    return () => {
      controller.abort();
    };
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
