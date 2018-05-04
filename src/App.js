import React, { Component } from 'react';

import './scss/app.css';

import getAllForecast from './utils/api';
import { getCityFromUrl, setCityTitle, pushHistoryState } from './utils';

import Header from './views/Header';
import Search from './containers/Search';
import ListContainer from './containers/ListContainer';
/**/ import HistoryList from './views/History';
/**/ import FavouritesList from './views/Favourites';
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

  componentDidMount() {
    window.onpopstate = ev => {
      this.onPopHistoryState(ev.state.city, ev.state.units);
    };

    this.onSearchSubmit();
  }

  onSearchSubmit = city => {
    this.updateCityResponse({ city })
      .then(pushHistoryState)
      .catch(console.error);
  };

  onUnitsToggle = units => {
    this.updateCityResponse({ units }).then(pushHistoryState);
  };

  onPopHistoryState(city, units) {
    this.updateCityResponse({ city, units });
  }

  updateCityResponse({ city, units }) {
    city = city || this.state.city;
    units = units || this.state.units;
    return getAllForecast(city, units)
      .then(this.computeNextState, this.computeNotFoundState)
      .then(nextState => {
        this.setState(nextState);
        return nextState;
      })
      .catch(console.error);
  }

  computeNextState = ({ weatherResponse, forecastResponse, units }) => {
    const city = `${weatherResponse.name},${weatherResponse.sys.country}`;
    return {
      weatherResponse,
      forecastResponse,
      units,
      city,
      isFound: true,
    };
  };

  computeNotFoundState = () => ({ isFound: false });

  componentsStateWillUpdate(nextState) {
    if (nextState.city !== this.state.city) setCityTitle(nextState.city);
  }

  render() {
    const { city, weatherResponse, forecastResponse, isFound } = this.state;

    return (
      <div>
        <Header />
        <Search city={city} isFound={isFound} onSubmit={this.onSearchSubmit} />
        <ListContainer listName="history" inner={HistoryList} city={city} onClick={this.onSearchSubmit} />
        <ListContainer listName="favourites" inner={FavouritesList} city={city} onClick={this.onSearchSubmit} />
        <Weather city={city} weatherResponse={weatherResponse} />
        <Forecast city={city} forecastResponse={forecastResponse} />
        <Units onToggle={this.onUnitsToggle} />
        <Footer />
      </div>
    );
  }
}

export default App;
