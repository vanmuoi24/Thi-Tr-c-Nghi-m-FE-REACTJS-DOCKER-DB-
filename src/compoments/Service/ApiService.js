import instance from "../Utils/axiosCustomize";

const postCretaeNewUser = (email, password, username, role, images) => {
  const form = new FormData();
  form.append("email", email);
  form.append("username", username);
  form.append("role", role);
  form.append("password", password);
  form.append("userImage", images);

  return instance.post("api/v1/participant", form);
};

const getAllUser = () => {
  return instance.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, images) => {
  const form = new FormData();
  form.append("id", id);
  form.append("role", role);
  form.append("username", username);
  form.append("userImage", images);

  return instance.put("api/v1/participant", form);
};

const deleteUser = (id) => {
  return instance.delete("api/v1/participant", { data: { id: id } });
};

const getPageListUser = (page, limit) => {
  return instance.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
export {
  postCretaeNewUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getPageListUser,
};
