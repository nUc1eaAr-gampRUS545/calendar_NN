import { User } from 'moduleTypes';
import apiAxiosInstance from './apiSetup';

const getuser = {
  getuserlist: () => apiAxiosInstance.get(`/users/`)
    
};

export default getuser;
