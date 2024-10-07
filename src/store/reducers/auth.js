import authActions from "../actions/auth";

const initialState = {
  user: null,
  isFetched: false,
  isAuthenticated: false,
  token: null,
  cartProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authActions.Login.TRIGGER:
      return {
        ...state,
        isFetched: true,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.data,
      };

    case authActions.GetMe.SUCCESS:
      return {
        ...state,
        isFetched: true,
        isAuthenticated: true,
        token: action.payload.accessToken,
        user: action.payload.data.user,
      };
    case authActions.GetMe.FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetched: true,
        user: {},
      };
    case authActions.SetUserData.TRIGGER: {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isFetched: true,
      };
    }
    case authActions.SetToken.TRIGGER: {
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    }
    case authActions.SetProductToCart.TRIGGER: {
      return {
        ...state,
        cartProducts: action.payload,
      };
    }
    case authActions.Logout.REQUEST:
    case authActions.Logout.FAILURE:
      return {
        ...state,
        isFetched: true,
        isAuthenticated: false,
        token: "",
        user: "",
      };

    default:
      return state;
  }
};
