const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EntrySchema = new Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  note: { type: String, required: false }, //aka description
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] //gonna remove this
})

module.exports = mongoose.model('Entry', EntrySchema)