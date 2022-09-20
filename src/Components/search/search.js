import { AsyncPaginate } from 'react-select-async-paginate';
import { useState } from 'react';
import { GEO_API_URL, geoApiOptions } from '../../api';
import './search.css';



const Search = ({ onSearchChange }) => {

  const [search, setSearch] = useState(null)

  // This function runs a search on the Geo DB Cities API based on the user input and fetches any cities that contain the search parameter and pulls out the name, country code, latitude and longitude to make it available on App.js for the current weather, forecast and Google maps fetches.
  const loadOptions = async (inputValue) => {
    return await fetch(`${GEO_API_URL}/cities?minPopulation=5000&namePrefix=${inputValue}`, geoApiOptions)
      .then(response => response.json())
      .then(response => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }
          })
        }
      })
      .catch(err => console.error(err));
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  return (
    <div className="search-container">

      <AsyncPaginate
        className='search'
        placeholder="Search for city"
        debounceTimeout={600} // Gives the user time to type more letters before searching
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>

  );
}

export default Search;