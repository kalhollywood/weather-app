import './App.css';
// import Header from './Header';
// import Input from './Input';
import { useState } from "react";
import Search from './search/search.js';
import CurrentWeather from './current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api.js';
import Forecast from './forecast/forecast';
import MapContainer from './Map';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const [lat, setLat] = useState()
  const [lon, setLon] = useState()

  // const [data, setData] = useState();
  // const [city, setCityWeather] = useState();

  window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(positionFound, positionNotFound);
    function positionFound(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setUserLocation({ lat: lat, lng: lng });
      setLocation({ lat: lat, lng: lng });
    }
    function positionNotFound(err) {
      console.log(err);
    }
  });
  console.log(lat, lon)

  const [location, setLocation] = useState({
    lat: 51.496681,
    lng: -0.050417,
  });

  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
  });

  // async function cityWeather(city) {

  //   // const api = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=a295c4f759703a417a90170754552bff`
  //   const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a295c4f759703a417a90170754552bff`
  //   const response = await fetch(api);
  //   // console.log(response)
  //   const data = await response.json()
  //   setCityWeather(data)
  //   setData(city);
  //   console.log(data);
  // }

  // useEffect(() => {
  //   setData(city);
  // }, [city]);

  // let tempMin = Number(data?.main.temp_min)
  // let tempMax = Number(data?.main.temp_max)

  // let description = data?.weather[0].description;
  // let icon = `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`;
  // let name = data?.name;
  // let windSpeed = data?.wind.speed;

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
        setLat(lat);
        setLon(lon);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <div className="container">
        <MapContainer
          centerObj={location}
          userLocation={userLocation} />

      </div>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}

    </div>
  );

}

export default App;
