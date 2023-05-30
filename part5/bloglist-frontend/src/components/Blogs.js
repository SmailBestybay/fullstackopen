import Blog from "./Blog"
import BlogForm from "./BlogForm"

const Blogs = ({user, hanldeLogout, blogs, setBlogs}) => (
  <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in 
        <button onClick={hanldeLogout}>logout</button> 
      </div>

      <h2>create new</h2>
      <BlogForm blogs={blogs} setBlogs={setBlogs}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
)

export default Blogs