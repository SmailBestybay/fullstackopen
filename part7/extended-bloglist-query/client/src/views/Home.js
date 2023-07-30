import blogService from "../services/blogs";
import { useQuery } from "react-query";
import { useRef } from "react";

import Togglable from "../components/Togglable";
import NewBlog from "../components/NewBlog";
import Blog from "../components/Blog";

import { useNotify } from "../contexts/NotificationContext";

import {
  useNewBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../mutations/blogMutations";

import { useUserValue } from "../contexts/UserContext";

const Home = () => {
  const blogsQuery = useQuery("blogs", blogService.getAll);

  const user = useUserValue();

  const newBlogMutation = useNewBlogMutation();
  const updateBlogMutation = useUpdateBlogMutation();
  const deleteBlogMutation = useDeleteBlogMutation();

  const blogFormRef = useRef();

  const notifyWith = useNotify();

  const createBlog = async (newBlog) => {
    newBlogMutation.mutate(newBlog);
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    blogFormRef.current.toggleVisibility();
  };

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    updateBlogMutation.mutate(blogToUpdate);
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      deleteBlogMutation.mutate(blog.id);
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
    }
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
            <Blog
              key={blog.id}
              blog={blog}
              like={() => like(blog)}
              canRemove={user && blog.user.username === user.username}
              remove={() => remove(blog)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
