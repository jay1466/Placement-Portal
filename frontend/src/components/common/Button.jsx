import React from 'react';
import './Button.css';

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false, fullWidth = false }) => {
  const classes = `premium-btn premium-btn-${variant} ${fullWidth ? 'full-width' : ''} ${className}`;
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
