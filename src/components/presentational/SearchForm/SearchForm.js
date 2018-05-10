import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { geocodeByPlaceId, getLatLng } from '../../../utils/google';
import PlacesAutocomplete from '../PlacesAutocomplete';
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
    if (prevState.inputValue !== this.state.inputValue) {
      this._getPredictions(this.state.inputValue);
    }
  }

  _getPredictions(value) {
    if (!value) return;
    this.autocomplete.getPlacePredictions(
      {
        input: value,
        type: '(cities)',
      },
      (predictions, status) => {
        console.log('status: ', status);
        console.log('source_predictions: ', predictions);
        if (status === 'OK')
          this.setState({
            predictions: predictions.map(prediction => ({
              description: prediction.description,
              place_id: prediction.place_id,
            })),
          });
      }
    );
  }

  handleClick = ({ placeId, description }) => {
    geocodeByPlaceId(placeId)
      .then(getLatLng)
      .then(latLng => {
        this.handleSuggestionClick({ description, latLng });
      })
      .catch(console.error);
    this.setState({ predictions: null });
  };

  handleChange = ev =>
    this.setState({
      inputValue: ev.target.value,
      isActive: true,
    });

  handleSubmit = ev => {
    ev.preventDefault();
    const { predictions } = this.state;
    if (!predictions) return;
    this.handleClick({
      placeId: predictions[0].place_id,
      description: predictions[0].description,
    });
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
        <PlacesAutocomplete
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
