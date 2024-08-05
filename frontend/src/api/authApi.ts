import  apiAxoisInstance from './apiSetup'

const authApi = {
  signup: (params: any) =>  apiAxoisInstance.post('users/auth/register/', params),
  login: (params: {email:string,password:string}) =>  apiAxoisInstance.post('users/auth/login/', params),
  verifyToken:() => apiAxoisInstance.get('users/auth/token/'),

}

export default authApi