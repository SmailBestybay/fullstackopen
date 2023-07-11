import {  useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user);

  // const [blogs, setBlogs] = useState([]);
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);

  const dispath = useDispatch();
  useEffect(() => {
    dispath(initializeBlogs());
  }, [dispath]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispath(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const hanldeLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispath(setUser(null));
  };

  // const handleLike = async (blog) => {
  //   const newBlog = {
  //     user: blog.user.id,
  //     likes: blog.likes + 1,
  //     author: blog.author,
  //     title: blog.title,
  //     url: blog.url,
  //   };
  //   const updatedBlog = await blogService.update(blog.id, newBlog);
  //   const newBlogs = blogs.map((b) =>
  //     b.id === updatedBlog.id ? updatedBlog : b
  //   );
  //   setBlogs(newBlogs);
  // };

  // const handleRemove = async (blog) => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
  //     blogService.remove(blog.id);
  //     const newBlogs = blogs.filter((b) => b.id !== blog.id);
  //     setBlogs(newBlogs);
  //   }
  // };

  // const createBlog = async (newBlog) => {
  //   await blogService.create(newBlog);

  //   setBlogs(await blogService.getAll());
  // };

  return (
    <>
      {user === null && <LoginForm />}
      {user !== null && (
        <Blogs
          user={user}
          hanldeLogout={hanldeLogout}
          // blogs={blogs}
          // handleLike={handleLike}
          // handleRemove={handleRemove}
          // createBlog={createBlog}
        />
      )}
    </>
  );
};

export default App;
