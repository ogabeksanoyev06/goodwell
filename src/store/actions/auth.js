import { createRoutine } from "redux-saga-routines";
const GetMe = createRoutine("GET_ME");
const SetToken = createRoutine("SET_TOKEN");
const SetUserData = createRoutine("SET_USER_DATA");
const Logout = createRoutine("LOGOUT");
const Login = createRoutine("LOGIN");
const SetProductToCart = createRoutine("SET_PRODUCT_TO_CART");

export default {
  GetMe,
  SetToken,
  SetUserData,
  Logout,
  Login,
  SetProductToCart
};
