import apiAxoisInstance from './apiSetup';

const apiGetPlaces = {
  get: () => apiAxoisInstance.get(`/places/`),
  getPlace: (id: number, ) => apiAxoisInstance.get(`/places/${id}/`), 

};
export default apiGetPlaces;