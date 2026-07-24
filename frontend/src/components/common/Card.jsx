import React from 'react';
import './Card.css';

const Card = ({ children, className = '', title, actions }) => {
  return (
    <div className={`premium-card ${className}`}>
      {(title || actions) && (
        <div className="premium-card-header">
          {title && <h3 className="premium-card-title">{title}</h3>}
          {actions && <div className="premium-card-actions">{actions}</div>}
        </div>
      )}
      <div className="premium-card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
