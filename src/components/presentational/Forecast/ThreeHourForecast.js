import React from 'react';
import WeatherIcons from '../WeatherIcons';
import { getHours } from '../../../utils';

const ThreeHourForecast = ({ dt, main, weather }) => {
  const hours = getHours(dt);
  const temp = `${main.temp.toFixed(0)}\xB0`;

  return (
    <article className="forecast__three-hour" key={dt}>
      <h4 className="forecast__time" data-time>
        {hours}
      </h4>
      <div className="forecast__icon" data-icon>
        {weather.map(WeatherIcons)}
      </div>
      <div className="forecast__temp" data-temp>
        {temp}
      </div>
    </article>
  );
};

export default ThreeHourForecast;
