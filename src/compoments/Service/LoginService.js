import { delay } from "lodash";
import instance from "../Utils/axiosCustomize";

const postLogin = (email, password) => {
  return instance.post("api/v1/login", {
    email: email,
    password: password,
    delay: 5000,
  });
};
const logOut = (email, refresh_token) => {
  return instance.post(`api/v1/logout`, {
    email,
    refresh_token,
  });
};

export { postLogin, logOut };
