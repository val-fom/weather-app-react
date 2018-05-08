import React from 'react';
import PropTypes from 'prop-types';
import './ThreeHourForecast.css';
import WeatherIcons from '../WeatherIcons';
import { getHours } from '../../../utils';

const ThreeHourForecast = ({ dt, main, weather }) => {
  const hours = getHours(dt);
  const temp = `${main.temp.toFixed(0)}\xB0`;

  return (
    <article className="threeHourForecast" key={dt}>
      <h4 className="threeHourForecast__time" data-time>
        {hours}
      </h4>
      <div className="threeHourForecast__icon" data-icon>
        {weather.map(WeatherIcons)}
      </div>
      <div className="threeHourForecast__temp" data-temp>
        {temp}
      </div>
    </article>
  );
};

export default ThreeHourForecast;

ThreeHourForecast.propTypes = {
  dt: PropTypes.number.isRequired,
  main: PropTypes.object.isRequired,
  weather: PropTypes.array.isRequired,
};
