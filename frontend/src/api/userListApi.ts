import apiAxoisInstance from './apiSetup'

const getuser = {
  
  getuserlist: () => apiAxoisInstance.get(`/users/`),

}

export default getuser