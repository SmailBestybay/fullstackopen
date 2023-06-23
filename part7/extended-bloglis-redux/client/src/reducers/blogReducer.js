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
    addLike(state, action) {
      const id = action.payload;
      const blogToChange = state.find((b) => b.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((b) => (b.id !== id ? b : changedBlog));
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

export const addLikeThunk = (blog) => {
  return async dispatch => {
    const response = await blogsService.update(blog)
    dispatch(addLike(response.id))
  }
}

export const { setBlogs, appendBlog, addLike } = blogSlice.actions;
export default blogSlice.reducer;
