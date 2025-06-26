import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Fondo.css'; // Crearemos este archivo CSS a continuación
const backgroundVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } },
};

const WeatherBackground = ({ weatherCondition }) => {
  return (
    <div className="background-container">
      <AnimatePresence>
        <motion.div
          key={weatherCondition}
          className={`background-gradient ${weatherCondition}`}
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </AnimatePresence>
      
      <AnimatePresence>
        {weatherCondition === 'clear' && (
          <motion.div key="stars" className="stars" variants={backgroundVariants} initial="initial" animate="animate" exit="exit" />
        )}
        {weatherCondition === 'clouds' && (
          <motion.div key="clouds" variants={backgroundVariants} initial="initial" animate="animate" exit="exit">
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
          </motion.div>
        )}
        {(weatherCondition === 'rain' || weatherCondition === 'thunderstorm' || weatherCondition === 'drizzle') && (
          <motion.div key="rain" className="rain" variants={backgroundVariants} initial="initial" animate="animate" exit="exit" />
        )}
        {weatherCondition === 'snow' && (
          <motion.div key="snow" className="snow" variants={backgroundVariants} initial="initial" animate="animate" exit="exit" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherBackground;