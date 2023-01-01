import {
  Add_Blog,
  Get_All_Blog,
  Delete_Blog,
  Get_Blog,
  Update_Blog,
  Get_Blog_By_Username,
} from "../action/actionType";

// const initialState = {
//   title: "",
//   description: "",
//   image: "",
// };

const initialState = [];

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_All_Blog:
      return {
        state: action.payload,
      };

    case Add_Blog:
      //return [...state, action.payload];
      return state;

    case Update_Blog:
      //return [...state, action.payload];
      return state;

    case Delete_Blog:
      console.log(action.payload, state.state);
      return {
        ...state,
        state: state.state.filter((blog) => blog._id !== action.payload.id),
      };

    case Get_Blog:
      return { state: action.payload };

    case Get_Blog_By_Username:
      return { state: action.payload };

    default:
      return {
        state,
      };
  }
};
