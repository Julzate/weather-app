import React, { useState } from "react";
import axios from "axios";
import search from "./assets/search2.png"

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const [image, setImage] = useState("")
  


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=imperial`  
  const icon = `http://openweathermap.org/img/wn/${image}@2x.png`

  const searchLocation = (e) => {
    /* when the user presses enter key */
    if (e.key === "Enter") {
      axios.get(url).then(response => {
        setData(response.data) 
        setImage(response.data.weather[0].icon)
        console.log(response.data)
        console.log(response.data.weather[0].icon)  
      })
      /* to clear the input */      
    setLocation("")
    }
  }

  const changheUnitsCelsius = () => {
    const farenheitTemp = data.main.temp.toFixed();
    const celsius = ((farenheitTemp-32) * 5/9).toFixed();
     document.querySelector("h1").innerHTML = (celsius + "°C");
    console.log(celsius)
 
  }

  const changheUnitsFarenheit = () => {
    const farenheitTemp= data.main.temp.toFixed()
    document.querySelector("h1").innerHTML = (farenheitTemp + "°F")
  }

  return (
    <div className="app">
      <div className="search-container">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        <img src={search} alt="search" className="search-icon"></img>
      </div>
      </div>
      
      <div className="container">
        {data.name !== undefined && <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <h2>{data.weather[0].main}</h2> : null}   
            {data.weather ? <img src= {icon} alt="icon" className="icon"/> : null}         
       </div>
        </div>}
        {data.name !== undefined && (
          <div className="bottom">
            <div className="weather-description">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
           
          </div>
          </div>
            <button onClick={changheUnitsCelsius}>Celsius</button>
            <button onClick={changheUnitsFarenheit}>Farenheit</button>
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
