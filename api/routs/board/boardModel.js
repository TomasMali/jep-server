
// this is a module DAO for Users
const mongoose = require('mongoose')

const boardSchema = mongoose.Schema({
  //   _id : mongoose.Schema.Types.ObjectId,
  wi: Number,
  storyPoint: Number,
  owner: String,
  description: String,
  state: String

})

module.exports = mongoose.model('Board', boardSchema) 