import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';

export default class SearchForm extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.isFound
      ? {
          inputValue: nextProps.city,
          badInputValue: null,
          isValid: true,
        }
      : {
          badInputValue: prevState.inputValue,
          inputValue: `city '${prevState.inputValue}' not found`,
          isValid: false,
        };
  }

  state = {
    isValid: true,
    inputValue: null,
    badInputValue: null,
  };

  handleChange = ev => {
    const { badInputValue } = this.state;

    const nextState = badInputValue
      ? {
          inputValue: badInputValue,
          badInputValue: null,
        }
      : {
          inputValue: ev.target.value,
        };

    this.setState(nextState);
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { inputValue, badInputValue } = this.state;

    if (badInputValue) return;

    if (!inputValue.trim()) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
      this.props.onSubmit(inputValue.trim());
    }
  };

  render() {
    const { isValid, inputValue } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <input
          onMouseUp={e => e.target.setSelectionRange(0, 999)}
          onChange={this.handleChange}
          className="search-form__input"
          name="search"
          placeholder="type city name and press enter"
          data-is-valid={isValid}
          value={inputValue}
        />
        <button className="button search-form__button" title="search">
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
