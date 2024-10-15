import React, { useState } from 'react'
import './Weather.css'

const api = {
    key: "7bb068e475d5d8982ba1e3e6879439d8",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {

    const [query,setQuery] = useState('');
    const [weather,setWeather] = useState({});

    const search = evt => {
        if(evt.key == 'Enter'){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then((res) => {
                if (!res.ok) {
                  throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                return res.json(); 
              })
              .then((result) => {
                setWeather(result);
                setQuery('');
                console.log(result);
              })
              .catch((err) => {
                console.error('Fetch error:', err);
              });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January","February","March","April","May","June","July","September","October","November","December"];
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}` 
    }

  return (
    <div>
      <main>
        <div class-name="search-box">
            <input type='text' className='search-bar' placeholder='Search' value={query} onChange={e=>setQuery(e.target.value)} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined")?(
            <div>
            <div className='location-box'>
                <div className='location'>
                    {weather.name},{weather.sys.country}
                </div>
                <div className='date'>
                    {dateBuilder(new Date())}
                </div>
            </div>
            <div className='weather-box'>
                <div className='temp'>
                    {Math.round(weather.main.temp)}°C
                </div>
            </div>
            <div className='weather'>
                {weather.weather[0].main}
            </div>
        </div>
        ) : (' ')}
        
      </main>
    </div>
  )
}

export default Weather
