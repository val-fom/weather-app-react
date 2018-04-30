require('./Favourites.scss');

import { Component } from '../Framework';

export default class Favourites extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: this.getFromLocalStorage('favourites')
		};
		this.host = document.createElement('div');
		this.host.classList.add('favourites__container');
		this.ul = document.createElement('ul');
		this.ul.classList.add('favourites');
		this.host.appendChild(this.ul);

		this.handleClick = this.handleClick.bind(this);
		this.ul.addEventListener('click', this.handleClick);

		this.addButton = document.createElement('button');
		this.addButton.classList.add('favourites__add-button', 'button');
		this.addButton.addEventListener('click', () =>
			this.add(this.props.city, 'favourites')
		);
		this.addButton.innerHTML = '<i>+</i>';
		this.addButton.title = 'add to favourites';
		this.host.appendChild(this.addButton);

		this.clearButton = document.createElement('button');
		this.clearButton.classList.add('favourites__clear-button', 'button');
		this.clearButton.addEventListener('click', () =>
			this.clear('favourites'));
		this.clearButton.title = 'clear favourites';
		this.clearButton.innerHTML = '<i>+</i>';
		this.host.appendChild(this.clearButton);
	}

	render() {
		this.ul.innerHTML = '';
		const list = this.state.list;
		for (var i = list.length - 1; i >= 0; i--) {
			const city = list[i];
			const li = `
				<li class="favourites__city">
					<a href="#">${city}</a>
				</li>
			`;
			this.ul.insertAdjacentHTML('beforeend', li);
		}
		return [this.ul, this.addButton, this.clearButton];
	}

	add(item, key) {
		const list = this.state.list.slice();
		let index = list.indexOf(item);
		if (item === list[list.length - 1]) return;
		if (~index) list.splice(index, 1);
		// ^ to move existing item to the end of the list
		list.push(item);
		localStorage.setItem(key, JSON.stringify(list));
		this.updateState({ list });
	}

	getFromLocalStorage(key) {
		return (localStorage[key]) ?
			JSON.parse(localStorage[key]) : [];
	}

	clear(key) {
		localStorage.removeItem(key);
		this.updateState({ list: [] });
	}

	handleClick(ev) {
		if (ev.target.tagName !== 'A') return;
		ev.preventDefault();
		const city = ev.target.innerHTML;
		this.props.onClick(city);
	}
}
