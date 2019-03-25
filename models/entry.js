const mongoose = require('mongoose')

const Entry = mongoose.model('Entry', {
  title: String,
  rating: Number,
  note: String,
  tags: Array
})

module.exports = Entry
