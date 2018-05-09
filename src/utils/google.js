export const getCoordinates = result =>
  new Promise((resolve, reject) => {
    try {
      const latLng = {
        lat: result[0].geometry.location.lat(),
        lng: result[0].geometry.location.lng(),
      };
      resolve(latLng);
    } catch (e) {
      reject(e);
    }
  });

export const geocodeByPlaceId = placeId => {
  const geocoder = new window.google.maps.Geocoder();
  const { OK } = window.google.maps.GeocoderStatus;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== OK) {
        reject(status);
      }
      resolve(results);
    });
  });
};
