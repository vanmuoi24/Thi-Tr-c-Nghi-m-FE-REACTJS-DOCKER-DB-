import instance from "../Utils/axiosCustomize";

const updateUserProfile = (username, image) => {
  const form = new FormData();

  form.append("username", username);
  form.append("userImage", image);

  return instance.post("api/v1/profile", form);
};

const getDataHistryQuiz = () => {
  return instance.get("api/v1/history");
};

const ChangePassWord = (current_password, new_password) => {
  return instance.post("api/v1/change-password", {
    current_password,
    new_password,
  });
};
export { updateUserProfile, getDataHistryQuiz, ChangePassWord };
