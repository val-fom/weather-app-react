import React from 'react';

import Favourites from '../Favourites';

import './History.css';

export default class History extends Favourites {
  constructor(props) {
    super(props);

    this.state = {
      list: this.getFromLocalStorage('history'),
    };
    this.host = document.createElement('div');
    this.host.classList.add('history__container');
    this.ul = document.createElement('ul');
    this.ul.classList.add('history');
    this.host.appendChild(this.ul);

    this.handleClick = this.handleClick.bind(this);
    this.ul.addEventListener('click', this.handleClick);

    this.clearButton = document.createElement('button');
    this.clearButton.classList.add('history__clear-button', 'button');
    this.clearButton.addEventListener('click', () => {
      this.clear('history');
    });
    this.clearButton.innerHTML = '<i>+</i>';
    this.clearButton.title = 'clear history';
    this.host.appendChild(this.clearButton);
  }

  render() {
    return <div>history</div>;
    this.ul.innerHTML = '';
    const list = this.state.list;
    for (let i = list.length - 1; i >= 0; i--) {
      const city = list[i];
      const li = `
				<li class="history__city">
					<a href="#">${city}</a>
				</li>
			`;
      this.ul.insertAdjacentHTML('beforeend', li);
    }
    return [this.ul, this.clearButton];
  }

  beforeUpdate({ city }) {
    this.add(city, 'history');
  }
}
