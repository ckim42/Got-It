const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    tagName: { type: String, required: true },
    tagRating: { type: Number, required: true },
    entryId: { type: Schema.Types.ObjectId, ref: 'Entry'}
})

module.exports = mongoose.model('Tag', TagSchema) 