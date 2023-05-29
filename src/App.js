import React, { useEffect, useState } from "react";
import Description from "./components/description";
import "./style.css";
import { getFormattedData } from "./weatherAPI";
// import coldbg from './assets/Cold_bg.jpeg'

export default function App() {
  const [city, setCity] = useState("shimla");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedData(city, unit);
      setWeather(data);
      console.log(data);
    };

    fetchWeatherData();
  }, [unit,city]);

  const handleUnitBtnClick = (e) => {
    const btn = e.currentTarget;
    // console.log(btn)

    const currentUnit = btn.innerText.slice(1);
    const isUnitCelsius = currentUnit === "C";
    btn.innerText = isUnitCelsius ? "°F" : "°C";
    setUnit(isUnitCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City Name..."
              />
              <button onClick={(e) => handleUnitBtnClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather_icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  unit === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            {/* bottom desp */}
            <Description weather={weather} unit={unit} />
          </div>
        )}
      </div>
    </div>
  );
}
