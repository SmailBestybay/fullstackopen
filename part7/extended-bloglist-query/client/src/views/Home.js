import blogService from "../services/blogs";
import { useQuery } from "react-query";
import { useRef } from "react";

import Togglable from "../components/Togglable";
import NewBlog from "../components/NewBlog";

import { useNotify } from "../contexts/NotificationContext";

import { useNewBlogMutation } from "../mutations/blogMutations";

import { Link } from "react-router-dom";

const Home = () => {
  const blogsQuery = useQuery("blogs", blogService.getAll);
  const newBlogMutation = useNewBlogMutation();
  const blogFormRef = useRef();
  const notifyWith = useNotify();

  const createBlog = async (newBlog) => {
    newBlogMutation.mutate(newBlog);
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    blogFormRef.current.toggleVisibility();
  };

  const style = {
    border: "1px solid black",
    margin: "10px 0px",
  };
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  return (
    <>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogsQuery.isLoading ? (
        <div>loading blogs...</div>
      ) : (
        <div>
          {blogsQuery.data.sort(byLikes).map((blog) => (
            <div style={style} key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
