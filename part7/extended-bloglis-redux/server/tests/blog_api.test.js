const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


describe('when there is initially some notes saved', () => {

  let authorization
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60*60 }
    )

    authorization = `Bearer ${token}`
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog({
      ...blog,
      user: user._id,
    }))

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
        .set('authorization', authorization)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const urls = blogsAtEnd.map(r => r.url)
      expect(urls).not.toContain(blogToDelete.url)
    })
  })

  describe('updating the information of an individual blog', () => {
    test('updates the number of likes', async () => {
      const blogsAtStart = await helper.blogsInDBWithoutPopulate()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes = 10
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const afterUpdate = await api.get(`/api/blogs/${blogToUpdate.id}`)
      expect(afterUpdate.body.likes).toEqual(blogToUpdate.likes)
    })
  })

  describe('api post routes tests', () => {
    test('/api/blogs succesfully creates a new blog', async () => {
      await api
        .post('/api/blogs')
        .set('authorization', authorization)
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const titles = response.body.map(r => r.title)
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(titles).toContain('Canonical string reduction')
    })

    test('/api/blogs fails when token is not provided', async () => {
      await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('if the likes property is missing, default to the value 0', async () => {
      const tempBlog = { ...helper.newBlog }
      delete tempBlog.likes

      await api
        .post('/api/blogs')
        .set('authorization', authorization)
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
        .set('authorization', authorization)
        .send(tempBlog)
        .expect(400)
    })

    test('if url property is missing', async () => {
      const tempBlog = { ...helper.newBlog }
      delete tempBlog.url

      await api
        .post('/api/blogs')
        .set('authorization', authorization)
        .send(tempBlog)
        .expect(400)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'smile',
      name: 'Smail Bestybay',
      password: 'hushhush'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test(
    'creation fails with proper statuscode and message if username already taken',
    async () => {
      const usersAtStart = await helper.usersInDB()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'password',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('expected `username` to be unique')

      const usersAtEnd = await helper.usersInDB()
      expect(usersAtEnd).toEqual(usersAtStart)
    }
  )

  test('creatioin fails when username param is not present', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: '',
      name: 'Smail Bestybay',
      password: 'hushush',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('must include username')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creatioin fails when password param is not present', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'smile',
      name: 'Smail Bestybay',
      password: '',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('must include password')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails when password is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'smile',
      name: 'Smail Bestybay',
      password: 'hu',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails when username is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'sm',
      name: 'Smail Bestybay',
      password: 'hushhush',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})