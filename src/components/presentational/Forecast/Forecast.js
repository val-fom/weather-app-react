import React from 'react';
import PropTypes from 'prop-types';
import './Forecast.css';
import ThreeHourForecast from './ThreeHourForecast';

const Forecast = ({ forecastResponse }) => {
  if (!forecastResponse) return <div className="forecast__container" />;

  return (
    <div className="forecast__wrapper">
      <div className="forecast__header">
        <span />
        <h2>24/3h forecast</h2>
        <span />
      </div>
      <div className="forecast">
        {forecastResponse.list.map(ThreeHourForecast)}
      </div>
    </div>
  );
};

export default Forecast;

Forecast.propTypes = {
  forecastResponse: PropTypes.object,
};

Forecast.defaultProps = {
  forecastResponse: null,
};
