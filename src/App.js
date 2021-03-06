import React, { Component, Fragment } from 'react';

import './scss/app.css';

import getAllForecast from './utils/api';
import { getCityIdFromUrl, setCityTitle, pushHistoryState } from './utils';

import Header from './components/presentational/Header';
import SearchForm from './components/container/SearchForm';
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
  };

  componentDidMount() {
    window.onpopstate = ev => {
      if (ev.state) {
        const { cityId, units } = ev.state;
        this.updateCityResponse({ cityId, units });
      }
    };

    const cityId = getCityIdFromUrl();
    if (cityId) this.search({ cityId });
  }

  componentDidUpdate() {
    const { weatherResponse } = this.state;
    const cityName = `${weatherResponse.name},${weatherResponse.sys.country}`;

    setCityTitle(cityName);
  }

  search = ({ cityId, latLng }) => {
    this.updateCityResponse({ cityId, latLng })
      .then(pushHistoryState)
      .catch(console.error);
  };

  toggleUnits = () => {
    const { weatherResponse } = this.state;
    const units = this.state.units === 'metric' ? 'imperial' : 'metric';
    const cityId = weatherResponse.id;
    localStorage.setItem('units', units);
    this.setState({ units });
    this.updateCityResponse({ cityId, units }).then(pushHistoryState);
  };

  updateCityResponse({ cityId, latLng, units = this.state.units }) {
    return getAllForecast({ cityId, latLng, units })
      .then(nextState => {
        this.setState(nextState);
        return { cityId: nextState.weatherResponse.id, units };
        // for pushHistoryState if needed
      })
      .catch(console.error);
  }

  render() {
    const { weatherResponse, forecastResponse, units } = this.state;

    if (!weatherResponse)
      return (
        <Fragment>
          <Header />
          <SearchForm search={this.search} />
          <ListContainer
            listName="history"
            ListView={History}
            search={this.search}
          />
          <Footer />
        </Fragment>
      );

    const cityName = `${weatherResponse.name},${weatherResponse.sys.country}`;
    const cityId = weatherResponse.id;

    return (
      <Fragment>
        <Header />
        <SearchForm search={this.search} />
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
