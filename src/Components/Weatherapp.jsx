import React, { useState, useEffect } from "react";
import "./Weatherapp.css" ;
import search_icon from "./Assests/search.png";
import cloud_icon from "./Assests/cloud.png";
import clear_icon from "./Assests/clear.png";
import drizzle_icon from "./Assests/drizzle.png";
import humidity_icon from "./Assests/humidity.png";
import rain_icon from "./Assests/rain.png";
import snow_icon from "./Assests/snow.png";
import wind_icon from "./Assests/wind.png";
const Weatherapp = () => {
    
    let api_key = "3744a5d53b819c289dba9ab28d1b8942";
    const [weatherIcon, setWicon] = React.useState(cloud_icon);
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [country, setCountry] = useState("");


    useEffect(() => {
        // Get user's current location when component mounts
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${api_key}`;
                const response = await fetch(url);
                const data = await response.json();
                setWeatherData(data);
                setCountry(data.sys.country);
                setWicon(getWeatherIcon(data.weather[0].icon));
                // Update weather icon based on weather condition...
                // Handle other weather data...
            },
            (error) => {
                console.error("Error getting user's location:", error);
                // Handle error (e.g., display error message to user)
            }
        );
    }, []);

    const Search = async () => {

        const element = document.getElementsByClassName("cityinput")
        if(element[0].value===""){
            return 0;
        }


        let url= `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url) ;
        let data = await response.json();
        setCountry(data.sys.country);
        setWicon(getWeatherIcon(data.weather[0].icon));
        const humidity = document.getElementsByClassName("humidity");
        const wind = document.getElementsByClassName("Wind");
        const temprature = document.getElementsByClassName("temp");
        const location = document.getElementsByClassName("location");

        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = data.wind.speed+"km/hr";
        temprature[0].innerHTML = data.main.temp+"°C";
        location[0].innerHTML = data.name;
        
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            Search();
        };

    };
    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                return cloud_icon;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            case "50d":
            case "50n":
                return drizzle_icon;
            default:
                return cloud_icon;
        }
    }

return(
    <div className="container" >

        <h1>Weatherapp</h1>
        <div className="topbar">
            <input type="text" className="cityinput" placeholder="Search City or Town" value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress} />
            <div className="searchicon" onClick={() =>{Search()}}>
                <img src={search_icon} alt="search icon" srcset="" />
            </div>
        </div>
        <div className="weatherimage">
            <img src={weatherIcon} alt="" />
        </div>
        {weatherData && (
                <div className="weather-info">
                    <div className="temp">{weatherData.main.temp}°C</div>
                    <div className="location">{weatherData.name}</div>
                    <div className="country">{country}</div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidity_icon} alt="Humidity icon" className="icon" />
                            <div className="data">
                                <div className="humidity">{weatherData.main.humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={wind_icon} alt="Wind icon" className="icon" />
                            <div className="data">
                                <div className="Wind">{weatherData.wind.speed} km/hr</div>
                                <div className="text">Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </div>
)
}


export default Weatherapp;