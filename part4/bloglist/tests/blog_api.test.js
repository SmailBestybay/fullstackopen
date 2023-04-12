const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('api get routes tests', () => {
  test('that blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('that there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })

  test('that unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('get a specific blog', () => {
  test('suceed with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })
})

describe('deletetion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const urls = blogsAtEnd.map(r => r.url)
    expect(urls).not.toContain(blogToDelete.url)
  })
})

describe('api post routes tests', () => {
  test('/api/blogs succesfully creates a new blog', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Canonical string reduction')
  })

  test('if the likes property is missing, defailt to the value 0', async () => {
    const tempBlog = { ...helper.newBlog }
    delete tempBlog.likes

    await api
      .post('/api/blogs')
      .send(tempBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)
  })

  test('if title property is missing', async () => {
    const tempBlog = { ...helper.newBlog }
    delete tempBlog.title

    await api
      .post('/api/blogs')
      .send(tempBlog)
      .expect(400)
  })

  test('if url property is missing', async () => {
    const tempBlog = { ...helper.newBlog }
    delete tempBlog.url

    await api
      .post('/api/blogs')
      .send(tempBlog)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})