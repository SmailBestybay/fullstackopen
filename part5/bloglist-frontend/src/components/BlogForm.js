import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage, setMessageStatus}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {title: title, author: author, url: url}
    const newBlogs = await blogService.create(newBlog)
    setBlogs(blogs.concat(newBlogs))
    setTitle('')
    setAuthor('')
    setUrl('')
    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setMessageStatus('success')
    setTimeout(() => {
      setMessage(null)
      setMessageStatus(null)
    }, 5000)
  }

  return (
    <>

      <form onSubmit={createBlog}>
        <div>
        title:
          <input 
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input 
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input 
            type="text"
            value={url}
            name="Url"
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm