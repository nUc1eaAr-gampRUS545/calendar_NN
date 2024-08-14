import apiAxoisInstance from './apiSetup';

const apiGetPlaces = {
  get: () => apiAxoisInstance.get(`/places/`),

};
export default apiGetPlaces;