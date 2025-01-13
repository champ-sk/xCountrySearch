import React, { useEffect, useState } from "react";

function CountryCard({ name, flag }) {
  return (
    <div className="countryCard"
      style={{
        display: "flex",
        border: "1px solid gray",
        borderRadius: "10px",
        width: "250px",
        height: "250px",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={flag}
        alt={`Flag of ${name}`}
        style={{ width: "100px", height: "100px" }}
      />
      <h2>{name}</h2>
    </div>
  );
}

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchCountries();
  }, []);
  const fetchCountries = async () => {
    const data = await fetch(
      "https://xcountries-backend.azurewebsites.net/all"
    );
    const json = await data.json();

    setCountries(json);
    console.log(countries);
  };
  const filtercountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filtercountries);
  return (
    <div>
      <input
        type="text"
        placeholder="search for countries"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          fontSize: "16px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {filtercountries.map((country) => (
          <CountryCard
            key={country.name}
            name={country.name}
            flag={country.flag}
          />
        ))}
      </div>
    </div>
  );
};

export default Countries;
