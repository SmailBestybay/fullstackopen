import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Notification from "./Notification"
import Togglable from "./Togglable"
import { useRef } from "react"

const Blogs = (
  {
    user, hanldeLogout, 
    blogs, setBlogs,
    message, setMessage, 
    messageStatus, setMessageStatus
  }) => {
    const blogFormRef = useRef()

  return (
    <div>
        <h2>blogs</h2>
        <Notification message={message} messageStatus={messageStatus}/>
        <div>
          {user.name} logged in 
          <button onClick={hanldeLogout}>logout</button> 
        </div>

        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <h2>create new</h2>
          <BlogForm 
            setBlogs={setBlogs} 
            setMessage={setMessage} 
            setMessageStatus={setMessageStatus}
            blogFormRef={blogFormRef}
          />
        </Togglable>

        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
          )
        }
    </div>
)}

export default Blogs