import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: ''},
  reducers: {
    setNotificationMessage(state, action) {
      state.message = action.payload
    },
    clearNotificationMessage(state, action) {
      state.message = ''
    }
  }
})

export const setNotification = (message, seconds = 5) => {
  return async dispatch => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
      dispatch(clearNotificationMessage())
    }, seconds * 1000);
  }
}

export const { setNotificationMessage, clearNotificationMessage } = notificationSlice.actions
export default notificationSlice.reducer