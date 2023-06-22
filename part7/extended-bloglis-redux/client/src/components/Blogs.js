import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import { useRef } from 'react'

const Blogs = (
  {
    user, hanldeLogout,
    blogs, notify,
    message, messageStatus,
    handleLike, handleRemove, createBlog
  }) => {
  const togglableRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageStatus={messageStatus}/>
      <div>
        {user.name} logged in
        <button onClick={hanldeLogout}>logout</button>
      </div>

      <Togglable buttonLabel='new blog' ref={togglableRef}>
        <h2>create new</h2>
        <BlogForm
          notify={notify}
          togglableRef={togglableRef}
          createBlog={createBlog}
        />
      </Togglable>

      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id} blog={blog}
            user={user} handleLike={handleLike} handleRemove={handleRemove}/>
        )
      }
    </div>
  )}

export default Blogs