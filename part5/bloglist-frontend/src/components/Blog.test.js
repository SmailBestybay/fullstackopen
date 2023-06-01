import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('blog component', () => {
  const blog = {
    title: 'Test title',
    author: 'Tester Author',
    likes: 0,
    user: {
      name: 'Tester is the name',
      username: 'Tester is the username',
      id: '123123'
    },
    url: 'example@url.com'
  }
  render(<Blog blog={blog} />)

  test('renders blog title and author', () => {
    const element = screen.getByText('Test title Tester Author')
    expect(element).toBeDefined()
  })

  test('does not render url by default', () => {
    const url = screen.queryByText(blog.url)
    expect(url).toBeNull()
  })

  test('does not render likes by default', () => {
    const likes = screen.queryByText(blog.url)
    expect(likes).toBeNull()
  })

})