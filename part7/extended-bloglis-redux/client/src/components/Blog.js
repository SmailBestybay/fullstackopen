import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLikeThunk } from "../reducers/blogReducer";

const Blog = ({ blog, user, handleRemove }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (blog) => {
    const newBlog = {...blog, user: blog.user.id}
    dispatch(addLikeThunk(newBlog))
  }
  return (
    <>
      {visible ? (
        <div className="blog">
          <div>
            {blog.title} {blog.author}{" "}
            <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div className="like-count">
            likes {blog.likes}
            <button className="like" onClick={() => handleLike(blog)}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <div>
              <button onClick={() => handleRemove(blog)}>remove</button>
            </div>
          )}
        </div>
      ) : (
        <div className="blog">
          <div>
            {blog.title} {blog.author}{" "}
            <button onClick={toggleVisibility}>view</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
