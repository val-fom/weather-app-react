import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from '../PlacesAutocomplete';
import './SearchForm.css';

export default class SearchForm extends Component {
  state = {
    isActive: false,
    isValid: true,
    inputValue: null,
  };

  handleChange = ev =>
    this.setState({
      inputValue: ev.target.value,
    });

  handleSubmit = ev => {
    ev.preventDefault();
    // const { inputValue } = this.state;

    // const input = inputValue.trim();

    // if (!input) {
    //   this.setState({ isValid: false });
    // } else {
    //   this.setState({ isValid: true });
    //   this.props.search(input);
    // }
  };

  handleSuggestionClick = (description, latLng) => {
    console.log('description, latLng: ', description, latLng);
    this.setState({
      inputValue: description,
      isActive: false,
    });
    this.props.search({ latLng });
  };

  render() {
    const { isActive, isValid, inputValue } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            onFocus={() => this.setState({ isActive: true })}
            onMouseUp={e => e.target.setSelectionRange(0, 999)}
            onChange={this.handleChange}
            className="search-form__input"
            name="search"
            placeholder="type city name and select location"
            data-is-valid={isValid}
            value={inputValue}
            autoComplete="off"
          />
          <button className="button search-form__button" title="search">
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </form>
        <PlacesAutocomplete
          inputValue={inputValue}
          isActive={isActive}
          handleSuggestionClick={this.handleSuggestionClick}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.func.isRequired,
};
