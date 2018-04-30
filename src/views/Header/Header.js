require('./Header.scss');

import { Component } from '../Framework';

export default class Header extends Component {
	constructor() {
		super();

		this.host = document.createElement('div');
		this.host.classList.add('header__container');
	}

	render() {
		return `
			<header>
				<h1 class="header__heading">Weather App</h1>
			</header>
		`;
	}
}
