const mongoose = require('mongoose');
const Comment = require('../models/comment')

const Entry = mongoose.model('Entry', {
  title: String,
  rating: String,
  tags: Array
});

module.exports = Entry;
