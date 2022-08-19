import React, { useState } from "react";

export default function Input({ setCityWeather }) {
  const [city, setCity] = useState("");


  function handleSubmit(e) {
    e.preventDefault()
    setCityWeather(city);
  };




  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            placeholder="Or search location here..."
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <button>Click here</button>
      </form>

    </div>
  );
}
