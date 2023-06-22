const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  if (!body.url || !body.title) {
    return response.status(400).end()
  }

  const user = request.user

  const blog = new Blog({
    ...body,
    likes: body.likes ?? 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.populate('user', { username: 1, name: 1 }))
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user
  if(!user) {
    return response.status(401).json({ error: 'invalid user' })
  }

  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'blog does not belong to user' })
  }

  await Blog.findByIdAndRemove(blog.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, request.body, { new: true })
    .populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})

module.exports = blogRouter