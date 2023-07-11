import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", status: "" },
  reducers: {
    setNotificationMessage(state, action) {
      return { ...state, ...action.payload };
    },
    clearNotificationMessage(state) {
      return { ...state, message: "", status: "" };
    },
  },
});

export const setNotification = (message, seconds = 5) => {
  return async (dispatch) => {
    dispatch(setNotificationMessage(message));
    setTimeout(() => {
      dispatch(clearNotificationMessage());
    }, seconds * 1000);
  };
};

export const { setNotificationMessage, clearNotificationMessage } =
  notificationSlice.actions;
export default notificationSlice.reducer;
