import React, { Component } from 'react';
import { geocodeByPlaceId, getCoordinates } from '../../../utils/google';

export default class PlacesAutocomplete extends Component {
  state = {
    predictions: [],
  };

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.AutocompleteService();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;

    if (!value) return;

    this.autocomplete.getPlacePredictions(
      {
        input: value,
        type: '(cities)',
      },
      (predictions, status) => {
        console.log('status: ', status);
        console.log('predictions1: ', predictions);
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

  handleClick = (placeId, description) => {
    geocodeByPlaceId(placeId)
      .then(getCoordinates)
      .then(coordinates => {
        this.props.handleSuggestionClick(description, coordinates);
      })
      .catch(console.error);
    this.setState({ predictions: [] });
  };

  render() {
    const { predictions } = this.state;
    console.log('predictions: ', predictions);
    return (
      <ul>
        {predictions.map(prediction => (
          <li key={prediction.place_id}>
            <a
              onClick={() =>
                this.handleClick(prediction.place_id, prediction.description)
              }
            >
              {prediction.description}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
