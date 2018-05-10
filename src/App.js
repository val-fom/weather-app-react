import React, { Component, Fragment } from 'react';

import './scss/app.css';

import getAllForecast from './utils/api';
import { getCityIdFromUrl, setCityTitle, pushHistoryState } from './utils';

import Header from './components/presentational/Header';
import SearchForm from './components/presentational/SearchForm';
import ListContainer from './components/container/ListContainer';
/**/ import History from './components/presentational/History';
/**/ import Favourites from './components/presentational/Favourites';
import Weather from './components/presentational/Weather';
import Forecast from './components/presentational/Forecast';
import Units from './components/presentational/Units';
import Footer from './components/presentational/Footer';

export default class App extends Component {
  state = {
    weatherResponse: null,
    forecastResponse: null,
    units: localStorage.getItem('units') || 'metric',
    isFound: true,
  };

  componentDidMount() {
    window.onpopstate = ev => {
      if (ev.state) {
        const { cityId, units } = ev.state;
        this.updateCityResponse({ cityId, units });
      } else {
        const cityId = getCityIdFromUrl();
        if (cityId) this.updateCityResponse({ cityId });
      }
    };

    this.search({ cityId: 703448 }); // get data for default city (Kyiv)
  }

  componentDidUpdate() {
    const { weatherResponse /* , units */ } = this.state;
    const cityName = `${weatherResponse.name},${weatherResponse.sys.country}`;
    // const cityId = weatherResponse.id;

    setCityTitle(cityName);
    // pushHistoryState({ cityId, units });
  }

  search = ({ cityId, latLng }) => {
    this.updateCityResponse({ cityId, latLng })
      // .then(pushHistoryState)
      .catch(console.error);
  };

  toggleUnits = () => {
    const units = this.state.units === 'metric' ? 'imperial' : 'metric';
    localStorage.setItem('units', units);
    this.setState({ units });
    this.updateCityResponse({ units }); /* .then(pushHistoryState); */
  };

  updateCityResponse({ cityId, latLng, units = this.state.units }) {
    return getAllForecast({ cityId, latLng, units })
      .then(this.computeNextState, this.computeNotFoundState)
      .then(nextState => {
        pushHistoryState({ cityId, units });
        this.setState(nextState);
        return nextState;
      })
      .catch(console.error);
  }

  computeNextState = ({ weatherResponse, forecastResponse, units }) => ({
    weatherResponse,
    forecastResponse,
    units,
    isFound: true, // TODO: cut out this flag
  });

  computeNotFoundState = () => ({ isFound: false }); // TODO: cut out this flag

  render() {
    const { weatherResponse, forecastResponse, units, isFound } = this.state;

    if (!weatherResponse) return null;

    const cityName = `${weatherResponse.name},${weatherResponse.sys.country}`;
    const cityId = weatherResponse.id;

    return (
      <Fragment>
        <Header />
        <SearchForm
          cityName={cityName}
          isFound={isFound}
          search={this.search}
        />
        <ListContainer
          listName="history"
          ListView={History}
          cityName={cityName}
          cityId={cityId}
          search={this.search}
        />
        <ListContainer
          listName="favourites"
          ListView={Favourites}
          cityName={cityName}
          cityId={cityId}
          search={this.search}
        />
        <Weather cityName={cityName} weatherResponse={weatherResponse} />
        <Forecast forecastResponse={forecastResponse} />
        <Units toggleUnits={this.toggleUnits} units={units} />
        <Footer />
      </Fragment>
    );
  }
}
