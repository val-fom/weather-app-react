import React, { Component } from 'react';

import './Search.css';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      inputValue: null,
    };

    this.host = document.createElement('div');
    this.host.classList.add('search__container');

    this.form = document.createElement('form');
    this.form.classList.add('search');

    this.input = document.createElement('input');
    this.input.classList.add('search__input');
    this.input.name = 'search';
    this.input.placeholder = 'type city name and press enter';

    this.input.addEventListener('mouseup', () => this.input.setSelectionRange(0, 999));

    this.button = document.createElement('button');
    this.button.classList.add('button', 'search__button');
    this.button.title = 'search';
    this.button.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';

    this.form.append(this.input, this.button);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.host.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const inputValue = ev.target.elements.search.value.trim();
    if (!inputValue) {
      this.updateState({ isValid: false });
    } else {
      this.updateState({ isValid: true, inputValue });
      this.props.onSubmit(inputValue);
    }
  }

  render() {
    return <div>search</div>;
    let { isFound, city } = this.props;
    let { isValid, inputValue } = this.state;
    isValid = isValid && isFound;

    if (!isFound) {
      city = `city \'${inputValue}\' not found`;
    }

    this.input.dataset.isValid = isValid;
    this.input.value = city;

    return this.form;
  }
}
