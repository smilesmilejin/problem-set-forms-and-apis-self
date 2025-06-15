import './App.css';
import SearchForm from './components/SearchForm.jsx';
import axios from 'axios';
import { useState } from 'react';
import SearchHistoryList from './components/SearchHistoryList.jsx';

function App() {
  const [location, setLocation] = useState('');
  const [lon, setLon]= useState('');
  const [lat, setLat]= useState('');
  const [alertErrorMessage, setAlertErrorMessage]= useState('');
  const [errorMessage, setErrorMessage]= useState('');
  const [errorBoxStyle, setErrorBoxStyle]= useState('');
  const [searchHistoryList, setSearchHistoryList] = useState([]);

  // searchHistory:
  // [
  //   {
  //     location: null,
  //     latitude: null, 
  //     longitude:null, 

  //   }
  // ]
  const updateSearchHistory = (location, lat, lon) => {
    const newHistory = {'location': location, 'latitude': lat, 'longitude': lon};
    // Create a new copy and add the object
    const updatedHistory = [...searchHistoryList, newHistory];
    setSearchHistoryList(updatedHistory);
  };


  const getLocationLonLat = (location) => {
    console.log('## in getLocationLonLat');
    console.log(location);
    const locationGetUrl = import.meta.env.VITE_BASE_URL;
    console.log('Base URL:', locationGetUrl);
    const APIKey = import.meta.env.VITE_API_KEY;
    // console.log('APIKey:', APIKey);

    setAlertErrorMessage('');
    setErrorMessage('');

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
      
      setLocation(location);
      setLat(lat);
      setLon(lon);
      setErrorBoxStyle('');

      updateSearchHistory(location, lat, lon); // need to pass paramter, becaseu react is async, if this func is using state, it is not updated yet
      // console.log(searchHistoryList);
      return {lat,lon};

    })
    .catch((error) => {
      console.log('error in findCityLatAndLon!');
      console.log(error);        
      console.log(error.response.data); // {error: 'Unable to geocode'}
      console.log(error.response.data.error); //Unable to geocode'

      // setLocation('');
      setAlertErrorMessage('Uh oh! Error!');
      setErrorMessage(error.response.data.error);
      setLocation('');
      setLat('');
      setLon('');

      const errorMessage = error.response.data.error;

      setErrorBoxStyle('error-box');

      console.log('####### HistoryList',searchHistoryList);

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
      <div id="error" className={errorBoxStyle}>
        <p>{alertErrorMessage}</p>
        <p>{errorMessage}</p>
      </div>
      <SearchHistoryList searchHistoryList={searchHistoryList}/>
    </div>
  );
}

export default App;
