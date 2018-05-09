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
    // cityName: null,
    // cityId: null,
    units: localStorage.getItem('units') || 'metric',
    isFound: true,
  };

  componentDidMount() {
    // window.onpopstate = ev => {
    //   if (ev.state) {
    //     const { city, units } = ev.state;
    //     this.updateCityResponse({ city, units });
    //   } else {
    //     const city = getCityIdFromUrl();
    //     if (city) this.updateCityResponse({ city });
    //   }
    // };

    this.search({ cityId: 703448 }); // get data for default city (Kyiv)
  }

  componentDidUpdate() {
    // setCityTitle(this.state.city);
  }

  search = ({ cityId, latLng }) => {
    this.updateCityResponse({ cityId, latLng })
      .then(pushHistoryState)
      .catch(console.error);
  };

  toggleUnits = () => {
    const units = this.state.units === 'metric' ? 'imperial' : 'metric';
    localStorage.setItem('units', units);
    this.setState({ units });
    this.updateCityResponse({ units }).then(pushHistoryState);
  };

  updateCityResponse({ cityId, latLng, units = this.state.units }) {
    return getAllForecast({ cityId, latLng, units })
      .then(this.computeNextState, this.computeNotFoundState)
      .then(nextState => {
        this.setState(nextState);
        return nextState;
      })
      .catch(console.error);
  }

  computeNextState = ({ weatherResponse, forecastResponse, units }) => ({
    weatherResponse,
    forecastResponse,
    units,
    isFound: true,
  });

  computeNotFoundState = () => ({ isFound: false });

  render() {
    const { weatherResponse, forecastResponse, isFound, units } = this.state;

    if (!weatherResponse) return null;

    const cityName = `${weatherResponse.name},${weatherResponse.sys.country}`;
    const { cityId } = weatherResponse.id;

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
