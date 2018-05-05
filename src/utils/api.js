const KEY = '40c8d4e755a53b1d45a970fc3769eeeb';
const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/';
const count = `&cnt=${8}`; // 24/3 hour forecast

const get = (apiType, units, city) => {
  const url = `${BASE_API_URL +
    apiType}?q=${city}&APPID=${KEY}&units=${units}${count}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
};

const getWeather = (city, units) => get('weather', units, city);
const getForecast = (city, units) => get('forecast', units, city);

export const findCity = (city, units) => get('find', units, city);

const getAllForecast = (city, units) =>
  Promise.all([getWeather(city, units), getForecast(city, units), units]).then(
    ([weatherResponse, forecastResponse, units]) => ({
      weatherResponse,
      forecastResponse,
      units,
    })
  );

export default getAllForecast;
