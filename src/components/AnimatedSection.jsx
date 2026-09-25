// src/components/AnimatedSection.jsx

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({
  children,
  delay = 0,
  duration = 0.7,
  direction = 'up',
  className = '',
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    none: { y: 0, x: 0 },
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;