import {
    combineReducers
  } from "redux";
import { loginReducer } from "./login.reducer";

  const appReducer = combineReducers({
    login:loginReducer
  })

  export const rootReducer = (state, action) => {
      return appReducer(state,action)
  }