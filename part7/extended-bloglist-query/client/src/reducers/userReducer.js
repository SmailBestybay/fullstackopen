import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
// import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setUser(user));
    } catch (exception) {
      console.log('REDUX NOTIFICATION WOULD BE HERE')
      // dispatch(
      //   setNotification({ message: "wrong credentials", status: "error" })
      // );
    }
  };
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
