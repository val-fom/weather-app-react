import React, { Component } from 'react';

import getAllForecast from './utils/api';
import { getCityFromUrl, setCityTitle, pushHistoryState } from './utils';

import Header from './views/Header';
import Search from './containers/Search';
import History from './containers/History';
import Favourites from './containers/Favourites';
import Weather from './views/Weather';
import Forecast from './views/Forecast';
import Units from './containers/Units';
import Footer from './views/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherResponse: null,
      forecastResponse: null,
      city: getCityFromUrl() || 'Kyiv,UA',
      units: localStorage.units || 'metric',
      isFound: true,
    };
  }

  onSearchSubmit(city) {
    this.updateCityResponse({ city })
      .then(pushHistoryState)
      .catch(console.error);
  }

  onUnitsToggle(units) {
    this.updateCityResponse({ units }).then(pushHistoryState);
  }

  onPopHistoryState(city, units) {
    this.updateCityResponse({ city, units });
  }

  updateCityResponse({ city, units }) {
    city = city || this.state.city;
    units = units || this.state.units;
    return getAllForecast(city, units)
      .then(this.computeNextState, this.computeNotFoundState)
      .then(this.updateState)
      .catch(console.error);
  }

  computeNextState({ weatherResponse, forecastResponse, units }) {
    const city = `${weatherResponse.name},${weatherResponse.sys.country}`;
    return {
      weatherResponse,
      forecastResponse,
      units,
      city,
      isFound: true,
    };
  }

  computeNotFoundState() {
    return { isFound: false };
  }

  componentsStateWillUpdate(nextState) {
    if (nextState.city !== this.state.city) setCityTitle(nextState.city);
  }

  render() {
    const { city, weatherResponse, forecastResponse, isFound } = this.state;

    return (
      <div>
        <Header />
        <Search city={city} isFound={isFound} />
        <History city={city} />
        <Favourites city={city} />
        <Weather city={city} weatherResponse={weatherResponse} />
        <Forecast city={city} forecastResponse={forecastResponse} />
        <Units />
        <Footer />
      </div>
    );
  }
}

export default App;
