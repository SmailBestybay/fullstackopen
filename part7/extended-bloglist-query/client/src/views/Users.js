import { useQuery } from "react-query";
import userService from "../services/user";
import { Link } from "react-router-dom";

const Users = () => {
  const usersQuery = useQuery("users", userService.getAll);

  if (usersQuery.isLoading) {
    return <div>Loading users</div>;
  }

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersQuery.data.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
