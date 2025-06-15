import './App.css';
import SearchForm from './components/SearchForm.jsx';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [location, setLocation] = useState('');
  const [lon, setLon]= useState('');
  const [lat, setLat]= useState('');


  const getLocationLonLat = (location) => {
    console.log('## in getLocationLonLat');
    console.log(location);
    const locationGetUrl = import.meta.env.VITE_BASE_URL;
    console.log('Base URL:', locationGetUrl);
    const APIKey = import.meta.env.VITE_API_KEY;
    // console.log('APIKey:', APIKey);

    setLocation(location);

    let lat, lon;
    return axios.get(locationGetUrl, {
      params: {
        q: location,
        key: APIKey,
        format: 'json',
      }
    })
    .then ((response) => {
      lat = response.data[0].lat;
      lon = response.data[0].lon;

      console.log('success in findCityLatAndLon', lat, lon);

      setLat(lat);
      setLon(lon);
      return {lat,lon};

    })
    .catch((error) => {
      console.log('error in findCityLatAndLon!');
      console.log(error);        
      console.log(error.response.data); // {error: 'Unable to geocode'}
      console.log(error.response.data.error); 
      const errorMessage = error.response.data.error;
      return errorMessage; // Unable to geocode

    });

  };

  return (
    <div>
      <h1>Get Latitude and Longitute</h1>
      <SearchForm onGetLocationLonLat={getLocationLonLat}/>
      <h2>Results for: {location}</h2>
      <ul>
        <li>Latitude: {lat} </li>
        <li>Longitude: {lon}</li>
      </ul>
    </div>
  );
}

export default App;
