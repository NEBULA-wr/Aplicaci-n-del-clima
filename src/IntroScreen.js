import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const IntroScreen = () => {
  return (
    <motion.div
      className="intro-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <FiMapPin className="intro-icon" />
      </motion.div>
      <motion.h1 variants={itemVariants}>Weather Explorer</motion.h1>
      <motion.p variants={itemVariants}>
        Descubre el clima, la historia y la belleza de cualquier ciudad del mundo.
      </motion.p>
    </motion.div>
  );
};

export default IntroScreen;