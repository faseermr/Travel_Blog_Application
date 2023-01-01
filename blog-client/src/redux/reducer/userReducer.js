import userService from "../../service/userService";
import { User_Login, User_Register } from "../action/actionType";

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case User_Login:
      return {
        state: action.payload,
      };

    case User_Register:
      return {
        state,
      };

    default:
      return { state: userService.getCurrentUser() };
  }
};
