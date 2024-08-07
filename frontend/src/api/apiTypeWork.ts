import apiAxoisInstance from './apiSetup';

const apiTypesWorks = {
  get: () => apiAxoisInstance.get(`/types-work/`),
  post:(params:number[]) => apiAxoisInstance.post(`/types-work/get_list/`,{"type_ids":params})
};
export default apiTypesWorks;