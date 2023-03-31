// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc += blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((acc, blog) => {
  return acc.likes > blog.likes ? { ...acc } : { ...blog } // passes


  // the statement below does not pass because undefined < or > any number is always false
  // so on the first iteration of reduce the empty object is returned, and
  // the pattern repeates.

  // return acc.likes < blog.likes ? { ...blog } : { ...acc } // does not pass
}, {})

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}