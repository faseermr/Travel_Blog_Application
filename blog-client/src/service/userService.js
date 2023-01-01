import http from "./http";

const signup = (data) => {
  return http.post(`/auth/signup`, data);
};

const signin = (data) => {
  return http.post(`/auth/signin`, data);
};

const getAllUsers = () => {
  return http.get(`/auth/authors`);
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  signup,
  signin,
  logout,
  getCurrentUser,
  getAllUsers,
};
