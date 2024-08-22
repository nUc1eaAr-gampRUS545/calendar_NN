import apiAxoisInstance from './apiSetup';

const apiApplications = {
  create: (params: any) => apiAxoisInstance.post(`/applications/create_action/`, params),
  get: () => apiAxoisInstance.get(`/applications/`),
  delete: (id: number, ) => apiAxoisInstance.delete(`/applications/${id}/`), 
  update: (id: number, params:any ) => apiAxoisInstance.patch(`/applications/update/${id}/`,params),
  
};
export default apiApplications;