import { useState } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ setBlogs, setMessage, setMessageStatus, togglableRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {title: title, author: author, url: url}
      await blogService.create(newBlog)

      setBlogs(await blogService.getAll())
      setTitle('')
      setAuthor('')
      setUrl('')
      togglableRef.current.toggleVisibility()
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setMessageStatus('success')
      setTimeout(() => {
        setMessage(null)
        setMessageStatus(null)
      }, 5000)
    } catch (exception) {
      setMessage('Invalid Blog Entry')
      setMessageStatus('error')
      setTimeout(() => {
        setMessage(null)
        setMessageStatus(null)
      }, 5000)
    }
  }

  return (
    <>

      <form onSubmit={handleSubmit}>
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

BlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setMessageStatus: PropTypes.func.isRequired,
  togglableRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.object })
]).isRequired
}

export default BlogForm