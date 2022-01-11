import React,{ useState } from "react";



  const key = process.env.REACT_APP_API_KEY;
  const base = "https://api.openweathermap.org/data/2.5/";


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${base}weather?q=${query}&units=metric&APPID=${key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        
      });
    }
  }

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  return (
    <div className={(typeof weather.main != "undefined") ?
     ((weather.main.temp >16) ?
      "app warm" : "app") : "app"}>
    <main>
     <div className="search-box">
       <input 
       type="text" 
       className="search-bar" 
       placeholder="Search..."
       onChange={e => setQuery(e.target.value)}
       value={query}
       onKeyPress={search}
        />
     </div>
     {(typeof weather.main != "undefined") ? (
       <div>
       <div className="location-box">
       <div className="location">{weather.name}, {weather.sys.country}</div>
         <div className="date">{today.toLocaleDateString("en-US", options)}</div>
       </div>
      <div className="weather-box">
        <div className="temp">
          {Math.round(weather.main.temp)}°C
        </div>
        <div className="weather">{weather.weather[0].description}</div>
      </div>
       </div>
     ) : ('')}
     

     </main>
    </div>
  );
}

export default App;