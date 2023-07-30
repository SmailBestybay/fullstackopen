import { useState } from 'react'

import loginService from "../services/login";
import storageService from "../services/storage";

import { useUserDispatch } from "../contexts/UserContext";
import { useNotify } from "../contexts/NotificationContext";

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userDispatch = useUserDispatch();
  const notifyWith = useNotify();

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login(username, password)
  }

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm