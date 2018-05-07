import React from 'react';
import './Units.css';

const Units = ({ units, handleClick }) => (
  <div className="units__container">
    <button
      onClick={handleClick}
      className="units__button button"
      title="change units"
    >
      {units === 'metric' ? 'C' : 'F'}
    </button>
  </div>
);

export default Units;
