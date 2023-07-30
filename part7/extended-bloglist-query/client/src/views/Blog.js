import PropTypes from "prop-types";

const Blog = ({ blog, like, canRemove, remove }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} <button onClick={like}>like</button>
      </div>
      <div>added by {blog.author}</div>
      {canRemove&&<button onClick={remove}>delete</button>}
    </div>
  );
};

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default Blog;
