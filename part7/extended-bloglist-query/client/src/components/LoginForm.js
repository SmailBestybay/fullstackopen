import { useState } from "react";
import Notification from "./Notification";
// import loginService from "../services/login";
// import blogService from "../services/blogs";
// import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useNotificationDispatch } from "../NotificationContext";

const LoginForm = () => {
  const dispatchRedux = useDispatch();
  const dispatch = useNotificationDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    // try {
    // const user = await loginService.login({
    //   username,
    //   password,
    // });
    // setUser(user);
    // blogService.setToken(user.token);
    // window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    dispatchRedux(loginUser(username, password));
    dispatch({ type: "SET", message: "wrong credentials", status: "error" });
    setTimeout(() => dispatch({ type: "CLEAR" }), 2000);

    setUsername("");
    setPassword("");
    // } catch (exception) {
    //   dispatch(
    //     setNotification({ message: "wrong credentials", status: "error" })
    //   );
    // }
  };

  return (
    <>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
