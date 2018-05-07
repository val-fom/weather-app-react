import React from 'react';
import PropTypes from 'prop-types';
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

Units.propTypes = {
  units: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
