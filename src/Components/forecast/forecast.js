import './forecast.css';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const Forecast = ({ data }) => {

  // This code gets the current day of the week and then slices the week days array start the forecast from this point forwards and then concatenates the following week days to the end so that it shows the next 7 days from today.
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))


  return (
    <div className='forecast-container'>
      <label className="title">7 Day Forecast</label>
      <p className='tap-text'>Click/tap for more details</p>

      {/* As with current weather this component takes in the OpenWeather API data and maps through the first 7 forecast objects to obtain the details for the forecasted weather to render in each accordion item. */}

      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className='daily-item'>
                  <img alt="weather" className='icon-small' src={`icons/${item.weather[0].icon}.png`} />
                  <label className="day" >{forecastDays[idx]}</label>
                  <label className="description" >{item.weather[0].description}</label>
                  <label className="min-max" >{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className='daily-details-grid'>
                <div className='daily-details-grid-item'>
                  <label className="">Pressure</label>
                  <label className="">{item.main.pressure} hPa</label>
                </div>

                <div className='daily-details-grid-item'>
                  <label className="">Humidity</label>
                  <label className="">{item.main.humidity}%</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label className="">Clouds</label>
                  <label className="">{item.clouds.all}%</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label className="">Wind Speed</label>
                  <label className="">{item.wind.speed} m/s</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label className="">Sea Level</label>
                  <label className="">{item.main.sea_level} m</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label className="">Feels like</label>
                  <label className="">{Math.round(item.main.feels_like)}°C</label>
                </div>

              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Forecast;