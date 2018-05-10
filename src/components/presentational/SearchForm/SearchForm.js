import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from '../PlacesAutocomplete';
import './SearchForm.css';

export default class SearchForm extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.isFound
      ? {
          inputValue: nextProps.cityName,
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
    isActive: false,
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

    const input = inputValue.trim();

    if (!input) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
      this.props.search(input);
    }
  };

  handleSuggestionClick = (description, latLng) => {
    console.log('description, latLng: ', description, latLng);
    this.setState({ inputValue: description });
    this.props.search({ latLng });
  };

  render() {
    const { isActive, isValid, inputValue } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            onFocus={() => this.setState({ isActive: true })}
            onBlur={() => this.setState({ isActive: false })}
            onMouseUp={e => e.target.setSelectionRange(0, 999)}
            onChange={this.handleChange}
            className="search-form__input"
            name="search"
            placeholder="type city name and press enter"
            data-is-valid={isValid}
            value={inputValue}
            autoComplete="off"
          />
          <button className="button search-form__button" title="search">
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </form>
        <PlacesAutocomplete
          value={isValid ? inputValue : ''}
          isActive={isActive}
          handleSuggestionClick={this.handleSuggestionClick}
        />
      </Fragment>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.func.isRequired,
};
