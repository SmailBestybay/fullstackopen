import {  useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const user = useSelector((state) => state.user);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(setUser(null));
  };


  return (
    <>
      {user === null && <LoginForm />}
      {user !== null && (
        <Blogs
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default App;
