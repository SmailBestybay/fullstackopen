import storageService from "./services/storage";

import LoginForm from "./components/Login";
import Notification from "./components/Notification";

import Home from "./views/Home";
import Users from "./views/Users";
import User from "./views/User";
import Blog from "./views/Blog";

import { useNotify } from "./contexts/NotificationContext";
import { useUserValue, useUserDispatch } from "./contexts/UserContext";

import { Routes, Route, Link } from "react-router-dom";

import blogService from "./services/blogs";
import { useQuery } from "react-query";

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();

  const notifyWith = useNotify();

  const logout = async () => {
    userDispatch({ type: "LOGOUT" });
    storageService.removeUser();
    notifyWith("logged out");
  };

  const blogsQuery = useQuery("blogs", blogService.getAll);

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div style={{background: "#d3d3d3", display: "flex", gap: '5px', padding: '5px'}}>
        <span><Link to='/'>blogs</Link></span>
        <span><Link to='/users'>users</Link></span>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={blogsQuery.isSuccess && <Blog blogs={blogsQuery.data} />}
        />
      </Routes>
    </div>
  );
};

export default App;
