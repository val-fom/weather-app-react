require('./Forecast.scss');

import { Component } from '../Framework';

import getIcons from '../utils/weatherIcons';
import { getHours } from '../utils';

export default class Forecast extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('forecast__container');

		this.wrapper = document.createElement('div');
		this.wrapper.classList.add('forecast__wrapper');
		this.host.appendChild(this.wrapper);

		this.header = document.createElement('div');
		this.header.classList.add('forecast__header');
		this.header.innerHTML = `
			<span></span>
			<h2>24/3h forecast</h2>
			<span></span>
		`;
		this.wrapper.appendChild(this.header);

		this.forecast = document.createElement('div');
		this.forecast.classList.add('forecast');
		this.wrapper.appendChild(this.forecast);
	}

	render() {
		const { forecastResponse } = this.props;

		if (!forecastResponse) return '';

		this.forecast.innerHTML = '';
		for (var i = forecastResponse.list.length - 1; i >= 0; i--) {
			const hours = getHours(forecastResponse.list[i].dt);
			const icons = getIcons(forecastResponse.list[i].weather);
			const temp = forecastResponse.list[i].main.temp.toFixed(0);
			const html = `
				<article class="forecast__three-hour">
					<h4 class="forecast__time" data-time>${hours}</h4>
					<div class="forecast__icon" data-icon>${icons}</div>
					<div class="forecast__temp" data-temp>${temp}\xB0</div>
				</article>
			`;
			this.forecast.insertAdjacentHTML('beforeend', html);
		}
		return this.wrapper;
	}
}
