import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike =  () => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    blogService.update(blog.id, newBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  } 

  return (
    <>
      {visible ? (
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          </div>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>
            likes {blog.likes} 
            <button onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
        </div>  
      ) : (
        <div style={blogStyle}>
          <div>{blog.title} <button onClick={toggleVisibility}>view</button></div>
        </div> 
      )}


    </>
  )
}


export default Blog