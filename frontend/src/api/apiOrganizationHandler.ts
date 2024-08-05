import apiAxiosInstance from './apiSetup';

const apiForOrhanization = {
  getOrgs:() => apiAxiosInstance.get("organizations/"),
  getOrg: (id:number) => apiAxiosInstance.get(`/organizations/${id}/`)
    
};

export default apiForOrhanization;
