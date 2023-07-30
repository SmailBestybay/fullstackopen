import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import userService from "../services/user";

const User = () => {
  const id = useParams().id;
  const { isLoading, data } = useQuery(["users", id], () =>
    userService.fetchUser(id)
  );
  if (isLoading) {
    return null;
  }
  return (
    <>
      <h2>{data.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {data.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
