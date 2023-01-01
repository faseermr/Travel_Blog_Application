import http from "./http";

// get all blogs
const getAll = () => {
  return http.get(`/blog`);
};

// add blog
const addBlog = (id, data) => {
  return http.post(`/blog/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// delete blog by id
const deleteBlog = (id) => {
  return http.delete(`/blog/${id}`);
};

// get single blogs
const getBlogById = (_id) => {
  return http.get(`/blog/${_id}`);
};

// get blogs by username
const getBlogByUsername = (username) => {
  return http.get(`/blog/username/${username}`);
};

// update blog
const updateBlog = (id, data) => {
  return http.put(`/blog/update/${id}`, data);
};

export default {
  getAll,
  addBlog,
  deleteBlog,
  getBlogById,
  updateBlog,
  getBlogByUsername,
};
