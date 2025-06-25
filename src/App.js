import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

import WeatherBackground from './WeatherBackground';
import IntroScreen from './IntroScreen';
import WeatherDisplay from './WeatherDisplay';
import CityInfo from './CityInfo';

import './App.css';

function App() {
  // --- CLAVES API ---
  const weatherApiKey = 'cff161dccd40f143e670fdd09b8851a1'; // Tu clave de OpenWeatherMap
  const pexelsApiKey = 'yzen7c3iP0udo1TWcGqAXd3BLEn8hpm646V4iqrNaxCVMwMfrZuJJvLU'; // <-- ¡Pega tu clave de Pexels aquí!

  // --- ESTADOS ---
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialState, setIsInitialState] = useState(true);

  // --- FUNCIÓN PRINCIPAL DE BÚSQUEDA ---
  const fetchAllData = async (e) => {
    e.preventDefault();
    if (!city) {
      setError("Por favor, introduce una ciudad.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setIsInitialState(false);
    
    try {
      const weatherPromise = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=es`);
      const pexelsPromise = fetch(`https://api.pexels.com/v1/search?query=${city}&per_page=1`, { headers: { Authorization: pexelsApiKey } });
      const wikipediaPromise = fetch(`https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&redirects=1&titles=${encodeURIComponent(city)}&origin=*`);

      const [weatherResponse, pexelsResponse, wikipediaResponse] = await Promise.all([weatherPromise, pexelsPromise, wikipediaPromise]);

      // Procesar Clima
      if (!weatherResponse.ok) throw new Error('Ciudad no encontrada o error de clima.');
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);
      
      // Procesar Imagen de Pexels
      const pexelsResult = await pexelsResponse.json();
      const imageUrl = pexelsResult.photos && pexelsResult.photos.length > 0 ? pexelsResult.photos[0].src.large : null;

      // Procesar Descripción de Wikipedia
      const wikipediaResult = await wikipediaResponse.json();
      const pages = wikipediaResult.query.pages;
      const pageId = Object.keys(pages)[0];
      const description = pageId !== "-1" ? pages[pageId].extract : "No se pudo encontrar una descripción para esta ciudad.";

      setCityInfo({ imageUrl, description });

    } catch (err) {
      setError(err.message || 'Ocurrió un error al buscar los datos.');
      setWeatherData(null);
      setCityInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  // --- LÓGICA DEL FONDO ---
  const getWeatherCondition = (weather) => {
    if (!weather) return 'default';
    const id = weather.id;
    if (id >= 200 && id < 300) return 'thunderstorm';
    if (id >= 300 && id < 600) return 'rain';
    if (id >= 600 && id < 700) return 'snow';
    if (id >= 700 && id < 800) return 'atmosphere';
    if (id === 800) return 'clear';
    if (id > 800) return 'clouds';
    return 'default';
  };

  const weatherCondition = weatherData ? getWeatherCondition(weatherData.weather[0]) : 'default';

  return (
    <div className="weather-app">
      <WeatherBackground weatherCondition={weatherCondition} />
      
      {!isInitialState && (
        <div className="search-form-container">
          <form onSubmit={fetchAllData} className="search-form">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Introduce otra ciudad..." className="search-input" />
            <button type="submit" className="search-button" disabled={isLoading}><FiSearch /></button>
          </form>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        {isInitialState ? (
          <IntroScreen key="intro" />
        ) : isLoading ? (
          <motion.div key="loading" className="status-message">Cargando datos...</motion.div>
        ) : error ? (
          <motion.div key="error" className="status-message">{error}</motion.div>
        ) : weatherData && (
          <motion.div key="results" className="app-layout">
            <WeatherDisplay data={weatherData} />
            <CityInfo name={weatherData.name} info={cityInfo} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {isInitialState && (
        <div className="search-form-container" style={{ position: 'absolute', bottom: '10%' }}>
          <form onSubmit={fetchAllData} className="search-form">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Introduce una ciudad para empezar..." className="search-input" />
            <button type="submit" className="search-button" disabled={isLoading}><FiSearch /></button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;