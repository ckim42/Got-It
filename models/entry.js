const mongoose = require('mongoose')

const Entry = mongoose.model('Entry', {
  title: String,
  rating: String,
  note: String,
  tags: Array
})

module.exports = Entry
