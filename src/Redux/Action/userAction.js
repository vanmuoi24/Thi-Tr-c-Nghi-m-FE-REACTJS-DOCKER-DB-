import { type } from "@testing-library/user-event/dist/type";
export const FETCH_USER_LOGIN_SECCES = "UserLogin";
export const LOGOUT_RESET = "ResetStateLogOut";
export const CHANGE_USER_IMAGE = "UserChangeManegement";
export const UserLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SECCES,
    payload: data,
  };
};

export const ResetStateLogOut = (data) => {
  return {
    type: LOGOUT_RESET,
    payload: data,
  };
};

export const UserChangeManegement = (data) => {
  return {
    type: CHANGE_USER_IMAGE,
    payload: data,
  };
};
