import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import PropTypes from "prop-types";

const BlogForm = ({ togglableRef, createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title: title, author: author, url: url };
      await createBlog(newBlog);

      setTitle("");
      setAuthor("");
      setUrl("");
      togglableRef.current.toggleVisibility();
      dispatch(
        setNotification({
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          status: "success",
        })
      );
    } catch (exception) {
      dispatch(
        setNotification({
          message: "Invalid Blog Entry",
          status: "error",
        })
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  togglableRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]).isRequired,
};

export default BlogForm;
