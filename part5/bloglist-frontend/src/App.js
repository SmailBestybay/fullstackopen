import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const hanldeLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleLike =  async (blog) => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    const updatedBlog = await blogService.update(blog.id, newBlog)
    const newBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
    setBlogs(newBlogs)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
      const newBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(newBlogs)
    }
  }

  return (
    <>

      {user === null && <LoginForm
        setUser={setUser}
        message={message} setMessage={setMessage}
        messageStatus={messageStatus} setMessageStatus={setMessageStatus}
      />}
      {user !== null && <Blogs
        user={user} hanldeLogout={hanldeLogout}
        blogs={blogs} setBlogs={setBlogs}
        message={message} setMessage={setMessage}
        messageStatus={messageStatus} setMessageStatus={setMessageStatus}
        handleLike={handleLike} handleRemove={handleRemove}
      />}

    </>
  )
}

export default App