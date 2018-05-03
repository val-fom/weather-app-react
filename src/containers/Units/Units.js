import React, { Component } from 'react';

import './Units.css';

export default class Units extends Component {
  constructor(props) {
    super(props);

    this.state = {
      units: localStorage.units || 'metric',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const units = this.state.units === 'metric' ? 'imperial' : 'metric';
    localStorage.units = units;
    this.setState({ units });
    this.props.onToggle(units);
  }

  render() {
    return (
      <div className="units__container">
        <button onClick={this.toggle} className="units__button button" title="change units">
          {this.state.units === 'metric' ? 'C' : 'F'}
        </button>
      </div>
    );
  }
}
