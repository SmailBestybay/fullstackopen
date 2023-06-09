import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: ''},
  reducers: {
    setNotification(state, action) {
      state.message = action.payload
    },
    clearNotification(state, action) {
      state.message = ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer