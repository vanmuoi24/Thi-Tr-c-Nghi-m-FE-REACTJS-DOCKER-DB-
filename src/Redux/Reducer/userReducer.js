import { FETCH_USER_LOGIN_SECCES, UserLogin } from "../Action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    isAuthenticated: false,
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SECCES:
      return {
        ...state,
        account: {
          access_token: action?.payload?.data.DT?.access_token,
          refresh_token: action?.payload?.data.DT?.refresh_token,
          username: action?.payload?.data.DT?.username,
          role: action?.payload?.data.DT?.role,
          image: action?.payload?.data.DT?.image,
        },
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default userReducer;
