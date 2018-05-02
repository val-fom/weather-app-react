import React, { Component } from 'react';

import './Units.css';

export default class Units extends Component {
  constructor(props) {
    super(props);

    this.state = {
      units: localStorage.units || 'metric',
    };
    this.host = document.createElement('div');
    this.host.classList.add('units__container');

    this.button = document.createElement('button');
    this.button.classList.add('units__button', 'button');
    this.button.title = 'change units';
    this.host.appendChild(this.button);

    this.toggle = this.toggle.bind(this);
    this.button.addEventListener('click', this.toggle);
  }

  toggle() {
    const units = this.state.units === 'metric' ? 'imperial' : 'metric';
    localStorage.units = units;
    this.updateState({ units });
    this.props.onToggle(units);
  }

  render() {
    return <button>Button</button>;
    this.button.textContent = this.state.units === 'metric' ? 'C' : 'F';
    return this.button;
  }
}
