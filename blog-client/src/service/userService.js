import http from "./http";

// create user account
const signup = (data) => {
  return http.post(`/auth/signup`, data);
};

// user login
const signin = (data) => {
  return http.post(`/auth/signin`, data);
};

// get all users
const getAllUsers = () => {
  return http.get(`/auth/authors`);
};

// logout
const logout = () => {
  localStorage.removeItem("user");
};

// get current user details from local storage
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
