const KEY = '40c8d4e755a53b1d45a970fc3769eeeb';
const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/';
const count = `&cnt=${8}`; // 24/3 hour forecast

const get = (apiType, { cityId, latLng, units }) => {
  const url = cityId
    ? `${BASE_API_URL +
        apiType}?id=${cityId}&APPID=${KEY}&units=${units}${count}`
    : `${BASE_API_URL + apiType}?lat=${latLng.lat}&lon=${
        latLng.lng
      }&APPID=${KEY}&units=${units}${count}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
};

const getWeather = ({ cityId, latLng, units }) =>
  get('weather', { cityId, latLng, units });
const getForecast = ({ cityId, latLng, units }) =>
  get('forecast', { cityId, latLng, units });

const getAllForecast = ({ cityId, latLng, units }) =>
  Promise.all([
    getWeather({ cityId, latLng, units }),
    getForecast({ cityId, latLng, units }),
    units,
  ]).then(([weatherResponse, forecastResponse, units]) => ({
    weatherResponse,
    forecastResponse,
    units,
  }));

export default getAllForecast;
