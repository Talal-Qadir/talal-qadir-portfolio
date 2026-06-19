import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
};

function ScrollReveal({
  children,
  variant = fadeUp,
  delay = 0,
  className = '',
  as = 'div',
  once = true,
  amount = 0.15,
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '-40px' }}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: { ...variant.visible.transition, delay },
        },
      }}
    >
      {children}
    </Component>
  );
}

export default ScrollReveal;
