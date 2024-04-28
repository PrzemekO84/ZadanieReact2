import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App1.css';
 
const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=50.2649&longitude=19.0238&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m');
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
 
    fetchData();
  }, []);
 
  if (loading) return <div>Ładowanie danych...</div>;
  if (error) return <div>Wystąpił błąd: {error.message}</div>;
 
  return (
    <div id="mainContainer">
      <h1>Aktualna pogoda dla Katowic</h1>
      {weatherData && (
        <div>
          <p>Temperatura: {weatherData.current.temperature_2m}°C</p>
          <p>Prędkość wiatru: {weatherData.current.wind_speed_10m} m/s</p>
        </div>
      )}
    </div>
  );
};
 
export default WeatherComponent;