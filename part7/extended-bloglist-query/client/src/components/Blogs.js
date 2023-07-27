import { useSelector } from "react-redux";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";
import { useRef } from "react";

const Blogs = ({
  user,
  handleLogout,
  // blogs,
  // notify,
  // handleLike,
  // handleRemove,
  // createBlog,
}) => {
  const togglableRef = useRef();

  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="new blog" ref={togglableRef}>
        <h2>create new</h2>
        <BlogForm
          togglableRef={togglableRef}
          // createBlog={createBlog}
        />
      </Togglable>

      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            // handleLike={handleLike}
            // handleRemove={handleRemove}
          />
        ))}
    </div>
  );
};

export default Blogs;
