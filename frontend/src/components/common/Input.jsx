import React from 'react';
import './Input.css';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false, error, className = '' }) => {
  return (
    <div className={`premium-input-group ${className}`}>
      {label && <label className="premium-label">{label} {required && <span className="required">*</span>}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`premium-input ${error ? 'input-error' : ''}`}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
