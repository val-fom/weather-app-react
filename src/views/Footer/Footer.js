require('./Footer.scss');
const octicons = require("octicons");

import { Component } from '../Framework';

export default class Footer extends Component {
	constructor() {
		super();

		this.host = document.createElement('div');
		this.host.classList.add('footer__container');
	}

	render() {
		return `
<footer>
	<a href="https://github.com/val-fom/weather-app"
		class="footer__link footer__link-gh">
		${octicons['mark-github'].toSVG({ "width": 19.2 })}
	</a>
	<a href="https://openweathermap.org/api"
		class="footer__link footer__link-owm">
		<img src="img/logo_OpenWeatherMap_orange.svg" alt="">
	</a>
</footer>
		`;
	}
}
