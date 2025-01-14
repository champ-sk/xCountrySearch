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
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={flag}
        alt={`The name of flag is +${name}`}
        style={{ width: "100px", height: "100px" }}
      />
      <h2>{name}</h2>
    </div>
  );
}

export default CountryCard;
