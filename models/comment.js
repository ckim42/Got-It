const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
  date: String,
  commentary: String,
  entryId: { type: Schema.Types.ObjectId, ref: 'Entry' }
});

module.exports = Comment;
