import logo from './logo.svg';
import './App.css';
import cloud from "./assets/cloudy.jpg";
import drizzle from "./assets/drizzle.png";
import rain from "./assets/rain.jpg";
import searchicon from "./assets/search.png";
import snow from "./assets/snow.jpg";
import sun from "./assets/sun.jpg";
import {useEffect, useState} from "react";

const WeatherDetails=({icon,temp,city,country,lat,log,wind,humidity})=>{
  return(
<>
<div className='image'>
  <img src={icon} alt="image"/>
</div>
<div className='temp'>Temperature:{temp}C</div>
<div className="location">{city}</div>
<div className='country'>{country}</div>
<div className='cord'>
  <div className='lat'>Latitude:{lat}</div>
  <div className='log'>Longitude:{log}</div>
  </div>
    <div className='data-container'>
      <div className='element'>
        <img src={snow} alt="snow" className='icon'/>
        <div className='data'>
          <div className='humidity-percent'>{humidity}</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={snow} alt="snow" className='icon'/>
        <div className='data'>
          <div className='wind-percent'>{wind} km/hr</div>
          <div className='text'>wind speed</div>
        </div>
      </div>
</div>
</>
  );
};
function App() {
  
  let api_key="2bc8768b8d39e81fcb408eb7d1f555b5";
  const [icon,seticon]=useState(cloud);
 const [temp,settemp]=useState(0);
 const[city,setcity]=useState("");
 const[country,setcountry]=useState(""); 
 const[lat,setlat]=useState(0);
 const[log,setlog]=useState(0);
const[humidity,sethumidity]=useState(0);
const[wind,setwind]=useState(0);
const[text,settext]=useState("Madurai");
const[citynotfound,setcitynotfound]=useState(false);
const[loading,setloading]=useState(true);
const [error,seterror]=useState(null);
const weatherIconMap={
  "01d":sun,
  "01n":sun,
  "02d":cloud,
  "02n":cloud,
  "03d":drizzle,
  "03n":drizzle,
  "04d":drizzle,
  "04n":drizzle,
  "05d":rain,
  "05n":rain,
  "06d":rain,
  "06n":rain,
  "07d":snow,
  "07n":snow,
}
const search=async()=>{
  setloading(true);
 let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&unit=Metrics`; 
try{
  let res=await fetch(url);
  let data=await res.json();
  if(data.cod=="404")
  {
    console.log("city not found");
    setcitynotfound(true);
    setloading(false);
    return;
  }
 sethumidity(data.main.humidity);
 setwind(data.wind.speed);
 settemp(Math.floor(data.main.temp));
 setcity(data.name);
 setcountry(data.sys.country);
 setlat(data.coord.lat);
 setlog(data.coord.lon);
 const weatherIconCode=data.weather[0].icon;
 seticon(weatherIconMap[weatherIconCode] || sun);
 setcitynotfound(false);
}
catch(error){
console.error("error occured",error.meassage);
seterror("error occured");
}
finally{
  setloading(false);
}

};

function handleKeyDown(e)
{
  if(e.key=="Enter")
  {
    search();
  }
}
function HandleCity(e)
{
  settext(e.target.value);
}
useEffect(function(){
  search();
},[]);
 return (
   <>
    <div className="container">
     <div className="input-container">
      <input type="text" className="cityinput" onChange={HandleCity} value={text} onKeyDown={handleKeyDown} placeholder="SEARCH CITY"/>
      <div className="search-icon" onClick={search}>
        <img  src={searchicon} alt="search"/>
      </div>
     </div>

   {loading && <div className='loading-msg'>Loading...</div>}
   {error && <div className='loading-msg'>{error}</div>}
   {citynotfound && <div className='citynotfound'>Citynotfound</div>}
   {!loading  && !citynotfound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} wind={wind} humidity={humidity}/>}
    </div>
   </>
  );
}

export default App;
