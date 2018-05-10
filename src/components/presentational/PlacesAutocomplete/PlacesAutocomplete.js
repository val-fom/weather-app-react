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
    return (
      nextProps.value !== this.props.value ||
      nextProps.isActive !== this.props.isActive
    );
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
    const { isActive } = this.props;

    return (
      <ul className={isActive ? '' : 'hidden'}>
        {predictions.map(prediction => (
          <li key={prediction.place_id}>
            <a
              href={`#/${prediction.place_id}`}
              onClick={ev => {
                ev.preventDefault();
                this.handleClick(prediction.place_id, prediction.description);
              }}
            >
              {prediction.description}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
