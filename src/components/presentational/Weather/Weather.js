import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcons from '../WeatherIcons';

import './Weather.css';

const Weather = ({ weatherResponse, city }) => {
  if (!weatherResponse) return '';

  const temp = `${weatherResponse.main.temp.toFixed(0)}\xB0`;
  const { weather } = weatherResponse;

  return (
    <div className="weather">
      <h2 className="weather__city">{city}</h2>
      <div className="weather__icon">{weather.map(WeatherIcons)}</div>
      <div className="weather__temp">{temp}</div>
    </div>
  );
};

export default Weather;

Weather.propTypes = {
  weatherResponse: PropTypes.object,
  city: PropTypes.string.isRequired,
};

Weather.defaultProps = {
  weatherResponse: null,
};
