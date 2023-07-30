// import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import Notification from "./components/Notification";

import Home from "./views/Home";
import Users from "./views/Users";
import User from "./views/User";

import { useNotify } from "./contexts/NotificationContext";
import { useUserValue, useUserDispatch } from "./contexts/UserContext";

import { Routes, Route } from "react-router-dom";

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();

  const notifyWith = useNotify();

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
        <LoginForm />
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
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
