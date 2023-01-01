import blogService from "../../service/blogService";
import userService from "../../service/userService";
import {
  Get_All_Blog,
  Add_Blog,
  Delete_Blog,
  Get_Blog,
  Update_Blog,
  User_Login,
  User_Register,
  Get_Blog_By_Username,
} from "./actionType";

// get all blogs
export const getAllBlogs = () => async (dispatch) => {
  try {
    const res = await blogService.getAll();
    console.log(res.data[0].filePath.slice(45));
    dispatch({
      type: Get_All_Blog,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// add blog
export const addBlogToDB = (id, data) => async (dispatch) => {
  const res = await blogService.addBlog(id, data);
  //console.log(res);
  dispatch({
    type: Add_Blog,
    // payload: res.data,
  });
  return Promise.resolve(res);
};

// delete blog
export const deleteBlogById = (id) => async (dispatch) => {
  try {
    const res = await blogService.deleteBlog(id);
    dispatch({
      type: Delete_Blog,
      payload: { id },
    });
    //console.log(res);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

// get blog by id
export const getBlogById = (id) => async (dispatch) => {
  try {
    const res = await blogService.getBlogById(id);
    //  console.log(res.data);
    dispatch({
      type: Get_Blog,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// get blog by id
export const getBlogByUsername = (username) => async (dispatch) => {
  try {
    const res = await blogService.getBlogByUsername(username);
    //  console.log(res.data);
    dispatch({
      type: Get_Blog_By_Username,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// update blog
export const updateBlogById = (id, data) => async (dispatch) => {
  // console.log(data);
  const res = await blogService.updateBlog(id, data);
  // console.log(res);
  dispatch({
    type: Update_Blog,
    // payload: res.data,
  });
  return Promise.resolve(res);
};

// login user
export const signinUser = (data) => async (dispatch) => {
  try {
    const res = await userService.signin(data);
    localStorage.setItem("user", JSON.stringify(res.data));
    //  console.log(res);
    dispatch({
      type: User_Login,
      // payload: userService.getCurrentUser(),
    });

    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

// create user account
export const signupUser = (data) => async (dispatch) => {
  try {
    const res = await userService.signup(data);

    //console.log(res);
    dispatch({
      type: User_Register,
    });

    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};
