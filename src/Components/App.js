import './App.css';
// import Header from './Header';
// import Input from './Input';
import { useState } from "react";
import Search from './search/search.js';
import CurrentWeather from './current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api.js';
import Forecast from './forecast/forecast';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  // const [data, setData] = useState();
  // const [city, setCityWeather] = useState();

  // window.addEventListener("load", () => {
  //   navigator.geolocation.getCurrentPosition(positionFound, positionNotFound);
  //   async function positionFound(position) {
  //     const long = position.coords.longitude;
  //     const lat = position.coords.latitude;
  //     const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a295c4f759703a417a90170754552bff&units=metric`;
  //     // const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a295c4f759703a417a90170754552bff`;
  //     const response = await fetch(api);
  //     const data = await response.json();
  //     console.log(data)
  //     setData(data);
  //   }
  //   function positionNotFound(err) {
  //     console.log(err);
  //   }
  // });

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
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <div className="container">

      </div>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      {/* <Header />
      <p className='user-location-text'>Your location is {name}</p>
      <img src={icon} alt="weather icon" className='weather-icon' />
      <p className='temp-text'>Highest temperature is {tempMax.toString().substring(0, 5)} C</p>
      <p className='temp-text'>Lowest temperature is {tempMin.toString().substring(0, 5)} C</p>
      <p className='description-text'>Today there will be {description}</p>
      <p className='wind-speed'>The windspeed is {windSpeed} mph</p>
      <Input cityWeather={cityWeather} /> */}
    </div>
  );

}

export default App;
