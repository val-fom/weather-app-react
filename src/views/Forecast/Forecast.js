import React from 'react';
import './Forecast.css';
import ThreeHourForecast from './ThreeHourForecast';

const Forecast = ({ forecastResponse }) => {
  if (!forecastResponse) return <div className="forecast__container" />;

  return (
    <div className="forecast__container">
      <div className="forecast__wrapper">
        <div className="forecast__header">
          <span />
          <h2>24/3h forecast</h2>
          <span />
        </div>
        <div className="forecast">{forecastResponse.list.map(ThreeHourForecast)}</div>
      </div>
    </div>
  );
};

export default Forecast;
