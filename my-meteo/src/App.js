import React, { useState } from 'react'
import'../src/App.css'
import axios from 'axios'
import { Icon } from '@iconify/react';



function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  // Construction de l'URL de l'API OpenWeatherMap en utilisant l'emplacement saisi par l'utilisateur
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f754950ffc5d66b66c09b1c3af302c1b`;

  // Fonction pour rechercher les données météorologiques lorsque l'utilisateur appuie sur la touche "Enter"
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      // Envoi d'une requête GET à l'API OpenWeatherMap avec l'URL construite
      axios.get(url)
      // Mise à jour de l'état 'data' avec les données météorologiques reçues
      .then((response) => { setData(response.data);
        // Affichage des données météorologiques dans la console
        console.log(response.data);
      })
      // Réinitialisation de la valeur de l'emplacement à une chaîne vide
      setLocation('');
    }
  }

  return (
    <div className="app">

        <div className='titre'>
          <h1>My Meteo <Icon icon="noto:sun-behind-rain-cloud" color="yellow" width="50" /></h1>
        </div>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Entrer la localisation'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          <div className="temp">
            {data.main ? <h3>{data.main.temp.toFixed()}°F</h3> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;