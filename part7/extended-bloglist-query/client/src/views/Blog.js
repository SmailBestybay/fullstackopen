import {
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../mutations/blogMutations";

import { useNotify } from "../contexts/NotificationContext";

import { useUserValue } from "../contexts/UserContext";

import { useParams } from "react-router-dom";

const Blog = ({ blogs }) => {
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  const updateBlogMutation = useUpdateBlogMutation();
  const deleteBlogMutation = useDeleteBlogMutation();

  const notifyWith = useNotify();

  const user = useUserValue();

  const canRemove = user && blog.user.username === user.username;

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

  return (
    <div>
      <h2>{blog.title}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} <button onClick={like}>like</button>
      </div>
      <div>added by {blog.author}</div>
      {canRemove && <button onClick={remove}>delete</button>}
    </div>
  );
};

export default Blog;
