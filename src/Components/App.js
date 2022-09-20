import './App.css';
import { useState } from "react";
import Search from './search/search.js';
import CurrentWeather from './current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api.js';
import Forecast from './forecast/forecast';
import MapContainer from './Map';
import { useEffect } from 'react';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [location, setLocation] = useState({
    lat: 51.496681,
    lng: -0.050417,
  });
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
  });

  // The useEffect below uses navigator to obtain the users location (assuming they allow this to be shared) and passes the coordinates into a fetch request from OpenWeather API and down to the Google Maps component via the location useState so that it shows their location on the map and their current and forecasted weather data.

  useEffect(() => {
    window.addEventListener("load", () => {
      navigator.geolocation.getCurrentPosition(positionFound, positionNotFound);
      function positionFound(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        setLocation({ lat: lat, lng: lng });
        setUserLocation({ lat: lat, lng: lng });
        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`)
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`)
        Promise.all([currentWeatherFetch, forecastFetch])
          .then(async (response) => {
            const weatherResponse = await response[0].json()
            const forecastResponse = await response[1].json()

            setCurrentWeather({ city: "Your location", ...weatherResponse });
            setForecast({ ...forecastResponse });
          })

      }
      function positionNotFound(err) {
        console.log(err);
      }
    });
  }, [location]);


  // This function below takes the users search input selection and pulls out the latitude and longitude of the city selected and feeds it into a fetch request from the OpenWeather API then uses the various useStates to set the Google Maps to the appropriate location and display that cities current and forecasted weather.

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setLocation({ lat: Number(lat), lng: Number(lon) });
        setUserLocation({ lat: Number(lat), lng: Number(lon) });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <h1>Weather.app</h1>
      <div className="container">
        {/* The map container passes down either the users location or the location of the city they have searched for. */}
        <MapContainer
          centerObj={location}
          userLocation={userLocation} />

      </div>
      <Search class="search" onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}

    </div>
  );

}

export default App;
