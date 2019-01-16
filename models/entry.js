const mongoose = require('mongoose');

const Entry = mongoose.model('Entry', {
  title: String,
  rating: String,
  tags: Array
});

module.exports = Entry;
