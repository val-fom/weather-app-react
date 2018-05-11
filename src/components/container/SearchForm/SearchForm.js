import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { geocodeByPlaceId, getLatLng } from '../../../utils/google';
import Autocomplete from '../../presentational/Autocomplete';
import './SearchForm.css';

export default class SearchForm extends Component {
  state = {
    isActive: false,
    inputValue: null,
    predictions: null,
  };

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.AutocompleteService();
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue } = this.state;
    if (!inputValue || prevState.inputValue === inputValue) return;

    this._getPredictions(inputValue).then(predictions =>
      this.setState({ predictions })
    );
  }

  _getPredictions(input) {
    return new Promise((resolve, reject) => {
      this.autocomplete.getPlacePredictions(
        { input },
        (predictions, status) => {
          if (status !== 'OK') {
            reject(status);
          }
          resolve(predictions);
        }
      );
    }).then(predictions =>
      predictions.map(prediction => ({
        description: prediction.description,
        placeId: prediction.place_id,
      }))
    );
  }

  handleClick = ({ placeId, description }) => {
    geocodeByPlaceId(placeId)
      .then(getLatLng)
      .then(latLng => {
        this.handleSuggestionClick({ description, latLng });
      })
      .catch(console.error);
  };

  handleChange = ev => {
    this.setState({
      inputValue: ev.target.value,
      isActive: !!ev.target.value,
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { inputValue, predictions } = this.state;
    if (!inputValue) return;
    this.handleClick(predictions[0]);
  };

  handleSuggestionClick = ({ description, latLng }) => {
    console.log('description, latLng: ', description, latLng);
    this.setState({
      inputValue: description,
      isActive: false,
    });
    this.props.search({ latLng });
  };

  render() {
    const { isActive, inputValue, predictions } = this.state;

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
            value={inputValue}
            autoComplete="off"
          />
          <button
            type="submit"
            className="button search-form__button"
            title="search"
          >
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </form>
        <Autocomplete
          isActive={isActive}
          predictions={predictions}
          handleClick={this.handleClick}
        />
      </Fragment>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.func.isRequired,
};
