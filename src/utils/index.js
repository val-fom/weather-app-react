export const getCityIdFromUrl = () => {
  const { hash } = window.location;
  if (hash.startsWith('#/')) {
    const cityId = hash.slice(2);
    return decodeURI(cityId);
  }
};

export const pushHistoryState = ({ cityId, units }) => {
  if (cityId) window.history.pushState({ cityId, units }, null, `#/${cityId}`);
};

export const setCityTitle = cityName => {
  document.title = `Weather App - ${cityName}`;
};

export const getHours = dt => {
  const date = new Date(dt * 1000);
  return date
    .getHours()
    .toString()
    .padStart(2, '0');
};
