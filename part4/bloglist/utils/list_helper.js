// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc += blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((acc, blog) => {
  return acc.likes > blog.likes ? acc : blog
  // return acc.likes < blog.likes ? blog : acc
}, {})

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}