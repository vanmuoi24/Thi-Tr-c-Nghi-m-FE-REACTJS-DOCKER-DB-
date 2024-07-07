import {
  FETCH_USER_LOGIN_SECCES,
  LOGOUT_RESET,
  CHANGE_USER_IMAGE,
} from "../Action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    email: "",
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
          email: action?.payload?.data.DT?.email,

          role: action?.payload?.data.DT?.role,
          image: action?.payload?.data.DT?.image,
        },
        isAuthenticated: true,
      };

    case LOGOUT_RESET:
      return {
        account: {
          access_token: "",
          refresh_token: "",
          username: "",
          email: "",
          image: "",
          isAuthenticated: false,
        },
      };

    case CHANGE_USER_IMAGE:
      console.log(action);
      return {
        ...state,
        account: {
          ...state.account, // giữ lại các giá trị cũ trong account
          username: action?.payload?.username, // cập nhật lại username
          image: action?.payload?.images, // cập nhật lại image
        },
      };

    default:
      return state;
  }
};

export default userReducer;
