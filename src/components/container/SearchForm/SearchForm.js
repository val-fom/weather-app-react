import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AUTOCOMPLETE_SERVICE } from '../../../utils/autocomplete-service';
import Autocomplete from '../../presentational/Autocomplete';
import './SearchForm.css';

export default class SearchForm extends Component {
  state = {
    isActive: false,
    inputValue: '',
    predictions: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { inputValue } = this.state;
    if (!inputValue || prevState.inputValue === inputValue) return;

    AUTOCOMPLETE_SERVICE.getPredictions(inputValue)
      .then(predictions => this.setState({ predictions }))
      .catch(console.error);
  }

  searchByPrediction = ({ placeId, description }) => {
    AUTOCOMPLETE_SERVICE.getLatLng(placeId)
      .then(latLng => {
        this.setState({
          inputValue: description,
          isActive: false,
        });
        this.props.search({ latLng });
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
    this.searchByPrediction(predictions[0]);
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
          searchByPrediction={this.searchByPrediction}
        />
      </Fragment>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.func.isRequired,
};
