import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogsService.create(newBlog);
    dispatch(appendBlog(blog));
  };
};

export const { setBlogs, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;
