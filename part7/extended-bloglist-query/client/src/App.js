import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import Notification from "./components/Notification";

import Home from "./views/Home";

import { useNotificationDispatch } from "./contexts/NotificationContext";
import { useUserValue, useUserDispatch } from "./contexts/UserContext";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
        <button onClick={logout}>logout</button>
      </div>
      <Home notifyWith={notifyWith} />
    </div>
  );
};

export default App;
