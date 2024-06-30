import { type } from "@testing-library/user-event/dist/type";
export const FETCH_USER_LOGIN_SECCES = "UserLogin";
export const UserLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SECCES,
    payload: data,
  };
};
