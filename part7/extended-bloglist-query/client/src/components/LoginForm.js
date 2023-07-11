import { useState } from "react";
import Notification from "./Notification";
// import loginService from "../services/login";
// import blogService from "../services/blogs";
// import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

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
    dispatch(loginUser(username, password));
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
