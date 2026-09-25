// src/components/AnimatedCard.jsx

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({
  children,
  index = 0,
  delay = 0.1,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: index * delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;