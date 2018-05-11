class AutocompleteService {
  constructor() {
    this.geocoder = new window.google.maps.Geocoder();
    this.autocomplete = new window.google.maps.places.AutocompleteService();
  }

  _geocodeByPlaceId = placeId =>
    new Promise((resolve, reject) => {
      this.geocoder.geocode({ placeId }, (results, status) => {
        if (status !== 'OK') {
          reject(status);
        }
        resolve(results);
      });
    });

  _getLatLng = result =>
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

  getPredictions = input =>
    new Promise((resolve, reject) => {
      this.autocomplete.getPlacePredictions(
        { input },
        (predictions, status) => {
          if (status !== 'OK') {
            reject(status);
          }
          resolve(predictions);
        }
      );
    }).then(predictions =>
      predictions.map(prediction => ({
        description: prediction.description,
        placeId: prediction.place_id,
      }))
    );

  getLatLng = placeId => this._geocodeByPlaceId(placeId).then(this._getLatLng);
}

export const AUTOCOMPLETE_SERVICE = new AutocompleteService();
