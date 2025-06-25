import React from 'react';
import { motion } from 'framer-motion';
import { WiHumidity, WiStrongWind, WiSunrise, WiSunset } from 'react-icons/wi';
import { BsThermometerHalf, BsEye } from 'react-icons/bs';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
};

const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toUTCString().match(/(\d\d:\d\d)/)[0];
};

const WeatherDisplay = ({ data }) => {
  return (
    <motion.div className="weather-display" variants={itemVariants}>
      <div className="main-info">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="weather-icon"
        />
        <div className="temperature">{Math.round(data.main.temp)}<sup>°C</sup></div>
      </div>
      <p className="weather-description">{data.weather[0].description}</p>
      
      <div className="details-grid">
        <div className="detail-item">
          <BsThermometerHalf className="icon" />
          <span className="value">{Math.round(data.main.feels_like)}°C</span>
          <span className="label">Sensación</span>
        </div>
        <div className="detail-item">
          <WiHumidity className="icon" />
          <span className="value">{data.main.humidity}%</span>
          <span className="label">Humedad</span>
        </div>
        <div className="detail-item">
          <WiStrongWind className="icon" />
          <span className="value">{data.wind.speed.toFixed(1)} km/h</span>
          <span className="label">Viento</span>
        </div>
        <div className="detail-item">
          <BsEye className="icon" />
          <span className="value">{(data.visibility / 1000).toFixed(1)} km</span>
          <span className="label">Visibilidad</span>
        </div>
      </div>

      <div className="sunrise-sunset">
        <div className="detail-item">
          <WiSunrise className="icon" />
          <span className="value">{formatTime(data.sys.sunrise, data.timezone)}</span>
          <span className="label">Amanecer</span>
        </div>
        <div className="detail-item">
          <WiSunset className="icon" />
          <span className="value">{formatTime(data.sys.sunset, data.timezone)}</span>
          <span className="label">Atardecer</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;