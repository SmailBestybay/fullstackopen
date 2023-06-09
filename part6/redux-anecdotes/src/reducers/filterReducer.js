import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: {input: ''},
  reducers: {
    filterChange(state, action) {
      state.input = action.payload
    } 
  }

})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer