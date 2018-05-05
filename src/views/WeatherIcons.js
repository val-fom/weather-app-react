import React from 'react';
import 'weather-icons-sass/css/weather-icons.css';

const WeatherIcons = ({ id, icon, main, description }) => {
  let timeOfDay = '';
  if (id >= 800 && id <= 803) {
    timeOfDay = icon.endsWith('n') ? '-night' : '-day';
  }

  const className = `wi wi-owm${timeOfDay}-${id}`;
  const title = `${main}: ${description}`;

  return <i className={className} title={title} key={id} />;
};

export default WeatherIcons;
