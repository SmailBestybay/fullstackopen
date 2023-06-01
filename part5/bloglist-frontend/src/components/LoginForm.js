import { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, message, messageStatus, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

    } catch (exception) {
      notify('wrond credentials', 'error')
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <Notification message={message} messageStatus={messageStatus}  />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm