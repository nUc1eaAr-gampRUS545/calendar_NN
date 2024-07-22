import { User } from 'moduleTypes';
import apiAxiosInstance from './apiSetup';

const apiForUsers = {
  getUserlist: () => apiAxiosInstance.get(`/users/`)
    
};

export default apiForUsers;
