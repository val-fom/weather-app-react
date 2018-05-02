import React, { Component } from 'react';
import getIcons from '../../utils/weatherIcons';

import './Weather.css';

export default class Weather extends Component {
  constructor(props) {
    super(props);

    this.host = document.createElement('div');
    this.host.classList.add('weather__container');
  }

  render() {
    if (!this.props.weatherResponse) return '';

    const { weatherResponse, city } = this.props;
    const icons = getIcons(weatherResponse.weather);
    const temp = weatherResponse.main.temp.toFixed(0);

    return `
			<div class="weather">
				<h2 class="weather__city">${city}</h2>
				<div class="weather__icon">${icons}</div>
				<div class="weather__temp">${temp}\xB0</div>
			</div>
		`;
  }
}
