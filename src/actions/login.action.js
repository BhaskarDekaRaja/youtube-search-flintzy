import { loginConstants } from "../constants/login.constants";

  export const login = (userDetails)=>(
    {
    type: loginConstants.LOGIN_REQUEST,
    payload: userDetails,

  }) 
  

  export const logout = ()=>({
    type: loginConstants.LOG_OUT
  })
