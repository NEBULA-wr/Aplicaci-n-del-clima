import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
};

const CityInfo = ({ name, info }) => {
  if (!info || !info.imageUrl) {
    return (
      <motion.div className="city-info-card placeholder" variants={itemVariants}>
          <h3>{name}</h3>
          <p>No se encontró información adicional para esta ciudad.</p>
      </motion.div>
    );
  }

  return (
    <motion.div className="city-info-card" variants={itemVariants}>
      <img src={info.imageUrl} alt={`Fotografía de ${name}`} className="city-image" />
      <div className="city-text">
        <h3>{name}</h3>
        <p>{info.description || "No se encontró una descripción."}</p>
      </div>
    </motion.div>
  );
};

export default CityInfo;