const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, retunedObject) => {
    // _id property of Mongoose objects looks like a string, but it is in fact an object
    // It is safer to transform it into a string here.
    retunedObject.id = retunedObject._id.toString()
    delete retunedObject._id
    delete retunedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

