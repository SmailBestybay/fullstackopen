import loginService from "./services/login";
import storageService from "./services/storage";
import userService from "./services/user";

import LoginForm from "./components/Login";
import Notification from "./components/Notification";

import Home from "./views/Home";
import Users from "./views/Users";
import User from "./views/User";

import { useNotificationDispatch } from "./contexts/NotificationContext";
import { useUserValue, useUserDispatch } from "./contexts/UserContext";

import { Routes, Route, useMatch } from "react-router-dom";

import { useQuery } from "react-query";

const App = () => {
  const notificationDispatch = useNotificationDispatch();

  const userDispatch = useUserDispatch();
  const user = useUserValue();

  const notifyWith = (message, status = "info") => {
    notificationDispatch({
      type: "SET",
      message,
      status,
    });

    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 3000);
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      userDispatch({ type: "LOGIN", user });
      storageService.saveUser(user);
      notifyWith("welcome!");
    } catch (e) {
      notifyWith("wrong username or password", "error");
    }
  };

  const logout = async () => {
    userDispatch({ type: "LOGOUT" });
    storageService.removeUser();
    notifyWith("logged out");
  };

  const usersQuery = useQuery("users", userService.getAll);
  const match = useMatch("/users/:id");
  const matchedUser =
    match && usersQuery.isSuccess
      ? usersQuery.data.find((user) => user.id === match.params.id)
      : null;

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <br />
        <button onClick={logout}>logout</button>
      </div>
      <Routes>
        <Route path="/" element={<Home notifyWith={notifyWith} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
      </Routes>
    </div>
  );
};

export default App;
