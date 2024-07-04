import authApi from "./authApi";
import { useAtom } from 'jotai';
import { userAtom, scheduleController } from '../App';

const authUtils = {
  isAuthenticated: async () => {
    
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const res = await authApi.verifyToken();
   
      return res.data.employee; // Corrected line

    } catch {
      return false;
    }
  }
};

export default authUtils;
