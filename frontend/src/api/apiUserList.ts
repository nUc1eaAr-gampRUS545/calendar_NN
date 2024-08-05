import apiAxiosInstance from './apiSetup';

const apiForUsers = {
  getUserslist: () => apiAxiosInstance.get(`/users/`),
  getUser: (id:number) => apiAxiosInstance.get(`/users/${id}/`)
    
};

export default apiForUsers;
