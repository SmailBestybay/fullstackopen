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
            blogs={blogs} 
            setBlogs={setBlogs} 
            setMessage={setMessage} 
            setMessageStatus={setMessageStatus}
            blogFormRef={blogFormRef}
          />
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
)}

export default Blogs