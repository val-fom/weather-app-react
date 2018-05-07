import React, { Component, Fragment } from 'react';

import './scss/app.css';

import getAllForecast from './utils/api';
import { getCityFromUrl, setCityTitle, pushHistoryState } from './utils';

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
  constructor(props) {
    super(props);

    this.state = {
      weatherResponse: null,
      forecastResponse: null,
      city: getCityFromUrl() || 'Kyiv,UA',
      id: null,
      units: localStorage.getItem('units') || 'metric',
      isFound: true,
    };
  }

  componentDidMount() {
    window.onpopstate = ev => {
      if (ev.state) {
        const { city, units } = ev.state;
        this.updateCityResponse({ city, units });
      } else {
        const city = getCityFromUrl();
        if (city) this.updateCityResponse({ city });
      }
    };

    this.search();
  }

  componentDidUpdate() {
    setCityTitle(this.state.city);
  }

  search = city => {
    this.updateCityResponse({ city })
      .then(pushHistoryState)
      .catch(console.error);
  };

  toggleUnits = () => {
    const units = this.state.units === 'metric' ? 'imperial' : 'metric';
    localStorage.setItem('units', units);
    this.setState({ units });
    this.updateCityResponse({ units }).then(pushHistoryState);
  };

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
    const { id } = weatherResponse;
    return {
      weatherResponse,
      forecastResponse,
      units,
      city,
      id,
      isFound: true,
    };
  };

  computeNotFoundState = () => ({ isFound: false });

  render() {
    const {
      city,
      id,
      weatherResponse,
      forecastResponse,
      isFound,
      units,
    } = this.state;

    return (
      <Fragment>
        <Header />
        <SearchForm city={city} isFound={isFound} onSubmit={this.search} />
        <ListContainer
          listName="history"
          ListView={History}
          city={city}
          id={id}
          handleClick={this.search}
        />
        <ListContainer
          listName="favourites"
          ListView={Favourites}
          city={city}
          id={id}
          handleClick={this.search}
        />
        <Weather city={city} weatherResponse={weatherResponse} />
        <Forecast forecastResponse={forecastResponse} />
        <Units handleClick={this.toggleUnits} units={units} />
        <Footer />
      </Fragment>
    );
  }
}
