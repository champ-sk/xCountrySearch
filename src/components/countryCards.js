import React from "react";

function CountryCard({ name, flag }) {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid gray",
        borderRadius: "10px",
        width: "250px",
        height: "250px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <img
        src={flag}
        alt={`Flag of ${name}`}
        style={{ width: "100px", height: "100px", marginBottom: "10px" }}
      />
      <h2 style={{ fontSize: "18px", margin: "0" }}>{name}</h2>
    </div>
  );
}

export default CountryCard;
