const mongoose = require('mongoose');

const Entry = mongoose.model('Entry', {
  title: String,
  rating: String,
});

module.exports = Entry;
