import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

function Button({
  children,
  variant = 'primary',
  href,
  download,
  target,
  rel,
  className = '',
  icon: Icon,
  iconRight: IconRight,
  onClick,
  type = 'button',
  disabled = false,
}) {
  const classes = `ui-btn ui-btn--${variant} ${className}`.trim();

  const content = (
    <>
      {Icon && <Icon className="ui-btn__icon" />}
      <span>{children}</span>
      {IconRight && <IconRight className="ui-btn__icon ui-btn__icon--right" />}
      {variant === 'primary' && <span className="ui-btn__shine" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        download={download}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}

export default Button;
