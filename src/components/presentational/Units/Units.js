import React from 'react';
import PropTypes from 'prop-types';
import './Units.css';

const Units = ({ units, toggleUnits }) => (
  <div className="units__container">
    <button
      onClick={toggleUnits}
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
  toggleUnits: PropTypes.func.isRequired,
};
