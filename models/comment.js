const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  date: { type: String, required: true },
  commentary: { type: String, required: true },
  entryId: { type: Schema.Types.ObjectId, ref: 'Entry' }
})

module.exports = mongoose.model('Comment', CommentSchema)

// const Comment = mongoose.model('Comment', {
//   date: String,
//   commentary: String,
//   entryId: { type: Schema.Types.ObjectId, ref: 'Entry' }
// })

// module.exports = Comment
