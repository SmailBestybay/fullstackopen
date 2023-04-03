// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc += blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((acc, blog) => {
  return acc.likes > blog.likes ? { ...acc } : { ...blog }
}, {})

/*
first, calculate how many blogs each author has.
   reduce to an object where each element is in this form
  {
    author: "Robert C. Martin",
    blogs: 3
  }
  first acc is an object of of objects. This will let us look up existing authors at O(1)

second, find the author with most blogs.
  reduce again keeping the author with most blogs in the accumilator
*/
const mostBlogs = (blogs) => Object.values(
  blogs.reduce((acc, blog) => {
    const currCount = acc[blog.author] ? acc[blog.author].blogs : 0
    return {
      ...acc,
      [blog.author]: {
        author: blog.author,
        blogs: currCount + 1
      }
    }
  }, {})
).reduce((acc, author) => author.blogs < acc.blogs ? acc : author, {})

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}