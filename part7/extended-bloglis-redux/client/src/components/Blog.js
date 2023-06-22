import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // const handleRemove = async () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
  //     blogService.remove(blog.id)
  //     const newBlogs = blogs.filter(b => b.id !== blog.id)
  //     setBlogs(newBlogs)
  //   }
  // }


  return (
    <>
      {visible ? (
        <div className='blog'>
          <div>
            {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          </div>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div className='like-count'>
            likes {blog.likes}
            <button className='like' onClick={() => handleLike(blog)}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          { user.username === blog.user.username && (
            <div><button onClick={() => handleRemove(blog)}>remove</button></div>
          ) }
        </div>
      ) : (
        <div className='blog'>
          <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></div>
        </div>
      )}


    </>
  )
}


export default Blog